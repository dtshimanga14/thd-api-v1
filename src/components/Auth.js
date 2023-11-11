import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
      }
    };

    const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
        } catch (error) {
          console.log(error);
        }
      };

      const logOut = async () => {
          try {
            await signOut(auth);
          } catch (error) {
            console.log(error);
          }
        };
    return (
        <div>
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password..." onChange={(e)=> setPassword(e.target.value)}/>
            <button onClick={signIn}> Sign In </button>
            <button onClick={signInWithGoogle}> Sign In With Google</button>
            <button onClick={logOut}> Log Out </button>
        </div>
    )
};