import {UserRecord} from "firebase-functions/v1/auth";
import {realtime} from "./configs/firebase";

const insertUser = async (user: UserRecord)=>{
  const ref = realtime.ref("userProfile");
  ref.push({key: user.uid,
    email: user.email,
  });
};
const addUserProfile = async (data: Record<string, never>) => {
  const ref = realtime.ref("userProfile");
  try {
    ref.push(data);
    return {status: 200,
      message: " userProfile added correctly"};
  } catch (error: unknown) {
    return {status: 500,
      message: error};
  }
};

const getUserProfile = async (data: {email: string})=>{
  const ref = realtime.ref("userProfile");
  const profilesList: any[]=[];
  const profiles = await ref.once("value");
  profiles.forEach((user)=>{
    profilesList.push(user?{...user.val(), key: user.key}:null);
  }
  );
  return {
    status: 200,
    profile: JSON.stringify(profilesList.
        filter((prof)=>prof.email==data.email)[0]),
  };
};
const updateUserProfile = async (data: any)=>{
  const ref = realtime.ref(`userProfile/${data["key"]}`);
  ref.update(data["userProfile"]);
  return {
    status: 200,
    message: "userProfile updated correctly",
  };
};
export {insertUser, addUserProfile, updateUserProfile, getUserProfile};
