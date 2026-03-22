import AnimatedRouter from '@/components/AnimatedRouter';
import UtilitiesPanel from '@/components/UtilitiesPanel';
import NetworkFlow from '@/components/NetworkFlow';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Home Page - Animated Wireless Router Dashboard
 * 
 * Design Philosophy: Tech-Forward Minimalism
 * - Split-screen layout: Router visualization (left) and utilities panel (right)
 * - Glassmorphic design with cyan accents
 * - Integrated network flow visualization
 * - Responsive layout that adapts to mobile devices
 * - Smooth animations and transitions throughout
 */

export default function Home() {
  const [showUtilities, setShowUtilities] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'flow' | 'utilities'>('overview');

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background pattern */}
      <div
        className="fixed inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663463892705/YgwuAdHsf4atVyCQgxeVhL/tech-pattern-GfDicNVwnNzG3Y2CPiAcKv.webp)',
          backgroundSize: '300px 300px',
        }}
      />

      {/* Header */}
      <header className="glass-effect border-b border-accent/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-mono-display text-sm">⚡</span>
              </div>
              <h1 className="font-mono-display text-lg text-foreground">
                Wireless Router Dashboard
              </h1>
            </div>

            {/* Toggle button for mobile */}
            <button
              onClick={() => setShowUtilities(!showUtilities)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-accent"
            >
              {showUtilities ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-2 md:gap-4 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'flow', label: 'Network Flow' },
              { id: 'utilities', label: 'Utilities' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-mono-body text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent/20 text-accent border border-accent/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8">
            {/* Left: Router Visualization (2/3 width on desktop) */}
            <div className="md:col-span-2 flex items-center justify-center">
              <AnimatedRouter />
            </div>

            {/* Right: Utilities Panel (1/3 width on desktop) */}
            <div className="md:col-span-1 max-h-[calc(100vh-200px)] overflow-y-auto">
              <UtilitiesPanel />
            </div>
          </div>
        )}

        {/* Network Flow Tab */}
        {activeTab === 'flow' && (
          <div className="p-4 md:p-8">
            <NetworkFlow />
          </div>
        )}

        {/* Utilities Tab */}
        {activeTab === 'utilities' && (
          <div className="p-4 md:p-8">
            <UtilitiesPanel />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="glass-effect border-t border-accent/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-mono-display text-foreground mb-3">About</h3>
              <p className="text-muted-foreground text-sm">
                Advanced wireless router dashboard with real-time network visualization and management tools.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-mono-display text-foreground mb-3">Features</h3>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Animated signal visualization</li>
                <li>• Real-time network metrics</li>
                <li>• Device management</li>
                <li>• Advanced settings control</li>
              </ul>
            </div>

            {/* Status */}
            <div>
              <h3 className="font-mono-display text-foreground mb-3">System Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-muted-foreground">All systems operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-muted-foreground">Network stable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-accent/20 pt-6 text-center text-muted-foreground text-xs">
            <p>
              Animated Wireless Router Dashboard • Tech-Forward Minimalism Design •{' '}
              <span className="text-accent">Real-time Network Visualization</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
