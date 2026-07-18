import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
const requireDb=()=>{if(!db)throw new Error('Firebase Firestore is not configured.')}
const mapDocs=(snapshot)=>snapshot.docs.map((item)=>({id:item.id,...item.data()}))
export async function listAdminCollection(name,max=250){if(!db)return[];try{return mapDocs(await getDocs(query(collection(db,name),orderBy('createdAt','desc'),limit(max))))}catch{return mapDocs(await getDocs(query(collection(db,name),limit(max))))}}
export async function getAdminDocument(name,id){requireDb();const snap=await getDoc(doc(db,name,id));return snap.exists()?{id:snap.id,...snap.data()}:null}
export async function createAdminDocument(name,data,admin){requireDb();const ref=await addDoc(collection(db,name),{...data,createdAt:serverTimestamp(),updatedAt:serverTimestamp()});await writeAudit(admin,`Created ${name}`,name,ref.id);return ref.id}
export async function updateAdminDocument(name,id,data,admin){requireDb();await updateDoc(doc(db,name,id),{...data,updatedAt:serverTimestamp()});await writeAudit(admin,`Updated ${name}`,name,id)}
export async function deleteAdminDocument(name,id,admin){requireDb();await deleteDoc(doc(db,name,id));await writeAudit(admin,`Deleted ${name}`,name,id)}
export async function setUserRole(id,role,admin){return updateAdminDocument('users',id,{role},admin)}
export async function setUserStatus(id,status,admin){return updateAdminDocument('users',id,{status},admin)}
export async function moderateProperty(id,status,reason,admin){return updateAdminDocument('properties',id,{status,rejectionReason:status==='rejected'?reason:'',adminNotes:reason||'',reviewedBy:admin.uid,reviewedAt:serverTimestamp()},admin)}
export async function togglePropertyFeatured(id,featured,admin){return updateAdminDocument('properties',id,{featured},admin)}
export async function setBookingStatus(id,status,admin){return updateAdminDocument('bookings',id,{status},admin)}
export async function moderateReview(id,status,admin){return updateAdminDocument('reviews',id,{moderationStatus:status},admin)}
export async function writeAudit(admin,action,targetType,targetId,metadata={}){requireDb();return addDoc(collection(db,'auditLogs'),{action,targetType,targetId,metadata,actorId:admin?.uid||'',actorName:admin?.fullName||admin?.email||'Administrator',createdAt:serverTimestamp(),ipAddress:'Client IP recorded by trusted backend in production'})}
export async function getSiteSettings(){if(!db)return{};const snap=await getDoc(doc(db,'siteSettings','global'));return snap.exists()?snap.data():{}}
export async function saveSiteSettings(data,admin){requireDb();await setDoc(doc(db,'siteSettings','global'),{...data,updatedAt:serverTimestamp()},{merge:true});await writeAudit(admin,'Updated site settings','siteSettings','global')}
export async function broadcastNotification(data,admin){requireDb();const id=crypto.randomUUID();await setDoc(doc(db,'notifications',id),{id,title:data.title,message:data.message,audience:data.audience,recipientId:'broadcast',read:false,archived:false,createdBy:admin.uid,createdAt:serverTimestamp()});await writeAudit(admin,'Broadcast notification','notifications',id);return id}
