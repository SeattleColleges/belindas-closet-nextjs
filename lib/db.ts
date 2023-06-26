// import mongoose and grab db url from env variable
import mongoose from "mongoose";

const url = process.env.DATABASE_URL as string;
// connection variable
let connection: typeof mongoose;

// create db function and export db
const startDb = async () => {
  // first check if there's a connection to prevent multiple db connections
  // If no connection, connect to database with mongoose.connect(...)
  if (!connection) connection = await mongoose.connect(url);
  return connection;
};

export default startDb;
