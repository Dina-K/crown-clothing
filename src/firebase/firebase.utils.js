import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAYoO6wsLKap8w79mCvqGa8yLe7kRhvmhc",
    authDomain: "crown-db-783af.firebaseapp.com",
    databaseURL: "https://crown-db-783af.firebaseio.com",
    projectId: "crown-db-783af",
    storageBucket: "crown-db-783af.appspot.com",
    messagingSenderId: "942523064167",
    appId: "1:942523064167:web:47e0ea9f8239ee787459c2",
    measurementId: "G-61E32ZF00L"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    //if the snapShot doesnt exists we create data in that place
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
