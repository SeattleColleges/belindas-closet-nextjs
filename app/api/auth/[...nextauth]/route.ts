
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// todo: imports for db once db file has been created added to project directory
// import startDb from "@/lib/db";

// todo: once db has been created, user model can be set up (kind of like an interface) to grab and store users infor 
// import UserModel from "@/models/userModel";



// sign-in route creation
const authOptions: NextAuthOptions = {
  // json web token (jwt) session provided for login 
  session: {
      strategy: "jwt"
  }, 
  
  // need to import CredentialsProvider to pass in documentation from nextjs 
  providers: [
    // since using email and passwords, we'll need and use CredentialsProvider
      CredentialsProvider({
          type: "credentials",
          // leave object empty since we don't want a default form 
          credentials: {},
          // authorize function will fire when sending sign-in request from backend api 
          // credentials holds all incoming data from frontend. req makes HTTP requests and handles incoming data thru json 
          async authorize(credentials, req) {
              // destructuring credentials once passed in and casting incoming data as strings
              const { email, password } = credentials as {
                  email: string;
                  password: string;
              };

              // todo: once db has been created along with construction of schema, 
                    // we can use the schema to grab and store users information
                    // below code is a sandbox and rough ideas of how to comparing user's email and password..
                    // ..return statement would return users info after comparison

              /*
              // perform loging logic and/or find out user from db
                // upon capturing email and password, start and connect db to check for matching user email
              await startDb();
              const user = await UserModel.findOne({ email });

                // if there's no user, throw error and notify user
              if (!user) throw Error("email/password mismatch")

                // if user does exist, then compare the password
              const passwordMatch = await user.comparePassword(password);
              if (!passwordMatch) throw Error("email/password mismatch");
              
              // if user's login info is valid, return user object containing user's info (authenticated user)
              return { 
                  name: user.name, 
                  email: user.email,
                  role: user.role,
                  id: user._id
              };
              */

              return { 
                name: "name", 
                email: "email",
                role: "role",
                id: "_id"
            };

          },
      }),
  ],

  // to get same user response inside application, need a callback function
  callbacks: {
    // callback functions run the first time we send a sign-in request
    jwt(params: any) {
      // check if there's a user and update token by assigning user's role and id. Then return token
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      return params.token;
    },

    session({ session, token }) {
      // check if there's a user and update session by adding user's id and role. Then return session
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string; 
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST }