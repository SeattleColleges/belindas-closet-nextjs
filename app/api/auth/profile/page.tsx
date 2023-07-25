import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { getSession } from "next-auth/client";

/* can't directly use useSession b/c it uses react context which is not available in server-side comp */
/* instead use getSession from next-auth/client in getServerSideProps/getInitialProps funct to access session data */

/*
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {session},
  };
}

const Profile = ({session}) => {

  const router = useRouter();

  if (!session) {
    router.replace("/auth/sign-in");
    return null;
  }

  const {user} = session;


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <p>Profile information goes here...</p>
    </div>
  );
};

export default Profile;
*/




const Profile = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    // Handle loading state, such as showing a loading spinner
    return <div>Loading...</div>;
  }

  if (!session) {
    // Redirect the user to the sign-in page if there is no active session
    router.replace("/auth/sign-in");
    return null;
  }

  const { user } = session;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <p>Profile information goes here...</p>
    </div>
  );
};

export default Profile;

