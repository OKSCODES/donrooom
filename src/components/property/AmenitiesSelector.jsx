import { AMENITIES } from '../../constants/property'
export function AmenitiesSelector({ value = [], onChange, label = 'Amenities' }) {
  const toggle=(item)=>onChange(value.includes(item)?value.filter((v)=>v!==item):[...value,item])
  return <fieldset><legend className="mb-3 text-sm font-bold">{label}</legend><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{AMENITIES.map((item)=><label key={item} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-default bg-white px-3 py-2.5 text-sm"><input type="checkbox" checked={value.includes(item)} onChange={()=>toggle(item)} className="size-4 accent-[#3F7D58]"/><span>{item}</span></label>)}</div></fieldset>
}
