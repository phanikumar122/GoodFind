import * as React from 'react'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProductStore } from '@/store/productStore'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'

export function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProductStore()

  const [search, setSearch] = React.useState('')
  const [selectedCat, setSelectedCat] = React.useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null)

  // Form fields
  const [formName, setFormName] = React.useState('')
  const [formTagline, setFormTagline] = React.useState('')
  const [formDescription, setFormDescription] = React.useState('')
  const [formPrice, setFormPrice] = React.useState('199')
  const [formCategory, setFormCategory] = React.useState('Electronics & Audio')
  const [formBrand, setFormBrand] = React.useState('StudioDesk')
  const [formStock, setFormStock] = React.useState('25')
  const [formImageUrl, setFormImageUrl] = React.useState('')

  const openCreateModal = () => {
    setEditingProduct(null)
    setFormName('')
    setFormTagline('')
    setFormDescription('')
    setFormPrice('199')
    setFormCategory(categories[0]?.name || 'Electronics & Audio')
    setFormBrand('GoodFind Studio')
    setFormStock('30')
    setFormImageUrl('https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80')
    setIsCreateModalOpen(true)
  }

  const openEditModal = (p: Product) => {
    setEditingProduct(p)
    setFormName(p.name)
    setFormTagline(p.tagline)
    setFormDescription(p.description)
    setFormPrice(p.price.toString())
    setFormCategory(p.category)
    setFormBrand(p.brand)
    setFormStock(p.stock.toString())
    setFormImageUrl(p.images[0] || '')
    setIsCreateModalOpen(true)
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const priceNum = parseFloat(formPrice) || 0
    const stockNum = parseInt(formStock, 10) || 0
    const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        tagline: formTagline,
        description: formDescription,
        price: priceNum,
        category: formCategory,
        brand: formBrand,
        stock: stockNum,
        images: [formImageUrl, ...editingProduct.images.slice(1)],
      })
    } else {
      addProduct({
        slug: slug || `prod-${Date.now()}`,
        name: formName,
        tagline: formTagline,
        description: formDescription,
        price: priceNum,
        category: formCategory,
        brand: formBrand,
        stock: stockNum,
        sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        rating: 5.0,
        reviewCount: 1,
        featured: false,
        bestseller: false,
        newArrival: true,
        tags: [formCategory.split(' ')[0], 'Premium'],
        images: [
          formImageUrl || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
        ],
        specifications: {
          'Origin': 'Studio Handcrafted',
          'Material': 'Aerospace Grade Composite',
        },
        shippingInfo: 'Complimentary 2-day express shipping.',
        warrantyInfo: '2-year comprehensive guarantee.',
        returnPolicy: '30-day return policy.',
      })
    }

    setIsCreateModalOpen(false)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id)
      setProductToDelete(null)
    }
  }

  const filteredProducts = products.filter((p) => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Product Catalog Inventory ({products.length})
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add, update, adjust stock, or remove products across all storefront categories.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="brand" className="gap-2 text-xs shadow-md">
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-3.5 bg-muted/40 rounded-2xl border">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, brand, or SKU..."
            className="pl-9 h-10 text-xs bg-background"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full sm:w-60 h-10 px-3 rounded-lg border bg-background text-xs cursor-pointer"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="p-6 rounded-3xl border bg-card shadow-soft overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b text-muted-foreground font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Item</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2">Price</th>
              <th className="py-3 px-2">Stock</th>
              <th className="py-3 px-2">Rating</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
                      }}
                      className="h-11 w-11 rounded-lg object-contain p-1 border bg-zinc-50 dark:bg-zinc-900/40 shrink-0"
                    />
                    <div className="min-w-0 max-w-xs">
                      <p className="font-bold text-foreground truncate">{p.name}</p>
                      <span className="text-[10px] text-muted-foreground font-mono">{p.sku} • {p.brand}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-muted-foreground whitespace-nowrap">
                  {p.category}
                </td>
                <td className="py-3 px-2 font-bold text-foreground whitespace-nowrap">
                  {formatPrice(p.price)}
                </td>
                <td className="py-3 px-2 whitespace-nowrap">
                  <Badge
                    variant={p.stock > 15 ? 'success' : p.stock > 0 ? 'warning' : 'destructive'}
                    className="text-[10px]"
                  >
                    {p.stock > 0 ? `${p.stock} in stock` : 'Out of Stock'}
                  </Badge>
                </td>
                <td className="py-3 px-2 text-muted-foreground whitespace-nowrap">
                  ★ {p.rating} ({p.reviewCount})
                </td>
                <td className="py-3 px-2 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      to={`/product/${p.slug}`}
                      target="_blank"
                      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                      title="View in Storefront"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setProductToDelete(p)}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted rounded-md transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogHeader>
          <DialogTitle>{editingProduct ? 'Edit Product Details' : 'Create New Product'}</DialogTitle>
          <DialogDescription>
            Changes update local application state and immediately reflect in the customer storefront.
          </DialogDescription>
          <DialogClose onClose={() => setIsCreateModalOpen(false)} />
        </DialogHeader>

        <form onSubmit={handleSaveProduct} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Product Title
            </label>
            <Input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Studio Mechanical Keyboard"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Tagline (One-sentence summary)
            </label>
            <Input
              value={formTagline}
              onChange={(e) => setFormTagline(e.target.value)}
              placeholder="e.g. CNC milled brass body with quiet linear switches"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Price (₹ INR)
              </label>
              <Input
                type="number"
                step="0.01"
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Stock Quantity
              </label>
              <Input
                type="number"
                value={formStock}
                onChange={(e) => setFormStock(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Category
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border bg-background text-xs"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Maker / Brand
              </label>
              <Input
                value={formBrand}
                onChange={(e) => setFormBrand(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Product Photography URL (Unsplash or CDN)
            </label>
            <Input
              value={formImageUrl}
              onChange={(e) => setFormImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Full Description
            </label>
            <Textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Describe materials, engineering, tactile qualities..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="brand" size="sm">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <DialogHeader>
          <DialogTitle>Delete Product from Catalog?</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove &quot;{productToDelete?.name}&quot;? This action cannot be undone.
          </DialogDescription>
          <DialogClose onClose={() => setProductToDelete(null)} />
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" size="sm" onClick={() => setProductToDelete(null)}>
            Cancel
          </Button>
          <Button variant="destructive" size="sm" onClick={confirmDelete}>
            Yes, Delete Product
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
