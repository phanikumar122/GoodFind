import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, CheckCircle2, ArrowRight, ShoppingBag, Store, Check, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useProductStore } from '@/store/productStore';
export function MerchantOnboardingPage() {
    const navigate = useNavigate();
    const { updateSettings, updateAppearance } = useProductStore();
    // 7-step onboarding state
    const [currentStep, setCurrentStep] = React.useState(1);
    // Step 2: Brand details
    const [storeName, setStoreName] = React.useState('Aura Design Studio');
    const [storeTagline, setStoreTagline] = React.useState('Modern essentials for intentional spaces');
    const [currency, setCurrency] = React.useState('INR');
    // Step 3: Primary Category
    const [selectedCategory, setSelectedCategory] = React.useState('Electronics & Audio');
    // Step 4: Theme
    const [selectedTheme, setSelectedTheme] = React.useState('minimal');
    // Step 5: Starter product catalog
    const [selectedProductsCount, setSelectedProductsCount] = React.useState(12);
    const handleNext = () => {
        if (currentStep < 7) {
            setCurrentStep((s) => s + 1);
            window.scrollTo(0, 0);
        }
    };
    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep((s) => s - 1);
            window.scrollTo(0, 0);
        }
    };
    const handleFinishSetup = () => {
        // Commit to productStore settings
        updateSettings({
            storeName,
            tagline: storeTagline,
            currency,
        });
        updateAppearance({
            heroHeadline: storeTagline,
            brandBadge: `${selectedCategory} Merchant`,
        });
        navigate('/admin');
    };
    return (<div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Onboarding Header */}
        <div className="flex items-center justify-between border-b pb-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="h-5 w-5"/>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-foreground">
              GoodFind Setup
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">
              Step {currentStep} of 7
            </span>
            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${(currentStep / 7) * 100}%` }}/>
            </div>
          </div>
        </div>

        {/* Step 1: Welcome Screen */}
        {currentStep === 1 && (<div className="p-8 sm:p-12 rounded-3xl border bg-card shadow-soft text-center space-y-6">
            <div className="h-16 w-16 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center mx-auto">
              <Rocket className="h-8 w-8"/>
            </div>
            <div className="space-y-2">
              <Badge variant="brand">Interactive Merchant Wizard</Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Welcome to GoodFind Commerce
              </h1>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                In less than 2 minutes, configure your brand identity, product taxonomy, and visual theme to launch a live demo storefront.
              </p>
            </div>
            <div className="pt-4">
              <Button onClick={handleNext} variant="brand" size="lg" className="rounded-xl px-8 shadow-md gap-2">
                <span>Start Store Setup</span>
                <ArrowRight className="h-4 w-4"/>
              </Button>
            </div>
          </div>)}

        {/* Step 2: Store Name & Brand Identity */}
        {currentStep === 2 && (<div className="p-8 sm:p-10 rounded-3xl border bg-card shadow-soft space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-foreground">Brand & Store Identity</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Establish the name and primary motto your customers will see.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Storefront Name
                </label>
                <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="e.g. Lumina Atelier" required/>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Brand Tagline & Mission
                </label>
                <Input value={storeTagline} onChange={(e) => setStoreTagline(e.target.value)} placeholder="e.g. Precision hardware for mindful creators" required/>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Default Store Currency
                </label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full h-10 px-3 rounded-lg border bg-background text-sm">
                  <option value="INR">INR (₹) Indian Rupee</option>
                  <option value="USD">USD ($) United States Dollar</option>
                  <option value="EUR">EUR (€) Euro</option>
                  <option value="GBP">GBP (£) British Pound</option>
                  <option value="JPY">JPY (¥) Japanese Yen</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button onClick={handlePrev} variant="ghost" size="sm">Back</Button>
              <Button onClick={handleNext} variant="brand">Continue</Button>
            </div>
          </div>)}

        {/* Step 3: Store Category Selection */}
        {currentStep === 3 && (<div className="p-8 sm:p-10 rounded-3xl border bg-card shadow-soft space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-foreground">What will you sell?</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Select your primary merchant industry to tailor storefront recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Electronics & Audio', desc: 'Peripherals, audio monitors, cables' },
                { name: 'Fashion & Apparel', desc: 'Minimalist knitwear, denim, boots' },
                { name: 'Home & Ergonomics', desc: 'Standing desks, task chairs, lighting' },
                { name: 'Beauty & Wellness', desc: 'Botanical serums, fragrances, rituals' },
                { name: 'Specialty Coffee & Pantry', desc: 'Single-origin beans, kettles' },
                { name: 'Digital Goods & SaaS', desc: 'UI kits, templates, dev blueprints' },
            ].map((cat) => (<div key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedCategory === cat.name
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/40 shadow-sm'
                    : 'hover:bg-muted/40'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-foreground">{cat.name}</span>
                    {selectedCategory === cat.name && (<CheckCircle2 className="h-4 w-4 text-primary"/>)}
                  </div>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </div>))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button onClick={handlePrev} variant="ghost" size="sm">Back</Button>
              <Button onClick={handleNext} variant="brand">Continue</Button>
            </div>
          </div>)}

        {/* Step 4: Theme Selection */}
        {currentStep === 4 && (<div className="p-8 sm:p-10 rounded-3xl border bg-card shadow-soft space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-foreground">Select Storefront Aesthetic</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose a visual theme designed by high-end design systems architects.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'minimal', name: 'Clean Nordic Minimal', desc: 'Neutral whites, crisp borders, violet brand accents' },
                { id: 'luxury', name: 'Monochrome Luxury Slate', desc: 'Deep obsidian blacks, high contrast, gold tones' },
                { id: 'editorial', name: 'Swiss Editorial Typographic', desc: 'Serif headings, high density, structured columns' },
                { id: 'vibrant', name: 'Vibrant Neo-Studio', desc: 'Warm sandstone, playful badges, modern geometry' },
            ].map((themeItem) => (<div key={themeItem.id} onClick={() => setSelectedTheme(themeItem.id)} className={`p-5 rounded-2xl border cursor-pointer transition-all ${selectedTheme === themeItem.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/40 shadow-sm'
                    : 'hover:bg-muted/40'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-foreground">{themeItem.name}</span>
                    {selectedTheme === themeItem.id && (<Check className="h-4 w-4 text-primary"/>)}
                  </div>
                  <p className="text-xs text-muted-foreground">{themeItem.desc}</p>
                </div>))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button onClick={handlePrev} variant="ghost" size="sm">Back</Button>
              <Button onClick={handleNext} variant="brand">Continue</Button>
            </div>
          </div>)}

        {/* Step 5: Add Sample Products */}
        {currentStep === 5 && (<div className="p-8 sm:p-10 rounded-3xl border bg-card shadow-soft space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-foreground">Seed Starter Catalog</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                We will automatically populate your store with curated mock data and product photography.
              </p>
            </div>

            <div className="p-4 rounded-2xl border bg-muted/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">
                  Seeding {selectedProductsCount} Curated Products
                </span>
                <Badge variant="brand">Pre-configured</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Includes product variants (colors, sizes), inventory counters, studio photography, customer reviews, and pricing metadata.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-background border">
                  <p className="font-bold text-foreground">30+ SKUs</p>
                  <p className="text-[10px] text-muted-foreground">Available</p>
                </div>
                <div className="p-2 rounded-xl bg-background border">
                  <p className="font-bold text-foreground">8 Categories</p>
                  <p className="text-[10px] text-muted-foreground">Mapped</p>
                </div>
                <div className="p-2 rounded-xl bg-background border">
                  <p className="font-bold text-foreground">100% Mocked</p>
                  <p className="text-[10px] text-muted-foreground">Zero Backend</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button onClick={handlePrev} variant="ghost" size="sm">Back</Button>
              <Button onClick={handleNext} variant="brand">Preview Storefront</Button>
            </div>
          </div>)}

        {/* Step 6: Store Preview */}
        {currentStep === 6 && (<div className="p-8 sm:p-10 rounded-3xl border bg-card shadow-soft space-y-6">
            <div className="border-b pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Live Storefront Preview</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Here is how your storefront will appear to visitors.
                </p>
              </div>
              <Badge variant="success">Ready for Launch</Badge>
            </div>

            {/* Micro Storefront Mockup */}
            <div className="rounded-2xl border overflow-hidden bg-background shadow-md">
              <div className="p-3 bg-muted/60 border-b flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">{storeName}</span>
                <span className="text-[10px] text-muted-foreground">goodfind.io/demo-store</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white space-y-1">
                  <Badge variant="secondary" className="text-[10px] bg-white/20 text-white border-0">
                    {selectedCategory}
                  </Badge>
                  <h3 className="font-extrabold text-lg">{storeName}</h3>
                  <p className="text-xs text-violet-100">{storeTagline}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg border bg-card">
                    <p className="font-semibold text-foreground">Sample Product 1</p>
                    <p className="text-muted-foreground">$189.00 • In Stock</p>
                  </div>
                  <div className="p-3 rounded-lg border bg-card">
                    <p className="font-semibold text-foreground">Sample Product 2</p>
                    <p className="text-muted-foreground">$349.00 • In Stock</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button onClick={handlePrev} variant="ghost" size="sm">Back</Button>
              <Button onClick={handleNext} variant="brand">Complete Setup</Button>
            </div>
          </div>)}

        {/* Step 7: Completion Screen */}
        {currentStep === 7 && (<div className="p-8 sm:p-12 rounded-3xl border bg-card shadow-soft text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10"/>
            </div>

            <div className="space-y-2">
              <Badge variant="success">Setup Completed</Badge>
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                {storeName} is Live!
              </h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Your demo store configuration is active. You can now manage products, orders, discounts, and customer cohorts in the Merchant Admin Console.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Button onClick={handleFinishSetup} variant="brand" size="lg" className="rounded-xl px-8 shadow-md gap-2">
                <Store className="h-5 w-5"/>
                <span>Open Merchant Admin Dashboard</span>
                <ArrowRight className="h-4 w-4"/>
              </Button>
              <Link to="/catalog">
                <Button variant="outline" size="lg" className="rounded-xl">
                  <span>Visit Customer Storefront</span>
                </Button>
              </Link>
            </div>
          </div>)}
      </div>
    </div>);
}
