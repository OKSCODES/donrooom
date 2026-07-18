import { Star } from 'lucide-react'
export function Rating({ value, count }) { return <div className="flex items-center gap-1.5 text-sm"><Star aria-hidden="true" className="fill-[#3F7D58] text-donroom-success" size={16}/><span className="font-bold">{value}</span>{count != null && <span className="text-muted">({count})</span>}</div> }
