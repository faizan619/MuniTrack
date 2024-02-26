"use client";
import { useState } from "react";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const auth = getAuth(track_app)

export default function Google() {
  const [loadinig, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await auth.signInWithGoogle(GoogleAuthProvider);
    } catch (error) {
      console.log("error in Google.jsx : ", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={signInWithGoogle} disabled={loading}>
        Sign in with Google
      </button>
    </div>
  );
}
