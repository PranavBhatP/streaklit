import User, {IUser}from "@/model/User";

export async function createUser(user: IUser):Promise<void> {
  try{
    await User.create(user);
  } catch(e){
    throw new Error("Could not create user.")
  }
}