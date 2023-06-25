// importing NextAuthOptions to pass into exported function
import NextAuth, {NextAuthOptions} from "next-auth";

import CredentialsProvider  from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  // this object requires certain configuration to authentica a session management to work 
    // (session, providers, ...) 

  session: {
    // enabling json web token(jwt) to manage user sessions
    strategy: 'jwt'
  },

  providers: [
    // passing all necessary providers from nextjs documentation. 
    // Accessing providers from nextjs documentation by CredentialsProvider import
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      // this function will fire when sending signin request to backend api
      authorize(credentials, req){
        // credentials will contain user data from frontend (email,password)
          // need to destructure info coming from credentials. Cast type as string
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // perform login logic (validate user or find user from db)
        
        // if user login info is invalid, reject sign in request 
          // user is unauthenticated
        // if user login info is valid, accept sign in request and return user's info
          // user is authenticated 
        if (email !== 'john@email.com' || password !== '1234') {
          throw new Error('Invalid credentials');
        }

        return {
          id: '',
          name: '',
          email: '',
          role: '',
        }

      },
    }),

  ],

    
  

}


export default NextAuth(authOptions);