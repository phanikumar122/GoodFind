import * as React from 'react'
import { Tags, Plus, Edit2, Trash2 } from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Category } from '@/types'

export function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useProductStore()

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingCat, setEditingCat] = React.useState<Category | null>(null)
  const [name, setName] = React.useState('')
  const [slug, setSlug] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [image, setImage] = React.useState('')

  const openCreateModal = () => {
    setEditingCat(null)
    setName('')
    setSlug('')
    setDescription('')
    setImage('https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80')
    setIsModalOpen(true)
  }

  const openEditModal = (cat: Category) => {
    setEditingCat(cat)
    setName(cat.name)
    setSlug(cat.slug)
    setDescription(cat.description)
    setImage(cat.image)
    setIsModalOpen(true)
  }

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault()
    const autoSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    if (editingCat) {
      updateCategory(editingCat.id, {
        name,
        slug: autoSlug,
        description,
        image,
      })
    } else {
      addCategory({
        name,
        slug: autoSlug,
        description,
        image: image || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
        productCount: 0,
        featured: true,
      })
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Categories & Collections ({categories.length})
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Organize catalog taxonomy and customer discovery hubs.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="brand" className="gap-2 text-xs shadow-md">
          <Plus className="h-4 w-4" />
          <span>Add New Category</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const liveProductCount = products.filter((p) => p.category === cat.name).length
          return (
            <div
              key={cat.id}
              className="rounded-3xl border bg-card shadow-soft overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-40 w-full overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-extrabold text-base">{cat.name}</h3>
                  <span className="text-xs text-zinc-300 font-mono">/{cat.slug}</span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-xs font-semibold text-foreground">
                    {liveProductCount} Assigned Products
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted rounded-md transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add / Edit Category Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogHeader>
          <DialogTitle>{editingCat ? 'Edit Category' : 'Create New Category'}</DialogTitle>
          <DialogDescription>
            Configure taxonomy classification for your storefront.
          </DialogDescription>
          <DialogClose onClose={() => setIsModalOpen(false)} />
        </DialogHeader>

        <form onSubmit={handleSaveCategory} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Category Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Architectural Objects"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              URL Slug
            </label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. architectural-objects"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Hero Cover Image URL
            </label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Description
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="One-sentence description of the collection..."
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="brand" size="sm">
              {editingCat ? 'Save Changes' : 'Create Category'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
