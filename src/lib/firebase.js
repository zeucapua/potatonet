import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  // firebase config redacted :)
  apiKey: "AIzaSyCAY8aP6jfKkRA8J-y1Y1NMFvEeE2qQeUk",
  authDomain: "potatonet-d9679.firebaseapp.com",
  projectId: "potatonet-d9679",
  storageBucket: "potatonet-d9679.appspot.com",
  messagingSenderId: "664735654169",
  appId: "1:664735654169:web:bf2c9b021c03ad29312588",
  measurementId: "G-LYXZZ1R2GV"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const sitesCollection = collection(db, 'potatosites');


// @ts-ignore
export async function addPotatoSiteToDB(potatoSite) {
  const docData = { url: potatoSite.url, tags: potatoSite.tags };
  const docReference = await addDoc(sitesCollection, docData);
  return docReference;
}