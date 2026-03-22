import React, { useState } from 'react';
import { ChevronDown, Wifi, Shield, Zap, Settings, Users, Activity, Lock } from 'lucide-react';

/**
 * UtilitiesPanel Component
 * 
 * Design Philosophy: Tech-Forward Minimalism
 * - Glassmorphic collapsible cards for features
 * - Cyan accent indicators for active states
 * - Smooth expand/collapse animations
 * - Icon-driven interface for quick recognition
 */

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'warning';
  details: string[];
}

export default function UtilitiesPanel() {
  const [expandedId, setExpandedId] = useState<string | null>('network');

  const features: Feature[] = [
    {
      id: 'network',
      title: 'Network Management',
      description: 'Configure WiFi networks and connectivity',
      icon: <Wifi className="w-5 h-5" />,
      status: 'active',
      details: [
        '2.4GHz Band: 54 Mbps',
        '5GHz Band: 867 Mbps',
        'Channel: Auto',
        'Bandwidth: 80 MHz',
      ],
    },
    {
      id: 'security',
      title: 'Security Settings',
      description: 'Manage encryption and access control',
      icon: <Shield className="w-5 h-5" />,
      status: 'active',
      details: [
        'Encryption: WPA3',
        'Firewall: Enabled',
        'DDoS Protection: Active',
        'Intrusion Detection: On',
      ],
    },
    {
      id: 'performance',
      title: 'Performance Metrics',
      description: 'Real-time network performance data',
      icon: <Zap className="w-5 h-5" />,
      status: 'active',
      details: [
        'Latency: 12ms',
        'Packet Loss: 0.1%',
        'Throughput: 450 Mbps',
        'Uptime: 99.8%',
      ],
    },
    {
      id: 'devices',
      title: 'Connected Devices',
      description: 'Monitor and manage connected devices',
      icon: <Users className="w-5 h-5" />,
      status: 'active',
      details: [
        'Desktop: 192.168.1.10',
        'Laptop: 192.168.1.15',
        'Phone: 192.168.1.20',
        'Smart TV: 192.168.1.25',
      ],
    },
    {
      id: 'monitoring',
      title: 'System Monitoring',
      description: 'Track router health and diagnostics',
      icon: <Activity className="w-5 h-5" />,
      status: 'active',
      details: [
        'CPU Usage: 24%',
        'Memory: 512 MB / 1 GB',
        'Temperature: 45°C',
        'Last Restart: 15 days ago',
      ],
    },
    {
      id: 'advanced',
      title: 'Advanced Settings',
      description: 'Fine-tune network parameters',
      icon: <Settings className="w-5 h-5" />,
      status: 'inactive',
      details: [
        'QoS: Disabled',
        'Port Forwarding: 0 rules',
        'DHCP: Enabled (192.168.1.0/24)',
        'DNS: Auto',
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'inactive':
        return 'text-gray-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusGlow = (status: string) => {
    switch (status) {
      case 'active':
        return 'shadow-lg shadow-green-500/20';
      case 'warning':
        return 'shadow-lg shadow-yellow-500/20';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-mono-display text-foreground mb-2">
          Router Features & Utilities
        </h2>
        <p className="text-muted-foreground text-sm">
          Manage and monitor your wireless network with real-time metrics and controls
        </p>
      </div>

      {/* Features Grid */}
      <div className="space-y-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`glass-effect rounded-xl overflow-hidden transition-all duration-300 ${
              expandedId === feature.id ? 'ring-2 ring-accent' : ''
            } ${getStatusGlow(feature.status)}`}
          >
            {/* Header - Always visible */}
            <button
              onClick={() =>
                setExpandedId(expandedId === feature.id ? null : feature.id)
              }
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 text-left">
                {/* Icon with status indicator */}
                <div
                  className={`relative p-2 rounded-lg transition-all ${
                    feature.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : feature.status === 'warning'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {feature.icon}
                  {feature.status === 'active' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  )}
                </div>

                {/* Title and description */}
                <div>
                  <h3 className="font-mono-display text-foreground text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Status badge and chevron */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-mono-body px-2 py-1 rounded ${getStatusColor(
                    feature.status
                  )} bg-white/5`}
                >
                  {feature.status.toUpperCase()}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-accent transition-transform duration-300 ${
                    expandedId === feature.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {/* Expanded Content */}
            {expandedId === feature.id && (
              <div className="px-4 pb-4 border-t border-accent/20 pt-4 bg-white/2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {feature.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-foreground/90 font-mono-body">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action buttons for expanded items */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-3 py-2 rounded text-xs font-mono-display text-accent bg-white/10 hover:bg-accent/20 transition-colors">
                    Configure
                  </button>
                  <button className="flex-1 px-3 py-2 rounded text-xs font-mono-display text-accent bg-white/10 hover:bg-accent/20 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 glass-effect rounded-xl p-6">
        <h3 className="font-mono-display text-foreground mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-accent" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Restart', icon: '↻' },
            { label: 'Reset', icon: '⟲' },
            { label: 'Backup', icon: '💾' },
            { label: 'Update', icon: '⬆' },
          ].map((action, idx) => (
            <button
              key={idx}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 hover:glow-cyan transition-all text-center"
            >
              <div className="text-lg mb-1">{action.icon}</div>
              <div className="text-xs font-mono-display text-foreground">
                {action.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 text-xs text-muted-foreground space-y-1">
        <p>• <span className="text-green-400">Active</span> - Feature is operational</p>
        <p>• <span className="text-yellow-400">Warning</span> - Attention needed</p>
        <p>• <span className="text-gray-400">Inactive</span> - Feature is disabled</p>
      </div>
    </div>
  );
}
