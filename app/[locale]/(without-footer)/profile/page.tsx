import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/utils/api-server/auth-server';
import ProfileClient from '@/app/(components)/profile-page/ProfileClient';

export const metadata = {
  title: 'Profile',
  description: 'Page of personal user profile',
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileClient user={user} />
    </div>
  );
}
