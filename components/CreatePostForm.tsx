"use client";

import type React from "react";
import { useState, useTransition, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, X, Bold, Italic } from "lucide-react";
import { createPost } from "@/actions/post.actions";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

const EditorToolbar = ({ editor, disabled }: { editor: Editor | null, disabled: boolean }) => {
    if (!editor) return null;

    return (
        <div className="flex items-center gap-2 border-b pb-2">
            <Button variant="ghost" size="icon" disabled={disabled || !editor.can().chain().focus().toggleBold().run()} onClick={() => editor.chain().focus().toggleBold().run()}>
                <Bold className={cn("h-4 w-4", editor.isActive('bold') && 'text-primary')} />
            </Button>
            <Button variant="ghost" size="icon" disabled={disabled || !editor.can().chain().focus().toggleItalic().run()} onClick={() => editor.chain().focus().toggleItalic().run()}>
                <Italic className={cn("h-4 w-4", editor.isActive('italic') && 'text-primary')} />
            </Button>
        </div>
    )
}

export function CreatePostForm() {
    const { user } = useUser();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: false, bulletList: false, orderedList: false, blockquote: false }),
            Placeholder.configure({ placeholder: "What's happening?" }),
        ],
        editorProps: {
            attributes: { class: 'prose dark:prose-invert prose-sm sm:prose-base focus:outline-none min-h-[80px]' },
        },
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
        immediatelyRender: false,
    });

    const { startUpload, isUploading } = useUploadThing("postImage", {
        onClientUploadComplete: (res) => {
            setUploadProgress(0);
            const imageUrl = res?.[0]?.url;
            handlePostSubmit(imageUrl);
        },
        onUploadError: (error) => {
            setUploadProgress(0);
            toast.error(`Upload failed: ${error.message}`);
        },
        onUploadProgress: (progress) => {
            setUploadProgress(progress);
        },
    });

    const handlePostSubmit = (imageUrl?: string) => {
        if (!content.trim() || content === "<p></p>") {
            toast.error("You can't post an empty message.");
            return;
        }
        startTransition(async () => {
            try {
                await createPost(content, imageUrl);
                toast.success("Your post has been shared!");
                editor?.commands.clearContent();
                setImageFile(null);
                setImagePreview(null);
                if (imageInputRef.current) imageInputRef.current.value = "";
                router.refresh();
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
            }
        });
    };

    const handleSubmitClick = () => {
        if (imageFile) {
            startUpload([imageFile]);
        } else {
            handlePostSubmit();
        }
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
    }
  
    if (!user) return null;

    const isDisabled = isPending || isUploading;

    return (
        <Card className="mb-6">
            <CardContent className="p-4 lg:p-6">
                <div className="flex gap-3 lg:gap-4">
                    <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3 lg:space-y-4">
                        <EditorToolbar editor={editor} disabled={isDisabled} />
                        <EditorContent editor={editor} />

                        {imagePreview && (
                            <div className="relative">
                                <img src={imagePreview} alt="Image preview" className="rounded-lg w-full object-cover max-h-96" />
                                {!isUploading && (
                                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-black/50 hover:bg-black/75 rounded-full" onClick={removeImage}>
                                        <X className="h-5 w-5 text-white" />
                                    </Button>
                                )}
                            </div>
                        )}
            
                        {isUploading && (
                            <div className="space-y-2">
                                <Progress value={uploadProgress} className="w-full h-2" />
                                <p className="text-sm text-center text-muted-foreground">{uploadProgress}%</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <input type="file" ref={imageInputRef} onChange={handleFileChange} accept="image/*" className="hidden" id="image-upload" />
                            <label htmlFor="image-upload" className={cn(isDisabled && "pointer-events-none opacity-50")}>
                                <ImageIcon className="h-5 w-5 text-primary hover:text-primary/80 cursor-pointer" />
                            </label>
                            <Button
                                onClick={handleSubmitClick}
                                disabled={isDisabled || !content.trim() || content === "<p></p>"}
                                className="rounded-full px-4 lg:px-6"
                            >
                                {isUploading ? "Uploading..." : isPending ? "Posting..." : "Post"}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}