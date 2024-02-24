import track_app from "@/firebase/config";
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(track_app);

export default async function register(email, password,displayName,phoneNumber) {
  let result = null,
    error = null;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    result = userCredential.user;
    console.log("result here :",result)
    await updateProfile(result, { displayName, phoneNumber });
  } catch (e) {
    error = e;
  }
  return { result, error };
}
