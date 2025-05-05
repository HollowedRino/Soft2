import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    signOut 
  } from 'firebase/auth';
  import { FirebaseAuth } from './config';

  
  const googleProvider = new GoogleAuthProvider();
  
  // Login con Google
  export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(FirebaseAuth, googleProvider);
      console.log(result)
      const { displayName, email, uid } = result.user;
  
      return {
        ok: true,
        displayName,
        email,
        uid
      };
    } catch (error) {
      return {
        ok: false,
        errorMessage: error.message,
        errorCode: error.code 
      };
    }
  };
  
  // Registro con email y password
  export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
      const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      const { uid, photoURL } = resp.user;
  
      await updateProfile(FirebaseAuth.currentUser, { displayName });
  
      return {
        ok: true,
        uid,
        photoURL,
        email,
        displayName
      };
    } catch (error) {
      return { 
        ok: false, 
        errorMessage: error.message,
        errorCode: error.code 
      };
    }
  };
  
  // Login con email y password
  export const loginWithEmailPassword = async ({ email, password }) => {
    try {
      const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
      const { uid, photoURL, displayName } = resp.user;
  
      return {
        ok: true,
        uid,
        photoURL,
        displayName
      };
    } catch (error) {
      return {
        ok: false,
        errorMessage: error.message,
        errorCode: error.code 
      };
    }
  };
  
  // Logout
  export const logoutFirebase = async () => {
    return await signOut(FirebaseAuth);
  };