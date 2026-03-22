import React, { useState } from 'react';

/**
 * AnimatedRouter Component
 * 
 * Design Philosophy: Tech-Forward Minimalism
 * - Glassmorphic container with cyan accents
 * - Animated concentric signal rings
 * - LED status indicators with pulsing glow
 * - Clean geometric forms inspired by network topology
 */

interface RouterStatus {
  power: boolean;
  signal: number; // 0-100
  connected: number;
  bandwidth: number;
}

export default function AnimatedRouter() {
  const [status, setStatus] = useState<RouterStatus>({
    power: true,
    signal: 85,
    connected: 12,
    bandwidth: 450,
  });

  const [isHovered, setIsHovered] = useState(false);

  // Toggle router power
  const togglePower = () => {
    setStatus(prev => ({ ...prev, power: !prev.power }));
  };

  // Simulate signal fluctuation
  const simulateSignal = () => {
    setStatus(prev => ({
      ...prev,
      signal: Math.max(30, Math.min(100, prev.signal + (Math.random() - 0.5) * 20)),
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* Main Router Container */}
      <div
        className="relative w-full max-w-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background with animated gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663463892705/YgwuAdHsf4atVyCQgxeVhL/tech-pattern-GfDicNVwnNzG3Y2CPiAcKv.webp)',
              backgroundSize: '200px 200px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-cyan-900/20" />
        </div>

        {/* Glass container */}
        <div className="glass-effect-strong rounded-3xl p-12">
          {/* Router Visualization Container */}
          <div className="relative flex flex-col items-center justify-center py-20">
            {/* SVG Signal Rings */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Outer signal rings */}
              {[1, 2, 3].map((ring) => (
                <circle
                  key={`ring-${ring}`}
                  cx="200"
                  cy="200"
                  r={60 + ring * 40}
                  fill="none"
                  stroke="url(#signalGradient)"
                  strokeWidth="2"
                  opacity={status.power ? 0.3 - ring * 0.05 : 0}
                  style={{
                    animation: status.power
                      ? `signal-pulse ${2 + ring * 0.3}s ease-out infinite`
                      : 'none',
                  }}
                />
              ))}

              {/* Animated signal dots on rings */}
              {status.power && [1, 2, 3].map((ring) =>
                [0, 1, 2, 3].map((dot) => {
                  const angle = (dot * 90 + Date.now() / 50) * (Math.PI / 180);
                  const radius = 60 + ring * 40;
                  const x = 200 + radius * Math.cos(angle);
                  const y = 200 + radius * Math.sin(angle);
                  return (
                    <circle
                      key={`dot-${ring}-${dot}`}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#00D9FF"
                      opacity="0.8"
                    />
                  );
                })
              )}

              {/* Gradient definitions */}
              <defs>
                <radialGradient id="signalGradient">
                  <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0099FF" stopOpacity="0.2" />
                </radialGradient>
              </defs>
            </svg>

            {/* Router Device */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Router Body */}
              <div
                className={`relative w-48 h-24 rounded-2xl transition-all duration-300 ${
                  isHovered ? 'glow-cyan-strong' : 'glow-cyan'
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(230, 240, 250, 0.95) 0%, rgba(200, 230, 255, 0.9) 100%)',
                  border: '2px solid rgba(0, 217, 255, 0.3)',
                }}
              >
                {/* Router shape - simplified */}
                <div className="absolute inset-0 flex items-center justify-between px-6 rounded-2xl">
                  {/* Left antenna */}
                  <div className="flex flex-col gap-2">
                    <div
                      className="w-1 h-12 rounded-full transition-all"
                      style={{
                        background: status.power ? '#0099FF' : '#666',
                        boxShadow: status.power ? '0 0 10px #0099FF' : 'none',
                      }}
                    />
                  </div>

                  {/* Center - Logo and status */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-2xl font-mono-display text-blue-900">WiFi</div>
                    <div className="flex gap-1">
                      {/* LED indicators */}
                      {[
                        { color: status.power ? '#00FF00' : '#333', label: 'Power' },
                        { color: status.signal > 50 ? '#00D9FF' : '#666', label: 'Signal' },
                        { color: status.connected > 0 ? '#FFD700' : '#666', label: 'Connected' },
                      ].map((led, idx) => (
                        <div
                          key={idx}
                          className="w-2 h-2 rounded-full animate-led-glow"
                          style={{
                            backgroundColor: led.color,
                            boxShadow: `0 0 8px ${led.color}`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right antenna */}
                  <div className="flex flex-col gap-2">
                    <div
                      className="w-1 h-12 rounded-full transition-all"
                      style={{
                        background: status.power ? '#0099FF' : '#666',
                        boxShadow: status.power ? '0 0 10px #0099FF' : 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Power button */}
              <button
                onClick={togglePower}
                className="mt-6 px-6 py-2 rounded-lg font-mono-display text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: status.power ? '#00D9FF' : '#444',
                  color: status.power ? '#081020' : '#ccc',
                  boxShadow: status.power ? '0 0 20px rgba(0, 217, 255, 0.4)' : 'none',
                }}
              >
                {status.power ? 'POWER ON' : 'POWER OFF'}
              </button>
            </div>
          </div>

          {/* Status Metrics */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { label: 'Signal Strength', value: `${Math.round(status.signal)}%`, unit: 'dBm' },
              { label: 'Connected Devices', value: status.connected, unit: 'devices' },
              { label: 'Bandwidth', value: `${status.bandwidth}`, unit: 'Mbps' },
            ].map((metric, idx) => (
              <div
                key={idx}
                className="glass-effect rounded-xl p-4 text-center hover:glow-cyan-strong transition-all"
              >
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  {metric.label}
                </div>
                <div className="text-2xl font-mono-display text-accent">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{metric.unit}</div>
              </div>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={simulateSignal}
              className="px-6 py-2 rounded-lg glass-effect hover:glow-cyan-strong text-accent font-mono-display text-sm transition-all hover:scale-105"
            >
              Simulate Signal
            </button>
            <button
              className="px-6 py-2 rounded-lg glass-effect hover:glow-cyan-strong text-accent font-mono-display text-sm transition-all hover:scale-105"
            >
              Network Settings
            </button>
          </div>
        </div>
      </div>

      {/* Info text */}
      <div className="mt-12 text-center text-muted-foreground text-sm max-w-md">
        <p>Hover over the router to see enhanced glow effects. Click buttons to interact with the device status.</p>
      </div>
    </div>
  );
}
