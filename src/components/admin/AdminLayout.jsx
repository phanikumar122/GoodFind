import * as React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Tags, Users, Percent, MessageSquare, Settings, CreditCard, ExternalLink, Menu, X, Sun, Moon, Store, } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { useThemeStore } from '@/store/themeStore';
import { Badge } from '@/components/ui/badge';
export function AdminLayout() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
    const location = useLocation();
    const { settings, orders, products } = useProductStore();
    const { theme, toggleTheme } = useThemeStore();
    // Count pending/processing orders for badge
    const pendingOrdersCount = orders.filter((o) => o.status === 'processing' || o.status === 'pending').length;
    const lowStockCount = products.filter((p) => p.stock < 15).length;
    const navigationItems = [
        { label: 'Overview', path: '/admin', icon: LayoutDashboard },
        { label: 'Products', path: '/admin/products', icon: Package, badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined },
        { label: 'Orders', path: '/admin/orders', icon: ShoppingCart, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined },
        { label: 'Categories', path: '/admin/categories', icon: Tags },
        { label: 'Customers', path: '/admin/customers', icon: Users },
        { label: 'Discounts', path: '/admin/discounts', icon: Percent },
        { label: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
        { label: 'Store Settings', path: '/admin/settings', icon: Settings },
        { label: 'Subscription Plan', path: '/admin/subscription', icon: CreditCard },
    ];
    React.useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [location.pathname]);
    const SidebarContent = (<div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        {/* Brand identity */}
        <div className="px-2">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-muted/40 border">
            <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shadow-sm">
              GF
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{settings.storeName}</p>
              <p className="text-[10px] text-muted-foreground uppercase font-semibold">Merchant Console</p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (<Link key={item.path} to={item.path} className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0"/>
                  <span>{item.label}</span>
                </div>
                {item.badge && (<Badge variant={isActive ? 'secondary' : 'brand'} className="text-[10px] py-0 px-1.5 h-4">
                    {item.badge}
                  </Badge>)}
              </Link>);
        })}
        </nav>
      </div>

      {/* Bottom Switcher Card */}
      <div className="p-3 bg-muted/50 rounded-2xl border space-y-2 mt-6">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">Live Customer Store</span>
          <span className="h-2 w-2 rounded-full bg-foreground animate-pulse"/>
        </div>
        <p className="text-[11px] text-muted-foreground">
          View your storefront as customers see it in production.
        </p>
        <Link to="/" className="flex items-center justify-center gap-1.5 w-full py-2 bg-background hover:bg-muted text-xs font-semibold rounded-xl border text-foreground transition-colors">
          <span>Open Storefront</span>
          <ExternalLink className="h-3.5 w-3.5"/>
        </Link>
      </div>
    </div>);
    return (<div className="min-h-screen flex bg-background text-foreground">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card/60 p-4 sticky top-0 h-screen overflow-y-auto">
        {SidebarContent}
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted" aria-label="Toggle admin sidebar">
              {isMobileSidebarOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
            </button>
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-primary hidden sm:inline"/>
              <span className="font-bold text-sm text-foreground">
                Merchant Operations Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4 text-foreground"/> : <Moon className="h-4 w-4"/>}
            </button>

            <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border bg-muted/40 hover:bg-muted text-foreground transition-colors">
              <span>View Storefront</span>
              <ExternalLink className="h-3 w-3"/>
            </Link>

            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
              AD
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay Drawer */}
        {isMobileSidebarOpen && (<div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)}/>
            <div className="relative z-50 w-64 bg-background p-4 h-full shadow-2xl flex flex-col">
              <div className="flex justify-end mb-2">
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 rounded text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5"/>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">{SidebarContent}</div>
            </div>
          </div>)}

        {/* Admin Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </main>
      </div>
    </div>);
}
