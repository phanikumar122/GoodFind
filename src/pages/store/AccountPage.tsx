import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Package,
  MapPin,
  Heart,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { useProductStore } from '@/store/productStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatPrice, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'

export function AccountPage() {
  const {
    currentUser,
    orders,
    updateUserProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
  } = useProductStore()
  const wishlistItems = useWishlistStore((state) => state.items)

  const [activeTab, setActiveTab] = React.useState<'orders' | 'profile' | 'addresses'>('orders')

  // Profile Edit State
  const [name, setName] = React.useState(currentUser.name)
  const [email, setEmail] = React.useState(currentUser.email)
  const [phone, setPhone] = React.useState(currentUser.phone)
  const [profileSaved, setProfileSaved] = React.useState(false)

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = React.useState(false)
  const [newTitle, setNewTitle] = React.useState('')
  const [newStreet, setNewStreet] = React.useState('')
  const [newCity, setNewCity] = React.useState('')
  const [newState, setNewState] = React.useState('')
  const [newPostal, setNewPostal] = React.useState('')
  const [newCountry, setNewCountry] = React.useState('United States')

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserProfile({ name, email, phone })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStreet || !newCity) return

    addAddress({
      title: newTitle || 'Address',
      fullName: name,
      street: newStreet,
      city: newCity,
      state: newState,
      postalCode: newPostal,
      country: newCountry,
      phone,
      isDefault: currentUser.addresses.length === 0,
    })

    setIsAddressModalOpen(false)
    setNewTitle('')
    setNewStreet('')
    setNewCity('')
    setNewState('')
    setNewPostal('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl border bg-card shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-primary/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                {currentUser.name}
              </h1>
              <Badge variant="brand" className="text-[10px]">Verified Member</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{currentUser.email} • {currentUser.phone}</p>
            <p className="text-xs text-muted-foreground">
              Member since {formatDate(currentUser.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Link to="/wishlist">
            <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
              <Heart className="h-4 w-4 text-foreground" />
              <span>Wishlist ({wishlistItems.length})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Package className="h-4 w-4" />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile Details</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'addresses'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <MapPin className="h-4 w-4" />
          <span>Saved Addresses ({currentUser.addresses.length})</span>
        </button>
      </div>

      {/* Tab 1: Orders List */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center border rounded-2xl bg-muted/20">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-base font-bold text-foreground">No orders found</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                You haven&apos;t placed any orders yet.
              </p>
              <Link to="/catalog">
                <Button variant="brand" size="sm">Explore Catalog</Button>
              </Link>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 rounded-2xl border bg-card shadow-soft space-y-4 transition-all hover:border-primary/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-foreground">
                        Order #{ord.orderNumber}
                      </span>
                      <Badge
                        variant={
                          ord.status === 'delivered'
                            ? 'success'
                            : ord.status === 'shipped'
                            ? 'brand'
                            : 'secondary'
                        }
                        className="capitalize text-xs"
                      >
                        {ord.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Placed on {formatDate(ord.createdAt)} • {ord.items.length} items
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-foreground">
                      {formatPrice(ord.total)}
                    </span>
                    <Link to={`/orders/${ord.orderNumber}`}>
                      <Button variant="outline" size="sm" className="text-xs gap-1">
                        <span>Track Order</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Items Thumbnails */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {ord.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-muted/40">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover border bg-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Qty: {item.quantity} • {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Profile Edit */}
      {activeTab === 'profile' && (
        <div className="max-w-xl p-6 sm:p-8 rounded-3xl border bg-card shadow-soft space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-lg font-bold text-foreground">Edit Account Profile</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Update your simulated credentials and concierge contact phone.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {profileSaved && (
                <span className="text-xs text-foreground font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Profile saved successfully!
                </span>
              )}
              <Button type="submit" variant="brand" className="ml-auto">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Address Book</h2>
            <Button
              onClick={() => setIsAddressModalOpen(true)}
              variant="brand"
              size="sm"
              className="gap-1.5 text-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Address</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentUser.addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-6 rounded-2xl border bg-card shadow-soft space-y-3 relative transition-all ${
                  addr.isDefault ? 'border-primary ring-1 ring-primary/30' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{addr.title}</span>
                    {addr.isDefault && (
                      <Badge variant="success" className="text-[10px]">Default</Badge>
                    )}
                  </div>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-muted-foreground hover:text-destructive p-1 rounded"
                    aria-label="Delete address"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p className="font-semibold text-foreground">{addr.fullName}</p>
                  <p>{addr.street} {addr.apartment || ''}</p>
                  <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p>{addr.country}</p>
                  <p className="pt-1">Phone: {addr.phone}</p>
                </div>

                {!addr.isDefault && (
                  <div className="pt-2 border-t">
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Set as Default Address
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Address Dialog */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogHeader>
          <DialogTitle>Add New Destination Address</DialogTitle>
          <DialogDescription>
            Saved addresses can be selected quickly during future checkout flows.
          </DialogDescription>
          <DialogClose onClose={() => setIsAddressModalOpen(false)} />
        </DialogHeader>

        <form onSubmit={handleAddAddress} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Address Label
            </label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Design Studio Loft"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Street Address
            </label>
            <Input
              value={newStreet}
              onChange={(e) => setNewStreet(e.target.value)}
              placeholder="e.g. 100 Broadway"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                City
              </label>
              <Input
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="New York"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                State / Region
              </label>
              <Input
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                placeholder="NY"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Postal Code
              </label>
              <Input
                value={newPostal}
                onChange={(e) => setNewPostal(e.target.value)}
                placeholder="10001"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Country
              </label>
              <Input
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                placeholder="United States"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddressModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="brand" size="sm">
              Save Address
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
