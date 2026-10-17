export interface ProductVariant {
  id: string
  name: string
  options: string[]
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  category: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  stock: number
  sku: string
  images: string[]
  featured?: boolean
  bestseller?: boolean
  newArrival?: boolean
  tags: string[]
  variants?: {
    colors?: string[]
    sizes?: string[]
    configurations?: string[]
  }
  specifications: Record<string, string>
  shippingInfo: string
  warrantyInfo: string
  returnPolicy: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
  featured?: boolean
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedColor?: string
  selectedSize?: string
  selectedConfig?: string
}

export interface Address {
  id: string
  title: string
  fullName: string
  street: string
  apartment?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: 'customer' | 'admin' | 'merchant'
  createdAt: string
  totalOrders: number
  totalSpent: number
  addresses: Address[]
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: string
}

export interface OrderTimeline {
  status: string
  title: string
  description: string
  timestamp: string
  completed: boolean
}

export interface Order {
  id: string
  orderNumber: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
  items: OrderItem[]
  subtotal: number
  discount: number
  couponCode?: string
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'refunded'
  paymentMethod: string
  shippingAddress: Address
  trackingNumber: string
  createdAt: string
  timeline: OrderTimeline[]
}

export interface Review {
  id: string
  productId: string
  author: string
  avatar: string
  rating: number
  title: string
  comment: string
  verified: boolean
  createdAt: string
  helpfulCount: number
}

export interface Coupon {
  id: string
  code: string
  discountPercent?: number
  discountAmount?: number
  minSpend: number
  description: string
  active: boolean
  usageCount: number
}

export interface StoreSettings {
  storeName: string
  tagline: string
  currency: string
  supportEmail: string
  phone: string
  announcement: {
    enabled: boolean
    text: string
    linkText: string
    linkUrl: string
  }
  appearance: {
    accentColor: string
    brandBadge: string
    heroHeadline: string
    heroSubheadline: string
  }
}
