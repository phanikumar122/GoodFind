import { useParams, Link } from 'react-router-dom'
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { formatPrice, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const orders = useProductStore((state) => state.orders)

  const order =
    orders.find((o) => o.orderNumber === orderId || o.id === orderId) || orders[0]

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold">Order Not Found</h2>
        <Link to="/catalog">
          <Button variant="brand" className="mt-4">Back to Catalog</Button>
        </Link>
      </div>
    )
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success'
      case 'shipped':
        return 'brand'
      case 'processing':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/catalog" className="hover:text-foreground">Catalog</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Order #{order.orderNumber}</span>
      </nav>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Order #{order.orderNumber}
            </h1>
            <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">
              {order.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Placed on {formatDate(order.createdAt)} • Tracking #{order.trackingNumber}
          </p>
        </div>

        <div className="flex gap-2">
          <Link to="/contact">
            <Button variant="outline" size="sm" className="text-xs">
              Contact Concierge
            </Button>
          </Link>
          <Link to="/catalog">
            <Button variant="brand" size="sm" className="text-xs">
              Order Again
            </Button>
          </Link>
        </div>
      </div>

      {/* Visual Tracking Progress Timeline */}
      <div className="p-6 sm:p-8 rounded-3xl border bg-card shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">Delivery Milestone Progress</h2>
          </div>
          <span className="text-xs font-semibold text-foreground flex items-center gap-1">
            <ShieldCheck className="h-4 w-4" /> FedEx Priority Tracking Active
          </span>
        </div>

        {/* Timeline Stepper */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-primary/20 space-y-8 my-4 ml-4">
          {order.timeline.map((event, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker icon */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-0 h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  event.completed
                    ? 'bg-primary border-primary text-white shadow-sm'
                    : 'bg-background border-muted-foreground/30 text-muted-foreground'
                }`}
              >
                {event.completed ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Clock className="h-3.5 w-3.5" />
                )}
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className={`text-sm font-bold ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {event.title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    {event.timestamp}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column: Destination & Item Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Destination Card */}
        <div className="md:col-span-1 p-6 rounded-2xl border bg-card shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b pb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Destination Details</span>
          </div>
          <div className="text-xs space-y-1">
            <p className="font-bold text-foreground text-sm">{order.shippingAddress.fullName}</p>
            <p className="text-muted-foreground">{order.shippingAddress.street} {order.shippingAddress.apartment || ''}</p>
            <p className="text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="text-muted-foreground">{order.shippingAddress.country}</p>
            <p className="text-muted-foreground pt-2">Phone: {order.shippingAddress.phone}</p>
            <p className="text-muted-foreground">Payment: {order.paymentMethod}</p>
          </div>
        </div>

        {/* Purchased Items List & Summary */}
        <div className="md:col-span-2 p-6 rounded-2xl border bg-card shadow-soft space-y-4">
          <h3 className="font-bold text-sm text-foreground border-b pb-2">
            Package Contents ({order.items.length} items)
          </h3>
          <div className="divide-y divide-border/60">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-cover border bg-muted"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{item.name}</h4>
                    <p className="text-[11px] text-muted-foreground">
                      Quantity: {item.quantity} {item.variant ? `• ${item.variant}` : ''}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="border-t pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-foreground font-semibold">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Sales Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-foreground border-t pt-2">
              <span>Total Paid</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
