 import { Model, models, model } from "mongoose";
 import { Document, Schema } from "mongoose";
 import bcrypt from "bcrypt";

 // interface will define things needed to create user info 
 interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
 }

 // interface will compare user password returning boolean value
 interface Methods {
  comparePassword(password: string): Promise<boolean>;
 }

 // constructing our schema with user required fields 
 const userScehma = new Schema<UserDocument, {}, Methods>({
  email: { type: String, required: true, unique: true},
    // trim extra spacing when user types in name (ex: " john " --> "john")
  name: { type: String, required: true, trim: true}, 
  password: { type: String, required: true},
    // two types of roles for any user, default being a user 
  role: { type: String, enum: ["admin", "user"], default: "user"}
 });

 // hashing user's password only if it's been modified 
 userScehma.pre("save", async function (next) {
  // next() just calls just calls the next function 
  if (!this.isModified("password")) return next();
  try {
    // "salting" <-- adding random characters before/after a password prior to hashing to obfuscate password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }

 });

 // at this point, compare the passwords
 userScehma.methods.comparePassword = async function (password) {
  try {
    // compare incoming password to user's password
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
 };


 // this is where we actually create a new user only if it doesn't match a current user (model.User) 
 const UserModel = models.User || model("User", userScehma);

 export default UserModel as Model<UserDocument, {}, Methods>;