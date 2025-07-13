import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getNotifications } from '@/lib/data-service';
import { NotificationsClientPage } from './notifications-client-page';

export default async function NotificationsPage() {
    const { userId } =await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const notifications = await getNotifications();

    return <NotificationsClientPage notifications={notifications} />;
}