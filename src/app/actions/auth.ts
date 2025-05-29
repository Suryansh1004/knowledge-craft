// src/app/actions/auth.ts
"use server";

import { z } from "zod";
import { auth, db } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile as updateFirebaseProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { UserProfile } from "@/types";

const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const profileSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters").optional(),
  organization: z.string().optional(),
  yearOfPassout: z.coerce.number().min(1950).max(new Date().getFullYear() + 5).optional(),
});

export async function signupWithEmail(prevState: any, formData: FormData) {
  const validatedFields = emailPasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: "Invalid email or password.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.email?.split('@')[0] || 'New User', // Default display name
      roles: ['user'], // Default role
      createdAt: new Date().toISOString(), // Add a creation timestamp
    });

    return { message: "Signup successful! Redirecting..." };
  } catch (error: any) {
    return { error: error.message || "Signup failed. Please try again." };
  }
}

export async function loginWithEmail(prevState: any, formData: FormData) {
  const validatedFields = emailPasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: "Invalid email or password.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { message: "Login successful! Redirecting..." };
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
       return { error: "Invalid email or password." };
    }
    return { error: error.message || "Login failed. Please try again." };
  }
}

export async function updateUserProfile(userId: string, prevState: any, formData: FormData) {
  if (!auth.currentUser || auth.currentUser.uid !== userId) {
    return { error: "Unauthorized" };
  }

  const validatedFields = profileSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: "Invalid profile data.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { displayName, organization, yearOfPassout } = validatedFields.data;
  
  try {
    const updateData: Partial<UserProfile> = {};
    if (displayName) updateData.displayName = displayName;
    if (organization) updateData.organization = organization;
    if (yearOfPassout) updateData.yearOfPassout = yearOfPassout;

    // Update Firebase Auth profile (for displayName and photoURL if applicable)
    if (displayName && auth.currentUser) {
      await updateFirebaseProfile(auth.currentUser, { displayName });
    }
    
    // Update Firestore document
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, updateData, { merge: true });
    
    return { message: "Profile updated successfully." };
  } catch (error: any) {
    return { error: error.message || "Profile update failed." };
  }
}
