import { Star, Trash2, CheckCircle2 } from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export function AdminReviewsPage() {
  const { reviews, products, deleteReview } = useProductStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          Review Moderation Queue ({reviews.length})
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Moderate community feedback, verify purchases, and ensure brand integrity.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => {
          const product = products.find((p) => p.id === rev.productId)
          return (
            <div
              key={rev.id}
              className="p-6 rounded-3xl border bg-card shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="h-10 w-10 rounded-full object-cover border"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-foreground">{rev.author}</span>
                      <Badge variant="success" className="text-[10px]">Verified Buyer</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Reviewed: {product?.name || rev.productId}
                    </p>
                  </div>
                </div>

                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < rev.rating ? 'fill-current' : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                <h4 className="font-bold text-sm text-foreground">{rev.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                  {rev.comment}
                </p>
                <p className="text-[10px] text-muted-foreground pt-1">
                  Submitted on {formatDate(rev.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Approved
                </span>
                <button
                  onClick={() => deleteReview(rev.id)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-muted rounded-lg transition-colors"
                  title="Remove Review"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
