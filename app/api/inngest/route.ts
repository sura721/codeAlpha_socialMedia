import { serve } from "inngest/next";
import { deleteUserOnClerkDelete, inngest, syncUserOnCreate } from "@/config/inngest";
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserOnCreate,
    deleteUserOnClerkDelete 
  ],
});
