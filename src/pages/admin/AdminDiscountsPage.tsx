import * as React from 'react'
import { Percent, Plus, Tag, Trash2, CheckCircle2 } from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'

export function AdminDiscountsPage() {
  const { coupons, addCoupon, toggleCouponActive, deleteCoupon } = useProductStore()

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [discountType, setDiscountType] = React.useState<'percent' | 'fixed'>('percent')
  const [value, setValue] = React.useState('15')
  const [minSpend, setMinSpend] = React.useState('50')
  const [description, setDescription] = React.useState('')

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    const valNum = parseFloat(value) || 0
    const minNum = parseFloat(minSpend) || 0

    addCoupon({
      code: code.trim().toUpperCase(),
      discountPercent: discountType === 'percent' ? valNum : undefined,
      discountAmount: discountType === 'fixed' ? valNum : undefined,
      minSpend: minNum,
      description: description || `${code} promotional coupon`,
      active: true,
    })

    setIsModalOpen(false)
    setCode('')
    setDescription('')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Promotional Coupons & Discounts ({coupons.length})
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create promotional discount codes verified live during checkout.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          variant="brand"
          className="gap-2 text-xs shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Create Coupon Code</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`p-6 rounded-3xl border bg-card shadow-soft space-y-4 flex flex-col justify-between transition-all ${
              c.active ? 'border-primary/40' : 'opacity-60'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-extrabold text-lg text-foreground px-2.5 py-1 rounded-lg bg-muted border">
                  {c.code}
                </span>
                <Badge variant={c.active ? 'success' : 'secondary'}>
                  {c.active ? 'Active' : 'Disabled'}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground pt-1">{c.description}</p>
            </div>

            <div className="space-y-2 pt-3 border-t text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Value:</span>
                <span className="font-bold text-foreground">
                  {c.discountPercent ? `${c.discountPercent}% Off` : `$${c.discountAmount} Off`}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Min Order Spend:</span>
                <span className="font-medium text-foreground">{formatPrice(c.minSpend)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Times Redeemed:</span>
                <span className="font-medium text-foreground">{c.usageCount} orders</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <button
                onClick={() => toggleCouponActive(c.id)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {c.active ? 'Disable Code' : 'Enable Code'}
              </button>
              <button
                onClick={() => deleteCoupon(c.id)}
                className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                aria-label="Delete coupon"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogHeader>
          <DialogTitle>Create Promotional Coupon</DialogTitle>
          <DialogDescription>
            Valid coupon codes apply instant deductions to cart subtotals.
          </DialogDescription>
          <DialogClose onClose={() => setIsModalOpen(false)} />
        </DialogHeader>

        <form onSubmit={handleCreateCoupon} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Coupon Code
            </label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. FLASH20"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full h-10 px-3 rounded-lg border bg-background text-xs"
              >
                <option value="percent">Percentage Off (%)</option>
                <option value="fixed">Fixed Dollar Off ($)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Discount Amount
              </label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="20"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Minimum Purchase Threshold (₹ INR)
            </label>
            <Input
              type="number"
              value={minSpend}
              onChange={(e) => setMinSpend(e.target.value)}
              placeholder="50"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Public Description
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 20% off all seasonal essentials over $50"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="brand" size="sm">
              Create Coupon
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
