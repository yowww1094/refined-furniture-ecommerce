import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock profile data - in a real app, this would come from Supabase
    const mockProfile = {
      id: 'user1',
      name: 'Younes Smith',
      email: 'younes@example.com',
      phone: '+212 6xx xxx xxx',
      avatar: '/placeholder-avatar.jpg',
      bio: 'Passionate about interior design and Moroccan craftsmanship.',
      newsletters: true,
      notifications: true
    };

    setProfile(mockProfile);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full border-4 border-primary/20 border-t-primary h-8 w-8"></div>
        <p className="mt-4">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No profile data found</p>
        <Link href="/account/profile/edit" className="mt-4 btn btn-primary">
          Create Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Link href="/account/profile/edit" className="btn btn-outline">
          Edit Profile
        </Link>
      </div>

      {/* Profile Info Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Profile Information</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="h-14 w-14 object-cover rounded-full" />
              ) : (
                <div className="h-14 w-14 bg-muted flex items-center justify-center rounded-full">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
              )}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <p className="text-sm text-muted-foreground">{profile.phone}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Bio</h3>
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Preferences</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletters"
                checked={profile.newsletters}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <label htmlFor="newsletters" className="ml-2 text-sm font-medium">
                Subscribe to newsletters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                checked={profile.notifications}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <label htmlFor="notifications" className="ml-2 text-sm font-medium">
                Receive notifications
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}