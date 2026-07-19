import { useEffect,useMemo,useState } from 'react'
import { SlidersHorizontal,X } from 'lucide-react'
import { PageContainer } from '../../components/common/PageContainer'
import { PropertyCard } from '../../components/public/PropertyCard'
import { EmptyState } from '../../components/public/EmptyState'
import { ComparisonTable } from '../../components/discovery/ComparisonTable'
import { useAuth } from '../../hooks/useAuth'
import { useSeo } from '../../hooks/useSeo'
import { clearRecentSearches,getRecentSearches,saveRecentSearch } from '../../services/discoveryService'
import { listApprovedProperties } from '../../services/publicPropertyService'

export default function SearchPage(){
  const{user}=useAuth()
  const[properties,setProperties]=useState([])
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState('')
  const[q,setQ]=useState('')
  const[debounced,setDebounced]=useState('')
  const[maxPrice,setMaxPrice]=useState(10000)
  const[type,setType]=useState('all')
  const[rating,setRating]=useState(0)
  const[selected,setSelected]=useState([])
  const[sort,setSort]=useState('popular')
  const[recent,setRecent]=useState([])
  const[showFilters,setShowFilters]=useState(false)
  const[compare,setCompare]=useState([])
  useSeo({title:'Search stays in Sohra',description:'Search and filter verified accommodation across Sohra.',path:'/search'})

  useEffect(()=>{let active=true;listApprovedProperties().then(rows=>{if(active)setProperties(rows)}).catch(err=>{if(active)setError(err.message||'Properties could not be loaded.')}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[])
  useEffect(()=>{const timer=setTimeout(()=>setDebounced(q.trim().toLowerCase()),300);return()=>clearTimeout(timer)},[q])
  useEffect(()=>{if(user)getRecentSearches(user.uid).then(setRecent).catch(()=>{})},[user])
  useEffect(()=>{if(user&&debounced.length>2){const timer=setTimeout(()=>saveRecentSearch(user.uid,debounced).catch(()=>{}),800);return()=>clearTimeout(timer)}},[user,debounced])

  const types=useMemo(()=>[...new Set(properties.map(property=>property.type).filter(Boolean))],[properties])
  const amenities=useMemo(()=>[...new Set(properties.flatMap(property=>property.amenities||[]))],[properties])
  const results=useMemo(()=>{const list=properties.filter(property=>{const hay=[property.name,property.village,property.location,property.type,property.roomType,...property.amenities].join(' ').toLowerCase();return(!debounced||hay.includes(debounced))&&property.price<=maxPrice&&(type==='all'||property.type===type)&&property.rating>=rating&&selected.every(item=>property.amenities.includes(item))});return [...list].sort((a,b)=>sort==='low'?a.price-b.price:sort==='high'?b.price-a.price:sort==='rating'?b.rating-a.rating:sort==='new'?String(b.createdAt?.seconds||b.id).localeCompare(String(a.createdAt?.seconds||a.id)):b.reviews-a.reviews)},[properties,debounced,maxPrice,type,rating,selected,sort])
  const filters=<div className="grid gap-5"><label className="font-bold">Maximum nightly price <span className="float-right">₹{maxPrice.toLocaleString('en-IN')}</span><input aria-label="Maximum price" className="mt-3 w-full accent-[#3F7D58]" type="range" min="0" max="10000" step="100" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/></label><label className="font-bold">Property type<select className="mt-2 w-full rounded-xl border border-black/15 p-3 font-normal" value={type} onChange={e=>setType(e.target.value)}><option value="all">All types</option>{types.map(item=><option key={item}>{item}</option>)}</select></label><label className="font-bold">Minimum rating<select className="mt-2 w-full rounded-xl border border-black/15 p-3 font-normal" value={rating} onChange={e=>setRating(Number(e.target.value))}><option value="0">Any rating</option><option value="4">4.0+</option><option value="4.5">4.5+</option></select></label><fieldset><legend className="font-bold">Amenities</legend><div className="mt-3 grid gap-2">{amenities.map(item=><label key={item} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={selected.includes(item)} onChange={()=>setSelected(value=>value.includes(item)?value.filter(x=>x!==item):[...value,item])}/>{item}</label>)}</div></fieldset><button onClick={()=>{setMaxPrice(10000);setType('all');setRating(0);setSelected([])}} className="rounded-xl border border-black/15 px-4 py-3 font-bold">Reset filters</button></div>

  return <PageContainer className="py-10"><div className="rounded-[2rem] bg-dark-surface p-7 text-white"><p className="font-bold uppercase tracking-widest text-donroom-primary">Discover Sohra</p><h1 className="mt-2 text-4xl font-black sm:text-5xl">Find a stay that fits your journey.</h1><div className="mt-7 flex gap-3"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Property, village, room or amenity" className="min-w-0 flex-1 rounded-2xl bg-white px-5 py-4 text-black outline-none focus:ring-4 focus:ring-[#FFF380]/40"/><button onClick={()=>setShowFilters(true)} className="rounded-2xl bg-primary-action px-5 text-black lg:hidden" aria-label="Open filters"><SlidersHorizontal/></button></div>{recent.length>0&&<div className="mt-4 flex flex-wrap items-center gap-2 text-sm"><span>Recent:</span>{recent.map(item=><button onClick={()=>setQ(item.term)} className="rounded-full bg-white/10 px-3 py-1" key={item.id}>{item.term}</button>)}<button onClick={async()=>{await clearRecentSearches(user.uid);setRecent([])}} className="underline">Clear</button></div>}</div><div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]"><aside className="hidden h-fit rounded-[2rem] border border-default bg-white p-6 lg:block">{filters}</aside><main><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><p className="font-bold">{results.length} stays found</p><select aria-label="Sort properties" className="rounded-xl border border-black/15 p-3" value={sort} onChange={e=>setSort(e.target.value)}><option value="popular">Most popular</option><option value="low">Lowest price</option><option value="high">Highest price</option><option value="rating">Highest rating</option><option value="new">Newest</option></select></div>{loading?<p className="rounded-3xl bg-cream p-8 text-center font-semibold text-muted">Loading approved properties…</p>:error?<EmptyState title="Search is temporarily unavailable" description={error}/>:results.length?<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{results.map(property=><div key={property.id} className="relative"><PropertyCard property={property}/><label className="mt-2 flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={compare.some(item=>item.id===property.id)} disabled={!compare.some(item=>item.id===property.id)&&compare.length>=4} onChange={()=>setCompare(value=>value.some(item=>item.id===property.id)?value.filter(item=>item.id!==property.id):[...value,property])}/>Compare this property</label></div>)}</div>:<EmptyState title="No approved stays match those filters" description="Try a nearby village, higher price range, or fewer amenities."/>}</main></div>{compare.length>=2&&<section className="mt-12"><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">Property comparison</h2><button className="font-bold underline" onClick={()=>setCompare([])}>Clear</button></div><ComparisonTable items={compare} onRemove={id=>setCompare(value=>value.filter(item=>item.id!==id))}/></section>}{showFilters&&<div className="fixed inset-0 z-[90] bg-black/50 p-4 lg:hidden"><div className="ml-auto h-full max-w-sm overflow-y-auto rounded-[2rem] bg-white p-6"><div className="mb-5 flex justify-between"><h2 className="text-xl font-black">Filters</h2><button onClick={()=>setShowFilters(false)} aria-label="Close filters"><X/></button></div>{filters}</div></div>}</PageContainer>
}
