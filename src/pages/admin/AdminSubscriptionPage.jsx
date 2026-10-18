import * as React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProductStore } from '@/store/productStore';
export function AdminSubscriptionPage() {
    const products = useProductStore((state) => state.products);
    const [currentPlan, setCurrentPlan] = React.useState('growth');
    const [upgradeSuccess, setUpgradeSuccess] = React.useState(null);
    const handlePlanChange = (plan) => {
        setCurrentPlan(plan);
        setUpgradeSuccess(`Successfully adjusted to ${plan.toUpperCase()} tier (Demo simulation)`);
        setTimeout(() => setUpgradeSuccess(null), 4000);
    };
    // Simulated usage metrics
    const productLimit = currentPlan === 'starter' ? 100 : currentPlan === 'growth' ? 1000 : 10000;
    const productUsagePercent = Math.min(100, (products.length / productLimit) * 100);
    return (<div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          Subscription Plan & Resource Usage
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Simulated SaaS billing tiers, bandwidth quotas, and API limits.
        </p>
      </div>

      {upgradeSuccess && (<div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600"/>
          <span>{upgradeSuccess}</span>
        </div>)}

      {/* Current Plan Overview Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border bg-card shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">
                Active Plan: <span className="capitalize text-primary">{currentPlan} Tier</span>
              </h2>
              <Badge variant="brand">Active Demo</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Renews on March 1, 2026 • Simulated invoice $149.00 / month
            </p>
          </div>
          <span className="text-xs text-muted-foreground font-mono bg-muted px-2.5 py-1 rounded-lg border">
            Payment Method: MasterCare •••• 4242
          </span>
        </div>

        {/* Quota Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-muted/30 border space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>Catalog SKUs</span>
              <span>{products.length} / {productLimit}</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${productUsagePercent}%` }}/>
            </div>
            <p className="text-[10px] text-muted-foreground">{productUsagePercent.toFixed(1)}% quota consumed</p>
          </div>

          <div className="p-4 rounded-2xl bg-muted/30 border space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>Monthly Edge Bandwidth</span>
              <span>42.8 GB / 250 GB</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '17%' }}/>
            </div>
            <p className="text-[10px] text-muted-foreground">Global CDN delivery</p>
          </div>

          <div className="p-4 rounded-2xl bg-muted/30 border space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>API Gateway Calls</span>
              <span>84,210 / 500,000</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '16.8%' }}/>
            </div>
            <p className="text-[10px] text-muted-foreground">Headless GraphQL / REST</p>
          </div>
        </div>
      </div>

      {/* Plan Cards to Test Upgrading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Starter */}
        <div className={`p-6 rounded-3xl border bg-card shadow-soft flex flex-col justify-between space-y-6 ${currentPlan === 'starter' ? 'ring-2 ring-primary border-primary' : ''}`}>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-foreground">Starter</h3>
              {currentPlan === 'starter' && <Badge variant="success">Current</Badge>}
            </div>
            <p className="text-3xl font-extrabold text-foreground">$49<span className="text-xs text-muted-foreground font-normal"> / mo</span></p>
            <p className="text-xs text-muted-foreground">For solo artisans and emerging independent stores.</p>
            <ul className="space-y-2 text-xs text-muted-foreground pt-3 border-t">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500"/> 100 SKUs</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500"/> Standard Analytics</li>
            </ul>
          </div>
          <Button onClick={() => handlePlanChange('starter')} disabled={currentPlan === 'starter'} variant={currentPlan === 'starter' ? 'secondary' : 'outline'} className="w-full text-xs">
            {currentPlan === 'starter' ? 'Active Tier' : 'Downgrade to Starter'}
          </Button>
        </div>

        {/* Growth */}
        <div className={`p-6 rounded-3xl border bg-card shadow-soft flex flex-col justify-between space-y-6 ${currentPlan === 'growth' ? 'ring-2 ring-primary border-primary' : ''}`}>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-foreground">Growth</h3>
              {currentPlan === 'growth' && <Badge variant="brand">Current</Badge>}
            </div>
            <p className="text-3xl font-extrabold text-foreground">$149<span className="text-xs text-muted-foreground font-normal"> / mo</span></p>
            <p className="text-xs text-muted-foreground">For scaling direct-to-consumer lifestyle brands.</p>
            <ul className="space-y-2 text-xs text-foreground pt-3 border-t">
              <li className="flex items-center gap-2 font-medium"><Check className="h-4 w-4 text-primary"/> 1,000 SKUs</li>
              <li className="flex items-center gap-2 font-medium"><Check className="h-4 w-4 text-primary"/> Advanced Recharts Telemetry</li>
              <li className="flex items-center gap-2 font-medium"><Check className="h-4 w-4 text-primary"/> Dynamic Promotional Coupons</li>
            </ul>
          </div>
          <Button onClick={() => handlePlanChange('growth')} disabled={currentPlan === 'growth'} variant={currentPlan === 'growth' ? 'brand' : 'outline'} className="w-full text-xs">
            {currentPlan === 'growth' ? 'Active Tier' : 'Switch to Growth'}
          </Button>
        </div>

        {/* Enterprise */}
        <div className={`p-6 rounded-3xl border bg-card shadow-soft flex flex-col justify-between space-y-6 ${currentPlan === 'enterprise' ? 'ring-2 ring-primary border-primary' : ''}`}>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-foreground">Enterprise</h3>
              {currentPlan === 'enterprise' && <Badge variant="success">Current</Badge>}
            </div>
            <p className="text-3xl font-extrabold text-foreground">$499<span className="text-xs text-muted-foreground font-normal"> / mo</span></p>
            <p className="text-xs text-muted-foreground">For global high-scale commerce enterprises.</p>
            <ul className="space-y-2 text-xs text-muted-foreground pt-3 border-t">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500"/> Unlimited SKUs</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500"/> Multi-region edge deployment</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500"/> 99.99% Uptime SLA</li>
            </ul>
          </div>
          <Button onClick={() => handlePlanChange('enterprise')} disabled={currentPlan === 'enterprise'} variant={currentPlan === 'enterprise' ? 'secondary' : 'brand'} className="w-full text-xs">
            {currentPlan === 'enterprise' ? 'Active Tier' : 'Upgrade to Enterprise'}
          </Button>
        </div>
      </div>
    </div>);
}
