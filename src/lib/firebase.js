import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  // firebase config redacted :)
  
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const sitesCollection = collection(db, 'potatosites');


// @ts-ignore
export async function addPotatoSiteToDB(potatoSite) {
  const docData = { url: potatoSite.url, tags: potatoSite.tags };
  const docReference = await addDoc(sitesCollection, docData);
  console.log(docReference.id);
}