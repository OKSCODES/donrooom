import { useState } from 'react'
import { List,Map as MapIcon } from 'lucide-react'
import { PageContainer } from '../../components/common/PageContainer'
import { PropertyCard } from '../../components/public/PropertyCard'
import { PropertyMap } from '../../components/discovery/PropertyMap'
import { properties } from '../../data/publicData'
import { useSeo } from '../../hooks/useSeo'
export default function MapPage(){const[mode,setMode]=useState('map');useSeo({title:'Map of stays in Sohra',description:'Explore DONROOM properties by location.',path:'/map'});return <PageContainer className="py-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-bold uppercase tracking-widest text-donroom-success">Explore visually</p><h1 className="mt-2 text-4xl font-black">Stays across Sohra</h1><p className="mt-2 text-muted">Select a marker to preview a property and open its details.</p></div><div className="flex rounded-xl border border-default bg-white p-1"><button onClick={()=>setMode('map')} className={`flex gap-2 rounded-lg px-4 py-2 font-bold ${mode==='map'?'bg-primary-action':''}`}><MapIcon size={18}/>Map</button><button onClick={()=>setMode('list')} className={`flex gap-2 rounded-lg px-4 py-2 font-bold ${mode==='list'?'bg-primary-action':''}`}><List size={18}/>List</button></div></div><div className="mt-8">{mode==='map'?<PropertyMap properties={properties}/>:<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{properties.map(p=><PropertyCard key={p.id} property={p}/>)}</div>}</div></PageContainer>}
