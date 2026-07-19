import { useEffect, useState } from 'react'
import { List,Map as MapIcon } from 'lucide-react'
import { PageContainer } from '../../components/common/PageContainer'
import { EmptyState } from '../../components/public/EmptyState'
import { PropertyCard } from '../../components/public/PropertyCard'
import { PropertyMap } from '../../components/discovery/PropertyMap'
import { useSeo } from '../../hooks/useSeo'
import { listApprovedProperties } from '../../services/publicPropertyService'

export default function MapPage(){
  const[mode,setMode]=useState('map')
  const[properties,setProperties]=useState([])
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState('')
  useSeo({title:'Map of stays in Sohra',description:'Explore DONROOM properties by location.',path:'/map'})
  useEffect(()=>{let active=true;listApprovedProperties().then(rows=>{if(active)setProperties(rows)}).catch(err=>{if(active)setError(err.message||'Properties could not be loaded.')}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[])
  return <PageContainer className="py-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-bold uppercase tracking-widest text-donroom-success">Explore visually</p><h1 className="mt-2 text-4xl font-black">Stays across Sohra</h1><p className="mt-2 text-muted">Approved properties are loaded directly from DONROOM.</p></div><div className="flex rounded-xl border border-default bg-white p-1"><button onClick={()=>setMode('map')} className={`flex gap-2 rounded-lg px-4 py-2 font-bold ${mode==='map'?'bg-primary-action':''}`}><MapIcon size={18}/>Map</button><button onClick={()=>setMode('list')} className={`flex gap-2 rounded-lg px-4 py-2 font-bold ${mode==='list'?'bg-primary-action':''}`}><List size={18}/>List</button></div></div><div className="mt-8">{loading?<p className="rounded-3xl bg-cream p-8 text-center font-semibold text-muted">Loading approved properties…</p>:error?<EmptyState title="Map is temporarily unavailable" description={error}/>:!properties.length?<EmptyState title="No approved properties yet" description="Approved properties will appear here automatically."/>:mode==='map'?<PropertyMap properties={properties}/>:<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{properties.map(property=><PropertyCard key={property.id} property={property}/>)}</div>}</div></PageContainer>
}
