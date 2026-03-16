import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase.js';

const getKiinteistot = async () => {
    const docRef = await addDoc(collection(db, 'kiinteistot'), {});
    return docRef.id;
}

export { getKiinteistot };