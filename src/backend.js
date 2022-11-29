import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const login = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    return null;
  }
}

export const logout = async () => {
  const auth = getAuth();
  await auth.signOut();
}

/**
 * Register a new user
 * @param {String} email User's email
 * @param {String} password User's password
 * @param {String} name User's name
 * @returns 
 */
export const register = async (email, password, name) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await userCredential.user.updateProfile({ displayName: name });
    return userCredential.user;
  } catch (error) {
    console.error(error.message)
    return null;
  }
}