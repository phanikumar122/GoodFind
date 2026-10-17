import * as React from 'react'
import { Users, Search, Mail, Phone, MapPin } from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { formatPrice, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export function AdminCustomersPage() {
  const { currentUser, orders } = useProductStore()
  const [search, setSearch] = React.useState('')

  // Build customer list including simulated members
  const customerList = [
    currentUser,
    {
      id: 'cust-002',
      name: 'David Chen',
      email: 'david.chen@ventures.co',
      phone: '+1 (555) 432-8765',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      role: 'customer' as const,
      createdAt: '2025-11-04T12:00:00Z',
      totalOrders: 3,
      totalSpent: 940.00,
      addresses: [
        {
          id: 'addr-3',
          title: 'Office',
          fullName: 'David Chen',
          street: '100 Montgomery St',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94104',
          country: 'United States',
          phone: '+1 (555) 432-8765',
          isDefault: true,
        },
      ],
    },
    {
      id: 'cust-003',
      name: 'Marcus Vance',
      email: 'marcus.v@acoustics.de',
      phone: '+49 30 901820',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      role: 'customer' as const,
      createdAt: '2026-01-18T09:30:00Z',
      totalOrders: 2,
      totalSpent: 698.00,
      addresses: [],
    },
  ]

  const filteredCustomers = customerList.filter((c) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Customer Directory ({customerList.length})
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Profiles, purchasing history, lifetime value, and delivery records.
          </p>
        </div>
      </div>

      <div className="p-3.5 bg-muted/40 rounded-2xl border max-w-sm">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="pl-9 h-10 text-xs bg-background"
          />
        </div>
      </div>

      <div className="p-6 rounded-3xl border bg-card shadow-soft overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b text-muted-foreground font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Contact</th>
              <th className="py-3 px-2">Member Since</th>
              <th className="py-3 px-2">Orders</th>
              <th className="py-3 px-2">Lifetime Spend</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-3.5 px-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={cust.avatar}
                      alt={cust.name}
                      className="h-10 w-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-bold text-foreground">{cust.name}</p>
                      <span className="text-[10px] text-muted-foreground font-mono">ID: {cust.id}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-2">
                  <p className="text-muted-foreground">{cust.email}</p>
                  <p className="text-[11px] text-muted-foreground">{cust.phone}</p>
                </td>
                <td className="py-3.5 px-2 text-muted-foreground">
                  {formatDate(cust.createdAt)}
                </td>
                <td className="py-3.5 px-2 font-semibold text-foreground">
                  {cust.totalOrders} completed
                </td>
                <td className="py-3.5 px-2 font-bold text-foreground">
                  {formatPrice(cust.totalSpent)}
                </td>
                <td className="py-3.5 px-2">
                  <Badge variant="success" className="text-[10px]">Active VIP</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
