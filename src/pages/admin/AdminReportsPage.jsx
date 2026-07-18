import { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { listAdminCollection } from '../../services/adminService'

const types = ['users', 'bookings', 'properties', 'reviews']

export default function AdminReportsPage() {
  const [data, setData] = useState({})

  useEffect(() => {
    Promise.all(types.map(listAdminCollection))
      .then((rows) => setData(Object.fromEntries(types.map((type, index) => [type, rows[index]]))))
      .catch(() => {})
  }, [])

  const downloadCsv = (type) => {
    const rows = data[type] || []
    const keys = [...new Set(rows.flatMap(Object.keys))].slice(0, 12)
    const text = [
      keys.join(','),
      ...rows.map((row) => keys.map((key) => `"${String(row[key] ?? '').replaceAll('"', '""')}"`).join(',')),
    ].join('\n')
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' }))
    anchor.download = `donroom-${type}.csv`
    anchor.click()
    URL.revokeObjectURL(anchor.href)
  }

  const downloadPdf = (type) => {
    const pdf = new jsPDF()
    pdf.setFontSize(20)
    pdf.text(`DONROOM ${type.toUpperCase()} REPORT`, 14, 20)
    pdf.setFontSize(11)
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 14, 30)
    pdf.text(`Total records: ${(data[type] || []).length}`, 14, 40)
    ;(data[type] || []).slice(0, 30).forEach((row, index) => {
      pdf.text(`${index + 1}. ${row.name || row.fullName || row.bookingNumber || row.propertyName || row.comment || row.id}`, 14, 52 + index * 7)
    })
    pdf.save(`donroom-${type}.pdf`)
  }

  return <>
    <AdminPageHeader title="Reports" description="Generate operational exports for users, bookings, properties and reviews." />
    <div className="grid gap-4 md:grid-cols-2">
      {types.map((type) => <article key={type} className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black capitalize">{type}</h2>
        <p className="mt-2 text-3xl font-black">{data[type]?.length || 0}</p>
        <div className="mt-5 flex gap-2">
          <button className="admin-primary" onClick={() => downloadCsv(type)}>Download CSV</button>
          <button className="admin-secondary" onClick={() => downloadPdf(type)}>Download PDF</button>
        </div>
      </article>)}
    </div>
  </>
}
