import { Bath, BedDouble, Check, ChevronLeft, ChevronRight, MapPin, Maximize2, MessageCircle, Phone, Share2, ShieldCheck, Users, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageContainer } from '../../components/common/PageContainer'
import { Breadcrumb } from '../../components/public/Breadcrumb'
import { Rating } from '../../components/public/Rating'
import { PropertyCard } from '../../components/public/PropertyCard'
import { FavoriteButton } from '../../components/discovery/FavoriteButton'
import { InquiryForm } from '../../components/discovery/InquiryForm'
import { ShareModal } from '../../components/discovery/ShareModal'
import { useAuth } from '../../hooks/useAuth'
import { useSeo } from '../../hooks/useSeo'
import { trackRecentlyViewed } from '../../services/guestService'
import { trackPropertyView } from '../../services/discoveryService'
import { getApprovedProperty, listApprovedProperties } from '../../services/publicPropertyService'
import NotFoundPage from './NotFoundPage'

export default function PropertyDetailsPage(){
  const {id}=useParams()
  const {user,role}=useAuth()
  const [property,setProperty]=useState(null)
  const [allProperties,setAllProperties]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState('')
  const [viewer,setViewer]=useState(null)
  const [share,setShare]=useState(false)
  const [inquiry,setInquiry]=useState(false)

  useEffect(()=>{let active=true;setLoading(true);Promise.all([getApprovedProperty(id),listApprovedProperties()]).then(([item,rows])=>{if(active){setProperty(item);setAllProperties(rows)}}).catch(err=>{if(active)setError(err.message||'Property could not be loaded.')}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[id])
  useEffect(()=>{if(!property)return;trackPropertyView(user?.uid,property.id).catch(()=>{});if(user&&role==='guest')trackRecentlyViewed(user.uid,property).catch(()=>{})},[user,role,property])

  const propertySchema=useMemo(()=>property?{
    '@context':'https://schema.org','@type':'LodgingBusiness',name:property.name,description:property.description,
    image:property.gallery,address:{'@type':'PostalAddress',streetAddress:property.address||'',addressLocality:property.village,addressRegion:'Meghalaya',addressCountry:'IN'},
    ...(property.reviews>0&&property.rating>0?{aggregateRating:{'@type':'AggregateRating',ratingValue:property.rating,reviewCount:property.reviews}}:{}),
    priceRange:`₹${property.price} per night`,url:`${window.location.origin}/property/${property.id}`,
  }:null,[property])
  const breadcrumbSchema=useMemo(()=>property?{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:window.location.origin},
    {'@type':'ListItem',position:2,name:'Properties',item:`${window.location.origin}/properties`},
    {'@type':'ListItem',position:3,name:property.name,item:`${window.location.origin}/property/${property.id}`},
  ]}:null,[property])
  useSeo({title:property?.name||'Property',description:property?.description||'Property details',path:`/property/${id}`,image:property?.gallery?.[0]||'/icons/icon-512.svg',type:'website',keywords:property?[property.name,property.village,property.type,...property.amenities]:undefined,structuredData:[propertySchema,breadcrumbSchema]})

  const similar=useMemo(()=>property?allProperties.filter(item=>item.id!==property.id&&(item.type===property.type||item.village===property.village)).slice(0,3):[],[property,allProperties])
  if(loading)return <PageContainer className="py-20"><p className="rounded-3xl bg-cream p-10 text-center font-semibold text-muted">Loading approved property…</p></PageContainer>
  if(error)return <PageContainer className="py-20"><div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center"><h1 className="text-2xl font-black">Property could not be loaded</h1><p className="mt-3 text-red-700">{error}</p><Link className="mt-6 inline-flex rounded-full bg-dark-surface px-5 py-3 font-bold text-white" to="/properties">Back to properties</Link></div></PageContainer>
  if(!property)return <NotFoundPage/>

  const primaryRoom=property.rooms[0]
  const phone=String(property.phone||'').replace(/\D/g,'')
  const whatsapp=String(property.whatsapp||property.phone||'').replace(/\D/g,'')
  const nearby=['Nohkalikai Falls','Mawsmai Cave','Local Khasi market','Sohra Civil Hospital','Fuel station']
  return <PageContainer className="py-8 sm:py-12">
    <Breadcrumb items={[{label:'Properties',to:'/properties'},{label:property.name}]}/>
    <div className="mt-6 grid gap-3 overflow-hidden rounded-[2rem] lg:grid-cols-2">
      <button className="group relative" onClick={()=>setViewer(0)}><img className="h-[420px] w-full object-cover lg:h-[520px]" src={property.gallery[0]} alt={property.name}/><span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold shadow"><Maximize2 size={17}/>View gallery</span></button>
      <div className="grid grid-cols-2 gap-3">{property.gallery.slice(1,5).map((image,index)=><button onClick={()=>setViewer(index+1)} key={image}><img className="h-full min-h-48 w-full object-cover" loading="lazy" alt={`${property.name} view ${index+2}`} src={image}/></button>)}</div>
    </div>
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
      <main>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><p className="font-bold uppercase tracking-widest text-donroom-success">{property.type}</p><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">Admin approved</span></div><h1 className="mt-2 text-4xl font-black sm:text-5xl">{property.name}</h1><p className="mt-3 flex items-center gap-2 text-muted"><MapPin size={18}/>{property.location}</p></div><div className="flex items-center gap-3"><Rating count={property.reviews} value={property.rating}/><FavoriteButton property={property}/><button onClick={()=>setShare(true)} aria-label="Share property" className="rounded-full bg-cream p-3"><Share2 size={20}/></button></div></div>
        <section className="mt-10"><h2 className="text-2xl font-black">About this stay</h2><p className="mt-4 text-lg leading-8 text-black/65">{property.description}</p></section>
        <section className="mt-10"><h2 className="text-2xl font-black">Top amenities</h2>{property.amenities.length?<div className="mt-5 grid gap-3 sm:grid-cols-2">{property.amenities.map(item=><div className="flex items-center gap-3 rounded-2xl bg-cream p-4" key={item}><Check className="text-donroom-success" size={19}/><span className="font-semibold">{item}</span></div>)}</div>:<p className="mt-4 text-muted">The property owner has not listed amenities yet.</p>}</section>
        <section className="mt-10"><h2 className="text-2xl font-black">Available rooms</h2>{property.rooms.length?<div className="mt-5 space-y-4">{property.rooms.map(room=><article className="rounded-[1.75rem] border border-black/8 bg-white p-6 shadow-lg shadow-black/5" key={room.id}><div className="flex flex-col justify-between gap-5 sm:flex-row"><div><h3 className="text-xl font-black">{room.name}</h3><p className="mt-1 text-sm font-semibold text-donroom-success">{room.type}</p><div className="mt-3 flex flex-wrap gap-4 text-sm text-muted"><span className="flex gap-1"><Users size={17}/>{room.capacity} guests</span><span className="flex gap-1"><BedDouble size={17}/>{room.beds} beds</span><span className="flex gap-1"><Bath size={17}/>{room.bathrooms} bathroom</span></div><p className="mt-3 max-w-xl text-sm leading-6 text-muted">{room.description}</p></div><div className="sm:text-right"><p className="text-2xl font-black">₹{room.price.toLocaleString('en-IN')}</p><p className="text-sm text-muted">per night</p><Link className="mt-4 inline-block rounded-full bg-primary-action px-5 py-2.5 font-bold" to={`/booking?propertyId=${property.id}&roomId=${room.id}`}>Book room</Link></div></div></article>)}</div>:<p className="mt-4 rounded-2xl bg-cream p-5 text-muted">No rooms are currently marked available.</p>}</section>
        <section className="mt-10"><h2 className="text-2xl font-black">House rules & cancellation</h2><ul className="mt-4 grid gap-3">{property.rules.map(rule=><li className="flex gap-3 text-black/65" key={rule}><ShieldCheck className="shrink-0 text-donroom-success" size={19}/>{rule}</li>)}</ul>{property.cancellationPolicy&&<p className="mt-4 rounded-2xl border border-black/8 p-4 text-sm text-muted">{property.cancellationPolicy}</p>}</section>
        <section className="mt-10"><h2 className="text-2xl font-black">Nearby places</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{nearby.map((item,index)=><div key={item} className="flex justify-between rounded-xl border border-black/8 p-4"><span>{item}</span><span className="text-sm text-subtle">{2+index*1.4} km</span></div>)}</div></section>
        <section className="mt-10"><h2 className="text-2xl font-black">Location</h2><div className="mt-5 grid min-h-64 place-items-center rounded-[2rem] bg-[linear-gradient(135deg,#dcebd9,#e8e3d5)] text-center"><div><MapPin className="mx-auto text-donroom-success" size={34}/><p className="mt-3 font-black">{property.location}</p>{property.googleMapUrl?<a href={property.googleMapUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block font-bold text-donroom-success">Open location in Google Maps</a>:<Link to="/map" className="mt-2 inline-block font-bold text-donroom-success">Open all properties on map</Link>}</div></div></section>
        {similar.length>0&&<section className="mt-12"><h2 className="text-2xl font-black">Similar stays</h2><div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{similar.map(item=><PropertyCard key={item.id} property={item}/>)}</div></section>}
      </main>
      <aside><div className="sticky top-24 rounded-[2rem] border border-default bg-white p-6 shadow-2xl shadow-black/10"><p className="text-3xl font-black">₹{property.price.toLocaleString('en-IN')}<span className="text-sm font-medium text-muted"> / night</span></p><p className="mt-2 text-sm text-muted">{property.availableRooms} room{property.availableRooms===1?'':'s'} currently available</p><div className="mt-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-default"><label className="p-3 text-xs font-bold uppercase">Check in<input className="mt-1 w-full text-sm font-medium outline-none" type="date"/></label><label className="border-l border-default p-3 text-xs font-bold uppercase">Guests<select className="mt-1 w-full text-sm font-medium outline-none"><option>2 guests</option><option>3 guests</option><option>4 guests</option></select></label></div>{primaryRoom?<Link className="mt-5 block w-full rounded-2xl bg-primary-action px-5 py-4 text-center font-black" to={`/booking?propertyId=${property.id}&roomId=${primaryRoom.id}`}>Book now</Link>:<button disabled className="mt-5 block w-full rounded-2xl bg-gray-200 px-5 py-4 text-center font-black text-gray-500">No rooms available</button>}<button onClick={()=>setInquiry(value=>!value)} className="mt-3 w-full rounded-2xl border border-black/15 px-5 py-3 font-bold">Contact property owner</button><div className="mt-4 flex justify-center gap-5 text-sm font-bold">{phone&&<a href={`tel:+${phone}`} className="flex items-center gap-1"><Phone size={16}/>Call</a>}{whatsapp&&<a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello, I am interested in ${property.name}.`)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1"><MessageCircle size={16}/>WhatsApp</a>}</div>{inquiry&&<div className="mt-6 border-t border-black/8 pt-5"><InquiryForm property={property} onDone={()=>setInquiry(false)}/></div>}</div></aside>
    </div>
    {share&&<ShareModal property={property} onClose={()=>setShare(false)}/>} 
    {viewer!==null&&<div className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4" role="dialog" aria-modal="true"><button onClick={()=>setViewer(null)} className="absolute right-5 top-5 text-white" aria-label="Close gallery"><X/></button>{property.gallery.length>1&&<button onClick={()=>setViewer((viewer-1+property.gallery.length)%property.gallery.length)} className="absolute left-4 text-white" aria-label="Previous image"><ChevronLeft size={42}/></button>}<img src={property.gallery[viewer]} alt={`${property.name} fullscreen`} className="max-h-[85vh] max-w-[85vw] object-contain"/>{property.gallery.length>1&&<button onClick={()=>setViewer((viewer+1)%property.gallery.length)} className="absolute right-4 text-white" aria-label="Next image"><ChevronRight size={42}/></button>}</div>}
  </PageContainer>
}
