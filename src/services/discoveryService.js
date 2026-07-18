import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../firebase'

const safeId = (value) => String(value).replace(/[^a-zA-Z0-9_-]/g, '-')
export async function saveRecentSearch(userId, term){if(!userId||!term.trim())return;await setDoc(doc(db,'recentSearches',`${userId}_${safeId(term.toLowerCase())}`),{userId,term:term.trim(),updatedAt:serverTimestamp()},{merge:true})}
export async function getRecentSearches(userId){if(!userId)return[];const s=await getDocs(query(collection(db,'recentSearches'),where('userId','==',userId),orderBy('updatedAt','desc'),limit(8)));return s.docs.map(d=>({id:d.id,...d.data()}))}
export async function clearRecentSearches(userId){const s=await getDocs(query(collection(db,'recentSearches'),where('userId','==',userId)));await Promise.all(s.docs.map(d=>deleteDoc(d.ref)))}
export async function logShare(userId,propertyId,channel){await addDoc(collection(db,'shareLogs'),{userId:userId||null,propertyId,channel,createdAt:serverTimestamp()})}
export async function createInquiry(payload){return addDoc(collection(db,'inquiries'),{...payload,status:'open',createdAt:serverTimestamp(),updatedAt:serverTimestamp()})}
export async function trackPropertyView(userId,propertyId){if(!propertyId)return;await addDoc(collection(db,'propertyViews'),{userId:userId||null,propertyId,createdAt:serverTimestamp()})}
