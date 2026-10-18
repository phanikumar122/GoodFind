import * as React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
export function AdminSettingsPage() {
    const { settings, updateSettings, updateAppearance, updateAnnouncement } = useProductStore();
    const [storeName, setStoreName] = React.useState(settings.storeName);
    const [tagline, setTagline] = React.useState(settings.tagline);
    const [supportEmail, setSupportEmail] = React.useState(settings.supportEmail);
    const [phone, setPhone] = React.useState(settings.phone);
    // Announcement bar
    const [announcementEnabled, setAnnouncementEnabled] = React.useState(settings.announcement.enabled);
    const [announcementText, setAnnouncementText] = React.useState(settings.announcement.text);
    const [announcementLinkText, setAnnouncementLinkText] = React.useState(settings.announcement.linkText);
    // Appearance
    const [heroHeadline, setHeroHeadline] = React.useState(settings.appearance.heroHeadline);
    const [heroSubheadline, setHeroSubheadline] = React.useState(settings.appearance.heroSubheadline);
    const [isSaved, setIsSaved] = React.useState(false);
    const handleSave = (e) => {
        e.preventDefault();
        updateSettings({
            storeName,
            tagline,
            supportEmail,
            phone,
        });
        updateAnnouncement({
            enabled: announcementEnabled,
            text: announcementText,
            linkText: announcementLinkText,
        });
        updateAppearance({
            heroHeadline,
            heroSubheadline,
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };
    return (<div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          Storefront Settings & Customization
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure branding, announcement notices, and editorial hero copy.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* General Brand Details */}
        <div className="p-6 sm:p-8 rounded-3xl border bg-card shadow-soft space-y-4">
          <h2 className="text-base font-bold text-foreground border-b pb-3">Brand Identity</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Storefront Name
              </label>
              <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} required/>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Concierge Support Email
              </label>
              <Input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} required/>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Store Tagline
            </label>
            <Input value={tagline} onChange={(e) => setTagline(e.target.value)} required/>
          </div>
        </div>

        {/* Announcement Bar Customization */}
        <div className="p-6 sm:p-8 rounded-3xl border bg-card shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-bold text-foreground">Top Announcement Bar</h2>
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input type="checkbox" checked={announcementEnabled} onChange={(e) => setAnnouncementEnabled(e.target.checked)} className="rounded border-input text-primary focus:ring-primary h-4 w-4"/>
              <span>Display on Storefront</span>
            </label>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Banner Text Message
            </label>
            <Input value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)} required/>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              CTA Link Label
            </label>
            <Input value={announcementLinkText} onChange={(e) => setAnnouncementLinkText(e.target.value)}/>
          </div>
        </div>

        {/* Editorial Hero Content */}
        <div className="p-6 sm:p-8 rounded-3xl border bg-card shadow-soft space-y-4">
          <h2 className="text-base font-bold text-foreground border-b pb-3">
            Homepage Editorial Hero Copy
          </h2>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Headline Title
            </label>
            <Input value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} required/>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Subheadline Description
            </label>
            <Textarea value={heroSubheadline} onChange={(e) => setHeroSubheadline(e.target.value)} rows={3} required/>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {isSaved ? (<span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4"/> Storefront settings updated and live!
            </span>) : (<span className="text-xs text-muted-foreground">
              Modifications immediately update local storefront view.
            </span>)}

          <Button type="submit" variant="brand" className="shadow-md">
            Save Storefront Settings
          </Button>
        </div>
      </form>
    </div>);
}
