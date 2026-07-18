import { motion } from 'framer-motion'
export function DashboardCard({ icon: Icon, label, value, hint }) {
  return <motion.article whileHover={{ y: -3 }} className="rounded-3xl border border-default bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-muted">{label}</p><p className="mt-2 text-3xl font-black tracking-tight">{value}</p>{hint && <p className="mt-2 text-xs text-subtle">{hint}</p>}</div>{Icon && <span className="rounded-2xl bg-donroom-primary p-3"><Icon size={20}/></span>}</div></motion.article>
}
