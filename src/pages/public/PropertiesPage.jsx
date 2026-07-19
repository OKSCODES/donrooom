import { Grid2X2, List, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageContainer } from '../../components/common/PageContainer'
import { EmptyState } from '../../components/public/EmptyState'
import { PageHeader } from '../../components/public/PageHeader'
import { PropertyCard } from '../../components/public/PropertyCard'
import { SearchBar } from '../../components/public/SearchBar'
import { useSeo } from '../../hooks/useSeo'
import { listApprovedProperties } from '../../services/publicPropertyService'

export default function PropertiesPage(){
  useSeo({title:'Properties',description:'Search and compare verified accommodation in Sohra.',path:'/properties'})
  const [params]=useSearchParams()
  const [properties,setProperties]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState('')
  const [query,setQuery]=useState(params.get('q')||'')
  const [maxPrice,setMaxPrice]=useState(10000)
  const [rating,setRating]=useState(0)
  const [type,setType]=useState('All')
  const [sort,setSort]=useState('rating')
  const [view,setView]=useState('grid')
  const [page,setPage]=useState(1)
  const perPage=6

  useEffect(()=>{let active=true;listApprovedProperties().then(rows=>{if(active)setProperties(rows)}).catch(err=>{if(active)setError(err.message||'Properties could not be loaded.')}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[])
  const types=useMemo(()=>['All',...new Set(properties.map(property=>property.type).filter(Boolean))],[properties])
  const filtered=useMemo(()=>{const q=query.toLowerCase().trim();const rows=properties.filter(p=>(!q||`${p.name} ${p.location} ${p.village} ${p.amenities.join(' ')}`.toLowerCase().includes(q))&&p.price<=maxPrice&&p.rating>=rating&&(type==='All'||p.type===type));return [...rows].sort((a,b)=>sort==='low'?a.price-b.price:sort==='high'?b.price-a.price:sort==='new'?String(b.createdAt?.seconds||b.id).localeCompare(String(a.createdAt?.seconds||a.id)):b.rating-a.rating)},[properties,query,maxPrice,rating,type,sort])
  const total=Math.max(1,Math.ceil(filtered.length/perPage))
  const pageRows=filtered.slice((page-1)*perPage,page*perPage)
  const reset=()=>{setQuery('');setMaxPrice(10000);setRating(0);setType('All');setPage(1)}

  return <><PageHeader eyebrow="Find your stay" title="Properties across Sohra" description="Search approved properties and available rooms loaded directly from DONROOM."/><PageContainer className="py-10"><SearchBar compact/><div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]"><aside className="h-fit rounded-[1.75rem] border border-default bg-white p-5 shadow-lg shadow-black/5"><h2 className="flex items-center gap-2 text-lg font-black"><SlidersHorizontal size={19}/>Filters</h2><label className="mt-5 block text-sm font-bold">Property or village<input className="mt-2 w-full rounded-xl border border-default px-4 py-3 outline-none focus:border-[#3F7D58]" onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search keyword" value={query}/></label><label className="mt-5 block text-sm font-bold">Maximum price: ₹{maxPrice.toLocaleString('en-IN')}<input className="mt-3 w-full accent-[#3F7D58]" max="10000" min="0" onChange={e=>{setMaxPrice(Number(e.target.value));setPage(1)}} step="100" type="range" value={maxPrice}/></label><label className="mt-5 block text-sm font-bold">Minimum rating<select className="mt-2 w-full rounded-xl border border-default px-4 py-3" onChange={e=>{setRating(Number(e.target.value));setPage(1)}} value={rating}><option value="0">Any rating</option><option value="4">4.0+</option><option value="4.5">4.5+</option></select></label><label className="mt-5 block text-sm font-bold">Property type<select className="mt-2 w-full rounded-xl border border-default px-4 py-3" onChange={e=>{setType(e.target.value);setPage(1)}} value={type}>{types.map(item=><option key={item}>{item}</option>)}</select></label><button className="mt-6 w-full rounded-xl bg-cream px-4 py-3 font-bold" onClick={reset} type="button">Reset filters</button></aside><main><div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="font-semibold"><span className="font-black">{filtered.length}</span> stays found</p><div className="flex items-center gap-2"><select aria-label="Sort properties" className="rounded-full border border-default bg-white px-4 py-2 text-sm font-semibold" onChange={e=>setSort(e.target.value)} value={sort}><option value="rating">Highest rating</option><option value="low">Lowest price</option><option value="high">Highest price</option><option value="new">Newest</option></select><button aria-label="Grid view" className={`rounded-full p-2.5 ${view==='grid'?'bg-primary-action':'bg-white'}`} onClick={()=>setView('grid')}><Grid2X2 size={18}/></button><button aria-label="List view" className={`rounded-full p-2.5 ${view==='list'?'bg-primary-action':'bg-white'}`} onClick={()=>setView('list')}><List size={18}/></button></div></div>{loading?<p className="rounded-3xl bg-cream p-8 text-center font-semibold text-muted">Loading approved properties…</p>:error?<EmptyState title="Properties are temporarily unavailable" description={error}/>:pageRows.length?<div className={view==='grid'?'grid gap-6 xl:grid-cols-2':'grid gap-6'}>{pageRows.map(p=><PropertyCard key={p.id} property={p} view={view}/>)}</div>:<EmptyState onReset={reset} title="No approved stays found" description="Try changing the filters. Approved properties with available room data appear automatically."/>}{filtered.length>perPage&&<div className="mt-8 flex justify-center gap-2">{Array.from({length:total},(_,i)=>i+1).map(n=><button aria-label={`Page ${n}`} className={`h-10 w-10 rounded-full font-bold ${page===n?'bg-dark-surface text-white':'bg-white'}`} key={n} onClick={()=>setPage(n)}>{n}</button>)}</div>}</main></div></PageContainer></>
}
