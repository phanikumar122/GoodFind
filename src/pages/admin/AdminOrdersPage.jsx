import * as React from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle2, ExternalLink, } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { formatPrice, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
export function AdminOrdersPage() {
    const { orders, updateOrderStatus } = useProductStore();
    const [filterStatus, setFilterStatus] = React.useState('all');
    const [search, setSearch] = React.useState('');
    const filteredOrders = orders.filter((o) => {
        if (filterStatus !== 'all' && o.status !== filterStatus)
            return false;
        if (search.trim()) {
            const q = search.toLowerCase();
            return (o.orderNumber.toLowerCase().includes(q) ||
                o.customer.name.toLowerCase().includes(q) ||
                o.customer.email.toLowerCase().includes(q));
        }
        return true;
    });
    return (<div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Order Fulfillment Management ({orders.length})
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor real-time customer purchases, advance tracking stages, and inspect receipts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-3.5 bg-muted/40 rounded-2xl border">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground"/>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search order #, customer, email..." className="pl-9 h-10 text-xs bg-background"/>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="h-10 px-3 rounded-lg border bg-background text-xs cursor-pointer w-full sm:w-44">
            <option value="all">All Statuses ({orders.length})</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-3xl border bg-card shadow-soft overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b text-muted-foreground font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Order #</th>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Purchased Items</th>
              <th className="py-3 px-2">Total Amount</th>
              <th className="py-3 px-2">Payment</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-right">Advance Workflow</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredOrders.map((ord) => (<tr key={ord.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-3.5 px-2">
                  <Link to={`/orders/${ord.orderNumber}`} className="font-mono font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1">
                    #{ord.orderNumber}
                    <ExternalLink className="h-3 w-3 text-muted-foreground"/>
                  </Link>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {formatDate(ord.createdAt)}
                  </p>
                </td>
                <td className="py-3.5 px-2">
                  <p className="font-semibold text-foreground">{ord.customer.name}</p>
                  <p className="text-[11px] text-muted-foreground">{ord.customer.email}</p>
                  <p className="text-[10px] text-muted-foreground">{ord.shippingAddress.city}, {ord.shippingAddress.state}</p>
                </td>
                <td className="py-3.5 px-2">
                  <div className="space-y-1">
                    {ord.items.map((it, i) => (<p key={i} className="text-[11px] text-muted-foreground truncate max-w-xs">
                        {it.quantity}x {it.name}
                      </p>))}
                  </div>
                </td>
                <td className="py-3.5 px-2 font-bold text-foreground whitespace-nowrap">
                  {formatPrice(ord.total)}
                </td>
                <td className="py-3.5 px-2 whitespace-nowrap">
                  <Badge variant="success" className="text-[10px]">
                    Paid ({ord.paymentMethod.split(' ')[0]})
                  </Badge>
                </td>
                <td className="py-3.5 px-2 whitespace-nowrap">
                  <select value={ord.status} onChange={(e) => updateOrderStatus(ord.id, e.target.value)} className="h-8 px-2 rounded-md border bg-background text-xs cursor-pointer font-semibold capitalize">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="py-3.5 px-2 text-right whitespace-nowrap">
                  {ord.status === 'processing' && (<button onClick={() => updateOrderStatus(ord.id, 'shipped')} className="px-2.5 py-1 text-xs font-semibold bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
                      Ship Order
                    </button>)}
                  {ord.status === 'shipped' && (<button onClick={() => updateOrderStatus(ord.id, 'delivered')} className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-500 transition-colors">
                      Mark Delivered
                    </button>)}
                  {ord.status === 'delivered' && (<span className="text-xs text-emerald-600 font-semibold flex items-center justify-end gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5"/> Complete
                    </span>)}
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
}
