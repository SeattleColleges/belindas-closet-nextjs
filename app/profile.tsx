import { useEffect } from 'react';
import { useRouter } from 'next/router';


interface User {
  name: string;
  email: string;
  /* Add other user properties as needed */
}

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect the user to the sign-in page if there is no active session
      router.replace("/auth/sign-in");
    }
  }, [user, router]);

  if (!user) {
    // Display loading state or redirecting message
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Profile information goes here...</p>
    </div>
  );
};

export default Profile;
