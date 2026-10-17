import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  IndianRupee,
  ShoppingCart,
  Users,
  AlertTriangle,
  ArrowRight,
  Eye,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useProductStore } from '@/store/productStore'
import { formatPrice, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function AdminDashboardOverview() {
  const { orders, products, categories, updateOrderStatus } = useProductStore()
  const [dateRange, setDateRange] = React.useState<'7d' | '30d' | '90d'>('30d')

  // Real-time calculated KPI metrics from actual store data
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const lowStockProducts = products.filter((p) => p.stock < 15)

  // Chart data for revenue trend
  const revenueChartData = [
    { date: 'Feb 1', revenue: 4200, orders: 12 },
    { date: 'Feb 5', revenue: 6800, orders: 18 },
    { date: 'Feb 9', revenue: 5400, orders: 14 },
    { date: 'Feb 13', revenue: 8900, orders: 25 },
    { date: 'Feb 17', revenue: 7600, orders: 20 },
    { date: 'Feb 20', revenue: 11200, orders: 32 },
    { date: 'Feb 24', revenue: 9800, orders: 28 },
    { date: 'Feb 28', revenue: 14500, orders: 41 },
  ]

  // Category breakdown chart data
  const categoryChartData = categories.slice(0, 5).map((c) => ({
    name: c.name.split('&')[0].trim(),
    count: products.filter((p) => p.category === c.name).length,
  }))

  const topSellingProducts = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5)

  const recentOrders = [...orders].slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Overview Top Header & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Dashboard Telemetry
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time sales, inventory, and order fulfillment metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-muted/60 p-1 rounded-xl border self-start sm:self-auto text-xs font-semibold">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground ml-1.5" />
          <button
            onClick={() => setDateRange('7d')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              dateRange === '7d' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setDateRange('30d')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              dateRange === '30d' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setDateRange('90d')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              dateRange === '90d' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            90 Days
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl border bg-card shadow-soft space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Gross Revenue</span>
            <IndianRupee className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {formatPrice(totalRevenue)}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+18.4% vs last period</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border bg-card shadow-soft space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Fulfilled Orders</span>
            <ShoppingCart className="h-4 w-4 text-brand-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {totalOrders}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>100% on-time dispatch</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border bg-card shadow-soft space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Average Order Value</span>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {formatPrice(avgOrderValue)}
          </p>
          <p className="text-xs text-muted-foreground">Target benchmark: $200.00</p>
        </div>

        <div className="p-6 rounded-2xl border bg-card shadow-soft space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Inventory Alert</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {lowStockProducts.length}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
            SKUs below safe threshold (&lt;15)
          </p>
        </div>
      </div>

      {/* Interactive Charts: Revenue Trend & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl border bg-card shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-base font-bold text-foreground">Revenue & Sales Velocity</h2>
              <p className="text-xs text-muted-foreground">Cumulative gross sales trajectory (₹ INR)</p>
            </div>
            <Badge variant="brand" className="text-xs">Live Analytics</Badge>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  formatter={(val: any) => [`$${val}`, 'Gross Revenue']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-4 p-6 rounded-3xl border bg-card shadow-soft space-y-4">
          <div className="border-b pb-3">
            <h2 className="text-base font-bold text-foreground">SKUs by Category</h2>
            <p className="text-xs text-muted-foreground">Product catalog distribution</p>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [val, 'Active Products']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lower Section: Recent Orders & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Orders with Simulated Status Advance */}
        <div className="lg:col-span-8 p-6 rounded-3xl border bg-card shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-base font-bold text-foreground">Recent Customer Orders</h2>
              <p className="text-xs text-muted-foreground">Manage and advance simulated order status</p>
            </div>
            <Link to="/admin/orders">
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">
                <span>View All ({orders.length})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-muted-foreground uppercase font-bold">
                  <th className="py-2.5">Order</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Total</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-mono font-bold text-foreground">
                      #{ord.orderNumber}
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-foreground">{ord.customer.name}</p>
                      <p className="text-[11px] text-muted-foreground">{ord.customer.email}</p>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {formatDate(ord.createdAt)}
                    </td>
                    <td className="py-3 font-bold text-foreground">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          ord.status === 'delivered'
                            ? 'success'
                            : ord.status === 'shipped'
                            ? 'brand'
                            : 'secondary'
                        }
                        className="capitalize text-[10px]"
                      >
                        {ord.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      {ord.status === 'processing' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'shipped')}
                          className="px-2 py-1 text-[11px] font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md transition-colors"
                        >
                          Mark Shipped
                        </button>
                      )}
                      {ord.status === 'shipped' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'delivered')}
                          className="px-2 py-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-md transition-colors"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {ord.status === 'delivered' && (
                        <span className="text-[11px] text-muted-foreground flex items-center justify-end gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top-Selling Products */}
        <div className="lg:col-span-4 p-6 rounded-3xl border bg-card shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-bold text-foreground">Top Performing Items</h2>
            <Link to="/admin/products" className="text-xs text-primary hover:underline">
              Inventory
            </Link>
          </div>

          <div className="space-y-3">
            {topSellingProducts.map((p, index) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/30 transition-colors">
                <span className="text-xs font-mono font-bold text-muted-foreground w-4">
                  0{index + 1}
                </span>
                <img
                  src={p.images[0]}
                  alt={p.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
                  }}
                  className="h-10 w-10 rounded-lg object-contain p-1 border bg-zinc-50 dark:bg-zinc-900/40 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.category.split('&')[0]}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-foreground">{formatPrice(p.price)}</span>
                  <p className="text-[10px] text-muted-foreground">{p.stock} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
