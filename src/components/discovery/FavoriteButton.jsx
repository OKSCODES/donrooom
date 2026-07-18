import { Heart } from 'lucide-react'
import { useEffect,useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import { addFavorite,isFavorite,removeFavorite } from '../../services/guestService'
export function FavoriteButton({property,className=''}){const{user,role}=useAuth();const[saved,setSaved]=useState(false);useEffect(()=>{if(user&&role==='guest')isFavorite(user.uid,property.id).then(setSaved).catch(()=>{})},[user,role,property.id]);const toggle=async()=>{if(!user||role!=='guest'){toast.error('Sign in as a guest to save properties.');return}try{saved?await removeFavorite(user.uid,property.id):await addFavorite(user.uid,property);setSaved(!saved);toast.success(saved?'Removed from favorites.':'Saved to favorites.')}catch(e){toast.error(e.message)}};return <button type="button" onClick={toggle} aria-pressed={saved} aria-label={saved?'Remove from favorites':'Add to favorites'} className={`rounded-full bg-white/95 p-2.5 shadow ${saved?'text-red-600':'text-black/65'} ${className}`}><Heart size={20} fill={saved?'currentColor':'none'}/></button>}
