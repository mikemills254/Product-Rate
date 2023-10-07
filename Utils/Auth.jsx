import { auth, Db } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export const SignUp = {
    EmailandPassword: async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const docID = await storeUserInfor(username, email, password)
            return user;
        } catch (error) {
            console.error("Sign in error:", error.code, error.message);
            throw error;
        }
    }
};

export const SignIn = {
    EmailandPassword :async (email, password) => {
        try {
            const results = await signInWithEmailAndPassword(auth, email, password)
            const user = results.user;
            return user
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    }
}

export const ResetPassword =  async (email) => {
    await sendPasswordResetEmail(auth, email ).then(() => {
        return { msg: 'Email sent' }
    })
}


const storeUserInfor = async (username, email, password) => {
    try {
        const docRef = await addDoc(collection(Db, "Users"), {
            Username: username,
            Email: email,
            Password: password,
        });
        return docRef.id
    } catch (error) {
        throw error
    }
}
