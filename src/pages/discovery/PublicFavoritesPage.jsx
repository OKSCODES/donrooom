import { useEffect,useMemo,useState } from 'react'
import { PageContainer } from '../../components/common/PageContainer'
import FavoriteCard from '../../components/guest/FavoriteCard'
import GuestEmptyState from '../../components/guest/GuestEmptyState'
import { useAuth } from '../../hooks/useAuth'
import { useSeo } from '../../hooks/useSeo'
import { listFavorites } from '../../services/guestService'
export default function PublicFavoritesPage(){const{user}=useAuth();const[items,setItems]=useState([]);const[q,setQ]=useState('');useSeo({title:'Favorite stays',description:'Your saved DONROOM properties.',path:'/favorites'});useEffect(()=>{if(user)listFavorites(user.uid).then(setItems).catch(()=>{})},[user]);const shown=useMemo(()=>items.filter(x=>(x.propertyName||x.name||'').toLowerCase().includes(q.toLowerCase())),[items,q]);return <PageContainer className="py-10"><h1 className="text-4xl font-black">Favorite stays</h1><p className="mt-2 text-muted">Keep your shortlist together while planning your Sohra trip.</p><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search favorites" className="mt-6 w-full max-w-xl rounded-xl border border-black/15 p-4"/>{shown.length?<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{shown.map(x=><FavoriteCard key={x.id} item={x} onRemove={(item)=>setItems(v=>v.filter(i=>i.id!==item.id))}/>)}</div>:<GuestEmptyState title="No saved properties" description="Use the heart button to save stays you love."/>}</PageContainer>}
