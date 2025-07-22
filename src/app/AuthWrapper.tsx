"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState, setUserDetailsState } from "@/store/authSlice";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Temporarily bypass Firebase for Stripe demo
    // Set a default authenticated state
    dispatch(setAuthState(true));
    dispatch(
      setUserDetailsState({
        uid: "demo-user",
        name: "Demo User",
        email: "demo@example.com",
        profilePic: "",
      })
    );
    
    // TODO: Re-enable Firebase authentication after demo
    /*
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setAuthState(true));
        dispatch(
          setUserDetailsState({
            uid: user.uid,
            name: user.displayName ?? "",
            email: user.email ?? "",
            profilePic: user.photoURL ?? "",
          })
        );
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
    */
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthWrapper;
