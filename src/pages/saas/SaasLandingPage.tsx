import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Rocket,
  Zap,
  TrendingUp,
  Globe,
  Layers,
  ArrowRight,
  Check,
  Sparkles,
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AccordionItem } from '@/components/ui/accordion'

export function SaasLandingPage() {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annual'>('annual')

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* 1. SaaS Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 border-b bg-gradient-to-b from-brand-50/50 via-background to-background dark:from-brand-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border bg-background/80 backdrop-blur-md text-xs font-semibold text-foreground shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 animate-pulse" />
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            <span>Announcing GoodFind OS 2.0 • Headless Commerce Platform</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
              The Commerce OS for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Next-Generation Brands
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Launch luxury online storefronts, automate global multi-currency fulfillment, and scale your brand with an all-in-one headless commerce platform.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link to="/onboarding">
              <Button variant="brand" size="lg" className="rounded-xl px-8 shadow-lg gap-2 text-base">
                <Rocket className="h-5 w-5" />
                <span>Launch Your Store Free</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="lg" className="rounded-xl px-7 text-base">
                <span>Explore Live Admin Demo</span>
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            No credit card required • Instant sandbox setup in under 60 seconds
          </p>

          {/* Interactive SaaS Platform Mockup Window */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto rounded-3xl border bg-card/60 backdrop-blur-xl shadow-2xl overflow-hidden text-left">
            <div className="flex items-center justify-between px-6 py-3.5 border-b bg-muted/40">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono text-muted-foreground">
                  admin.goodfind.io/analytics
                </span>
              </div>
              <Badge variant="brand" className="text-[10px]">Real-time Telemetry</Badge>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-background/50">
              <div className="p-5 rounded-2xl border bg-card shadow-soft space-y-2">
                <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                  <span>Gross Monthly Volume</span>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">$184,920</p>
                <p className="text-xs text-emerald-600 font-semibold">+24.8% vs previous month</p>
              </div>

              <div className="p-5 rounded-2xl border bg-card shadow-soft space-y-2">
                <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                  <span>Average Order Value</span>
                  <DollarSign className="h-4 w-4 text-brand-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">$248.50</p>
                <p className="text-xs text-emerald-600 font-semibold">+8.4% with AI recommendations</p>
              </div>

              <div className="p-5 rounded-2xl border bg-card shadow-soft space-y-2">
                <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                  <span>Checkout Conversion</span>
                  <Zap className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">4.82%</p>
                <p className="text-xs text-muted-foreground">3.2x industry baseline</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Merchant Value Props & Key Architectural Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Engineered for Velocity</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Why Visionary Merchants Choose GoodFind
          </h2>
          <p className="text-sm text-muted-foreground">
            Legacy commerce platforms are slow, fragmented, and burdened by hidden transaction fees. GoodFind unifies your entire business into a lightning-fast stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border bg-card shadow-soft space-y-4 hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Sub-100ms Page Loads</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built on React, Vite, and edge hydration. Your customers never wait for spinners or sluggish database calls, directly increasing conversion rates by up to 35%.
            </p>
          </div>

          <div className="p-8 rounded-3xl border bg-card shadow-soft space-y-4 hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Multi-Category Headless Engine</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sell apparel with custom sizing matrixes, physical electronics with serial tracking, artisan coffee subscriptions, or downloadable SaaS digital products effortlessly.
            </p>
          </div>

          <div className="p-8 rounded-3xl border bg-card shadow-soft space-y-4 hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Zero Vendor Lock-In</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full control over your customer relationships, clean tokenized design themes, exportable JSON datasets, and open API connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pricing Matrix */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="text-xs">Transparent Investment</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Plans for Brands at Any Scale
          </h2>
          <p className="text-sm text-muted-foreground">
            Pick the plan tailored to your volume. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-lg border bg-muted/60 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Billed Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>Billed Annually</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded-md">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl border bg-card shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">Starter Tier</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Ideal for solo creators and emerging independent studios.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">
                  ${billingCycle === 'annual' ? '39' : '49'}
                </span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Up to 100 Products Catalog</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Standard Storefront Themes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>0% Additional Transaction Surcharges</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Basic Analytics & Order Tracking</span>
                </li>
              </ul>
            </div>

            <Link to="/onboarding" className="block w-full">
              <Button variant="outline" className="w-full">
                Start with Starter
              </Button>
            </Link>
          </div>

          {/* Growth Plan (Highlighted) */}
          <div className="p-8 rounded-3xl border-2 border-brand-500 bg-card shadow-xl relative flex flex-col justify-between space-y-6">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge variant="brand" className="shadow-md">
                Most Popular for Scaling Brands
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">Growth Tier</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Built for established high-volume DTC labels.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">
                  ${billingCycle === 'annual' ? '119' : '149'}
                </span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-foreground pt-4 border-t">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>Unlimited Products & Collections</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>Custom Domain & Brand CSS Overrides</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>Advanced Recharts Sales Telemetry</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>Automated Dynamic Discounts & Coupons</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>Priority 24/7 Concierge Support</span>
                </li>
              </ul>
            </div>

            <Link to="/onboarding" className="block w-full">
              <Button variant="brand" className="w-full shadow-lg">
                Start 14-Day Free Trial
              </Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="p-8 rounded-3xl border bg-card shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">Enterprise Tier</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Bespoke infrastructure for global luxury conglomerates.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">
                  ${billingCycle === 'annual' ? '399' : '499'}
                </span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Dedicated Multi-Region Edge Hosting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Multi-Warehouse Fulfillment Sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>99.99% Uptime SLA Guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Dedicated Technical Account Manager</span>
                </li>
              </ul>
            </div>

            <Link to="/contact" className="block w-full">
              <Button variant="outline" className="w-full">
                Contact Enterprise Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Feature Comparison Matrix */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground">Feature Matrix by Plan</h3>
          <p className="text-xs text-muted-foreground mt-1">Detailed tier breakdown</p>
        </div>

        <div className="rounded-2xl border overflow-x-auto bg-card shadow-soft">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b bg-muted/40 font-bold text-foreground">
                <th className="p-4">Capability</th>
                <th className="p-4 text-center">Starter</th>
                <th className="p-4 text-center text-primary">Growth</th>
                <th className="p-4 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-4 font-semibold text-foreground">Product Inventory Limits</td>
                <td className="p-4 text-center text-muted-foreground">100 SKUs</td>
                <td className="p-4 text-center font-bold text-primary">Unlimited</td>
                <td className="p-4 text-center text-muted-foreground">Unlimited + Multi-tenant</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-foreground">Custom Domain & SSL</td>
                <td className="p-4 text-center text-muted-foreground">Included</td>
                <td className="p-4 text-center font-bold text-primary">Included</td>
                <td className="p-4 text-center text-muted-foreground">Wildcard Custom SSL</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-foreground">Analytics & Conversion Cohorts</td>
                <td className="p-4 text-center text-muted-foreground">Standard</td>
                <td className="p-4 text-center font-bold text-primary">Advanced Recharts</td>
                <td className="p-4 text-center text-muted-foreground">Custom BigQuery Export</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-foreground">Review Moderation Console</td>
                <td className="p-4 text-center text-muted-foreground">Manual</td>
                <td className="p-4 text-center font-bold text-primary">Automated AI Filter</td>
                <td className="p-4 text-center text-muted-foreground">Dedicated Moderator Pool</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-foreground">Support Response Guarantee</td>
                <td className="p-4 text-center text-muted-foreground">24 hours</td>
                <td className="p-4 text-center font-bold text-primary">&lt; 2 hours</td>
                <td className="p-4 text-center text-muted-foreground">15 min SLA Slack Channel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground">Merchant Questions</h3>
        </div>

        <div className="p-6 rounded-3xl border bg-card shadow-soft space-y-1">
          <AccordionItem title="Can I migrate my existing Shopify or WooCommerce catalog?" defaultOpen={true}>
            Yes. GoodFind provides turnkey JSON and CSV catalog importers that automatically map product variants, images, categories, and inventory counts in a single click.
          </AccordionItem>
          <AccordionItem title="How does GoodFind handle payments?">
            GoodFind integrates seamlessly with Stripe Connect, Apple Pay, PayPal, and Klarna. Funds settle directly into your merchant bank account without intermediate holding delays.
          </AccordionItem>
          <AccordionItem title="Can I customize the storefront theme?">
            Every GoodFind merchant receives full visual token controls: accent colors, typographic pairings, hero banners, and announcement texts, all configurable directly from the admin console with live preview.
          </AccordionItem>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 sm:p-16 border bg-gradient-to-r from-violet-950 via-zinc-950 to-indigo-950 text-white shadow-2xl text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Build Your Commerce Empire?
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of independent brands scaling their revenue with GoodFind. Run our interactive 7-step merchant wizard right now.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/onboarding">
              <Button variant="brand" size="lg" className="rounded-xl px-8 shadow-lg text-base">
                <span>Start Free Onboarding</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="lg" className="rounded-xl px-7 text-white border-zinc-700 hover:bg-zinc-800 text-base">
                View Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
