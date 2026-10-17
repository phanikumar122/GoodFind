import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  Product,
  Category,
  Order,
  Review,
  Coupon,
  StoreSettings,
  Customer,
  Address,
} from '@/types'
import {
  mockProducts,
  mockCategories,
  mockOrders,
  mockReviews,
  mockCoupons,
  initialStoreSettings,
  mockCustomer,
} from '@/data/mockData'

interface ProductStoreState {
  products: Product[]
  categories: Category[]
  orders: Order[]
  reviews: Review[]
  coupons: Coupon[]
  settings: StoreSettings
  currentUser: Customer
  activeRole: 'customer' | 'admin' | 'merchant'

  // Role switching
  setActiveRole: (role: 'customer' | 'admin' | 'merchant') => void

  // Product CRUD
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void

  // Category CRUD
  addCategory: (category: Omit<Category, 'id'>) => Category
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void

  // Order management
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingNumber' | 'timeline'>) => Order
  updateOrderStatus: (orderId: string, status: Order['status']) => void

  // Review management
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'helpfulCount'>) => void
  deleteReview: (reviewId: string) => void

  // Coupon CRUD
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void
  toggleCouponActive: (couponId: string) => void
  deleteCoupon: (couponId: string) => void

  // Settings
  updateSettings: (updates: Partial<StoreSettings>) => void
  updateAppearance: (appearanceUpdates: Partial<StoreSettings['appearance']>) => void
  updateAnnouncement: (announcementUpdates: Partial<StoreSettings['announcement']>) => void

  // User Profile
  updateUserProfile: (updates: Partial<Customer>) => void
  addAddress: (address: Omit<Address, 'id'>) => void
  deleteAddress: (id: string) => void
  setDefaultAddress: (id: string) => void

  // Reset to initial demo data
  resetToDefaults: () => void
}

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      categories: mockCategories,
      orders: mockOrders,
      reviews: mockReviews,
      coupons: mockCoupons,
      settings: initialStoreSettings,
      currentUser: mockCustomer,
      activeRole: 'customer',

      setActiveRole: (role) => set({ activeRole: role }),

      addProduct: (newProductData) => {
        const id = `prod-${Date.now()}`
        const newProduct: Product = {
          ...newProductData,
          id,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          products: [newProduct, ...state.products],
        }))
        return newProduct
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }))
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
      },

      addCategory: (newCatData) => {
        const id = `cat-${Date.now()}`
        const newCategory: Category = {
          ...newCatData,
          id,
        }
        set((state) => ({
          categories: [...state.categories, newCategory],
        }))
        return newCategory
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }))
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }))
      },

      createOrder: (orderData) => {
        const randomNum = Math.floor(10000 + Math.random() * 90000)
        const orderId = `ord-${Date.now()}`
        const orderNumber = `GF-${randomNum}`
        const now = new Date()

        const newOrder: Order = {
          ...orderData,
          id: orderId,
          orderNumber,
          createdAt: now.toISOString(),
          trackingNumber: `GFTRK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
          timeline: [
            {
              status: 'placed',
              title: 'Order Placed',
              description: 'Payment authorized and receipt dispatched to email.',
              timestamp: now.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              }),
              completed: true,
            },
            {
              status: 'processing',
              title: 'Preparing for Shipment',
              description: 'Items being picked and packed at the distribution hub.',
              timestamp: 'Pending',
              completed: false,
            },
          ],
        }

        // Deduct inventory
        const currentProducts = get().products
        const updatedProducts = currentProducts.map((prod) => {
          const orderedItem = orderData.items.find(
            (item) => item.productId === prod.id
          )
          if (orderedItem) {
            return {
              ...prod,
              stock: Math.max(0, prod.stock - orderedItem.quantity),
            }
          }
          return prod
        })

        // Increment coupon usage count if used
        let updatedCoupons = get().coupons
        if (orderData.couponCode) {
          updatedCoupons = updatedCoupons.map((c) =>
            c.code.toUpperCase() === orderData.couponCode?.toUpperCase()
              ? { ...c, usageCount: c.usageCount + 1 }
              : c
          )
        }

        set((state) => ({
          orders: [newOrder, ...state.orders],
          products: updatedProducts,
          coupons: updatedCoupons,
          currentUser: {
            ...state.currentUser,
            totalOrders: state.currentUser.totalOrders + 1,
            totalSpent: state.currentUser.totalSpent + newOrder.total,
          },
        }))

        return newOrder
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id !== orderId) return o

            const nowStr = new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })

            const updatedTimeline = [...o.timeline]
            const existingIdx = updatedTimeline.findIndex((t) => t.status === status)
            if (existingIdx > -1) {
              updatedTimeline[existingIdx].completed = true
              updatedTimeline[existingIdx].timestamp = nowStr
            } else {
              updatedTimeline.push({
                status,
                title: `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
                description: `Order milestone reached on ${nowStr}`,
                timestamp: nowStr,
                completed: true,
              })
            }

            return {
              ...o,
              status,
              timeline: updatedTimeline,
            }
          }),
        }))
      },

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `rev-${Date.now()}`,
          createdAt: new Date().toISOString(),
          helpfulCount: 0,
        }

        // Recalculate average rating for product
        const allProductReviews = [
          newReview,
          ...get().reviews.filter((r) => r.productId === reviewData.productId),
        ]
        const avg =
          allProductReviews.reduce((sum, r) => sum + r.rating, 0) /
          allProductReviews.length

        set((state) => ({
          reviews: [newReview, ...state.reviews],
          products: state.products.map((p) =>
            p.id === reviewData.productId
              ? {
                  ...p,
                  rating: Math.round(avg * 10) / 10,
                  reviewCount: p.reviewCount + 1,
                }
              : p
          ),
        }))
      },

      deleteReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== reviewId),
        }))
      },

      addCoupon: (couponData) => {
        const newCoupon: Coupon = {
          ...couponData,
          id: `c-${Date.now()}`,
          usageCount: 0,
        }
        set((state) => ({
          coupons: [newCoupon, ...state.coupons],
        }))
      },

      toggleCouponActive: (couponId) => {
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === couponId ? { ...c, active: !c.active } : c
          ),
        }))
      },

      deleteCoupon: (couponId) => {
        set((state) => ({
          coupons: state.coupons.filter((c) => c.id !== couponId),
        }))
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }))
      },

      updateAppearance: (appearanceUpdates) => {
        set((state) => ({
          settings: {
            ...state.settings,
            appearance: {
              ...state.settings.appearance,
              ...appearanceUpdates,
            },
          },
        }))
      },

      updateAnnouncement: (announcementUpdates) => {
        set((state) => ({
          settings: {
            ...state.settings,
            announcement: {
              ...state.settings.announcement,
              ...announcementUpdates,
            },
          },
        }))
      },

      updateUserProfile: (updates) => {
        set((state) => ({
          currentUser: { ...state.currentUser, ...updates },
        }))
      },

      addAddress: (addr) => {
        const newAddress: Address = {
          ...addr,
          id: `addr-${Date.now()}`,
        }
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            addresses: [...state.currentUser.addresses, newAddress],
          },
        }))
      },

      deleteAddress: (id) => {
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            addresses: state.currentUser.addresses.filter((a) => a.id !== id),
          },
        }))
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            addresses: state.currentUser.addresses.map((a) => ({
              ...a,
              isDefault: a.id === id,
            })),
          },
        }))
      },

      resetToDefaults: () => {
        set({
          products: mockProducts,
          categories: mockCategories,
          orders: mockOrders,
          reviews: mockReviews,
          coupons: mockCoupons,
          settings: initialStoreSettings,
          currentUser: mockCustomer,
        })
      },
    }),
    {
      name: 'goodfind-commerce-storage',
    }
  )
)
