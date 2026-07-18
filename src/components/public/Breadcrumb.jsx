import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export function Breadcrumb({ items }) { return <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted"><Link className="hover:text-black" to="/">Home</Link>{items.map((item)=><span className="flex items-center gap-1.5" key={item.label}><ChevronRight size={14}/>{item.to?<Link className="hover:text-black" to={item.to}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</span>)}</nav> }
