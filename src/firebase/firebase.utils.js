import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAu6G-kxQXc1vVof8D-iZFbQ1sHG2ElWQA",
  authDomain: "crwn-db-84abc.firebaseapp.com",
  projectId: "crwn-db-84abc",
  storageBucket: "crwn-db-84abc.appspot.com",
  messagingSenderId: "860337511710",
  appId: "1:860337511710:web:178b4974b0122e36ee7d0f"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; //se não tiver usuario, não faz nada

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

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
    }

    catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;

};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
