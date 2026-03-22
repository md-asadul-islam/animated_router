import React, { useEffect, useState } from 'react';

/**
 * NetworkFlow Component
 * 
 * Design Philosophy: Tech-Forward Minimalism
 * - Animated data flow visualization
 * - Shows connection processes and bandwidth usage
 * - Real-time metrics with smooth animations
 * - Connected to router status
 */

interface DataPacket {
  id: string;
  source: string;
  destination: string;
  size: number;
  progress: number;
  color: string;
}

export default function NetworkFlow() {
  const [packets, setPackets] = useState<DataPacket[]>([]);

  // Generate animated data packets
  useEffect(() => {
    const generatePacket = () => {
      const sources = ['Device 1', 'Device 2', 'Device 3', 'Cloud'];
      const destinations = ['Internet', 'Cloud', 'Device 1', 'Device 2'];
      const colors = ['#00D9FF', '#0099FF', '#00FF88', '#FFD700'];

      const packet: DataPacket = {
        id: Math.random().toString(),
        source: sources[Math.floor(Math.random() * sources.length)],
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        size: Math.floor(Math.random() * 5000) + 500,
        progress: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setPackets((prev) => [...prev, packet]);

      // Remove packet after animation completes
      setTimeout(() => {
        setPackets((prev) => prev.filter((p) => p.id !== packet.id));
      }, 3000);
    };

    const interval = setInterval(generatePacket, 500);
    return () => clearInterval(interval);
  }, []);

  // Animate packet progress
  useEffect(() => {
    const animationFrame = setInterval(() => {
      setPackets((prev) =>
        prev.map((packet) => ({
          ...packet,
          progress: Math.min(packet.progress + 2, 100),
        }))
      );
    }, 30);

    return () => clearInterval(animationFrame);
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Network Flow Visualization */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="font-mono-display text-foreground mb-6 flex items-center gap-2">
          <span className="text-accent">⟿</span> Network Data Flow
        </h3>

        {/* Flow diagram */}
        <div className="relative h-48 bg-white/5 rounded-lg overflow-hidden border border-accent/20">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Left to center */}
            <line
              x1="0"
              y1="50%"
              x2="50%"
              y2="50%"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              opacity="0.3"
            />
            {/* Center to right */}
            <line
              x1="50%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              opacity="0.3"
            />
            {/* Top connection */}
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="50%"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              opacity="0.3"
            />
            {/* Bottom connection */}
            <line
              x1="50%"
              y1="50%"
              x2="50%"
              y2="100%"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              opacity="0.3"
            />

            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0099FF" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Animated data packets */}
            {packets.map((packet) => (
              <g key={packet.id}>
                {/* Packet body */}
                <rect
                  x={`${packet.progress}%`}
                  y="45%"
                  width="20"
                  height="10"
                  fill={packet.color}
                  opacity="0.8"
                  rx="2"
                  style={{
                    filter: `drop-shadow(0 0 8px ${packet.color})`,
                  }}
                />
                {/* Packet trail */}
                <line
                  x1={`${Math.max(0, packet.progress - 20)}%`}
                  y1="50%"
                  x2={`${packet.progress}%`}
                  y2="50%"
                  stroke={packet.color}
                  strokeWidth="1"
                  opacity={`${0.3 - packet.progress / 333}`}
                />
              </g>
            ))}
          </svg>

          {/* Node labels */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-accent/30 border border-accent mx-auto mb-2" />
              <div className="text-xs text-muted-foreground font-mono-body">Devices</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-accent/30 border border-accent mx-auto mb-2" />
              <div className="text-xs text-muted-foreground font-mono-body">Router</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-accent/30 border border-accent mx-auto mb-2" />
              <div className="text-xs text-muted-foreground font-mono-body">Internet</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {[
            { color: '#00D9FF', label: 'Download' },
            { color: '#0099FF', label: 'Upload' },
            { color: '#00FF88', label: 'Local' },
            { color: '#FFD700', label: 'Priority' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Process Monitor */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="font-mono-display text-foreground mb-4 flex items-center gap-2">
          <span className="text-accent">⚙</span> Active Processes
        </h3>

        <div className="space-y-3">
          {[
            { name: 'DHCP Server', cpu: 5, memory: 12, status: 'running' },
            { name: 'DNS Resolver', cpu: 8, memory: 18, status: 'running' },
            { name: 'Firewall', cpu: 12, memory: 24, status: 'running' },
            { name: 'QoS Engine', cpu: 3, memory: 8, status: 'idle' },
          ].map((process, idx) => (
            <div
              key={idx}
              className="p-3 bg-white/5 rounded-lg border border-accent/10 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-body text-sm text-foreground">
                  {process.name}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    process.status === 'running'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {process.status.toUpperCase()}
                </span>
              </div>

              {/* Resource bars */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-12">CPU:</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-blue-400"
                      style={{ width: `${process.cpu}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {process.cpu}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-12">MEM:</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-accent"
                      style={{ width: `${process.memory}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {process.memory}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bandwidth Monitor */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="font-mono-display text-foreground mb-4 flex items-center gap-2">
          <span className="text-accent">📊</span> Bandwidth Usage
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Download', value: 245, max: 500, unit: 'Mbps' },
            { label: 'Upload', value: 85, max: 500, unit: 'Mbps' },
          ].map((metric, idx) => (
            <div key={idx} className="p-4 bg-white/5 rounded-lg border border-accent/10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-body text-sm text-foreground">
                  {metric.label}
                </span>
                <span className="text-accent font-mono-display text-lg">
                  {metric.value} <span className="text-xs text-muted-foreground">{metric.unit}</span>
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent via-blue-400 to-accent animate-pulse"
                  style={{ width: `${(metric.value / metric.max) * 100}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {((metric.value / metric.max) * 100).toFixed(1)}% of {metric.max} {metric.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
