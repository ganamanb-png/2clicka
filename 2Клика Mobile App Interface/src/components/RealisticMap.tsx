import React from 'react';

interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'residential' | 'commercial' | 'park';
}

interface Road {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  name?: string;
}

interface RealisticMapProps {
  children?: React.ReactNode;
  zoom?: number;
}

export const RealisticMap: React.FC<RealisticMapProps> = ({ children, zoom = 1 }) => {
  // Realistic buildings layout
  const buildings: Building[] = [
    // Residential blocks
    { x: 50, y: 50, width: 80, height: 60, type: 'residential' },
    { x: 50, y: 140, width: 80, height: 70, type: 'residential' },
    { x: 160, y: 50, width: 90, height: 65, type: 'commercial' },
    { x: 160, y: 145, width: 90, height: 65, type: 'residential' },
    { x: 280, y: 50, width: 70, height: 80, type: 'commercial' },
    { x: 280, y: 160, width: 70, height: 50, type: 'residential' },
    
    // Parks
    { x: 380, y: 50, width: 100, height: 100, type: 'park' },
    
    // More buildings
    { x: 50, y: 240, width: 85, height: 75, type: 'residential' },
    { x: 165, y: 240, width: 75, height: 75, type: 'residential' },
    { x: 270, y: 240, width: 95, height: 75, type: 'commercial' },
    { x: 395, y: 180, width: 85, height: 135, type: 'residential' },
    
    { x: 50, y: 345, width: 90, height: 85, type: 'residential' },
    { x: 170, y: 345, width: 80, height: 85, type: 'commercial' },
    { x: 280, y: 345, width: 85, height: 85, type: 'residential' },
    { x: 395, y: 345, width: 85, height: 85, type: 'residential' },
  ];

  // Street network
  const roads: Road[] = [
    // Horizontal streets
    { x1: 0, y1: 130, x2: 600, y2: 130, width: 8, name: 'ул. Ленина' },
    { x1: 0, y1: 230, x2: 600, y2: 230, width: 8, name: 'ул. Пушкина' },
    { x1: 0, y1: 330, x2: 600, y2: 330, width: 8, name: 'пр. Мира' },
    
    // Vertical streets
    { x1: 145, y1: 0, x2: 145, y2: 500, width: 8 },
    { x1: 265, y1: 0, x2: 265, y2: 500, width: 8 },
    { x1: 370, y1: 0, x2: 370, y2: 500, width: 8 },
  ];

  const getBuildingColor = (type: string) => {
    switch (type) {
      case 'residential':
        return '#1a2332';
      case 'commercial':
        return '#1e2836';
      case 'park':
        return '#0d4d2a';
      default:
        return '#1a2332';
    }
  };

  const getBuildingStroke = (type: string) => {
    switch (type) {
      case 'residential':
        return '#2a3f5f';
      case 'commercial':
        return '#3a4f6f';
      case 'park':
        return '#1a6d4a';
      default:
        return '#2a3f5f';
    }
  };

  return (
    <div className="absolute inset-0 bg-[#0d1117] overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Gradient for roads */}
          <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1c2632" />
            <stop offset="50%" stopColor="#161d27" />
            <stop offset="100%" stopColor="#1c2632" />
          </linearGradient>

          {/* Building window pattern */}
          <pattern id="windows" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="2" y="2" width="2.5" height="3" fill="#4a90e2" opacity="0.3" />
            <rect x="6" y="2" width="2.5" height="3" fill="#4a90e2" opacity="0.3" />
            <rect x="2" y="6" width="2.5" height="3" fill="#4a90e2" opacity="0.3" />
            <rect x="6" y="6" width="2.5" height="3" fill="#4a90e2" opacity="0.3" />
          </pattern>

          {/* Park trees pattern */}
          <pattern id="trees" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="3" fill="#1a8d4a" opacity="0.6" />
            <circle cx="12" cy="10" r="2.5" fill="#1a8d4a" opacity="0.6" />
          </pattern>

          {/* Glow filter for accent elements */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Roads layer */}
        <g className="roads">
          {roads.map((road, i) => (
            <g key={i}>
              {/* Road background */}
              <line
                x1={road.x1}
                y1={road.y1}
                x2={road.x2}
                y2={road.y2}
                stroke="url(#roadGradient)"
                strokeWidth={road.width}
                strokeLinecap="round"
              />
              {/* Road center line */}
              <line
                x1={road.x1}
                y1={road.y1}
                x2={road.x2}
                y2={road.y2}
                stroke="#4a5568"
                strokeWidth={0.5}
                strokeDasharray="4,4"
                opacity="0.5"
              />
              {/* Street name label */}
              {road.name && (
                <text
                  x={(road.x1 + road.x2) / 2}
                  y={road.y1 - 5}
                  fill="#6b7280"
                  fontSize="7"
                  textAnchor="middle"
                  opacity="0.8"
                >
                  {road.name}
                </text>
              )}
            </g>
          ))}
        </g>

        {/* Buildings layer */}
        <g className="buildings">
          {buildings.map((building, i) => (
            <g key={i}>
              {/* Building shadow */}
              <rect
                x={building.x + 2}
                y={building.y + 2}
                width={building.width}
                height={building.height}
                fill="black"
                opacity="0.3"
                rx="2"
              />
              {/* Building body */}
              <rect
                x={building.x}
                y={building.y}
                width={building.width}
                height={building.height}
                fill={getBuildingColor(building.type)}
                stroke={getBuildingStroke(building.type)}
                strokeWidth="1"
                rx="2"
              />
              {/* Building details */}
              {building.type === 'residential' && (
                <rect
                  x={building.x}
                  y={building.y}
                  width={building.width}
                  height={building.height}
                  fill="url(#windows)"
                  rx="2"
                />
              )}
              {building.type === 'commercial' && (
                <>
                  <rect
                    x={building.x}
                    y={building.y}
                    width={building.width}
                    height={building.height}
                    fill="url(#windows)"
                    rx="2"
                  />
                  <rect
                    x={building.x}
                    y={building.y}
                    width={building.width}
                    height="4"
                    fill="#0A84FF"
                    opacity="0.3"
                    rx="2"
                  />
                </>
              )}
              {building.type === 'park' && (
                <rect
                  x={building.x}
                  y={building.y}
                  width={building.width}
                  height={building.height}
                  fill="url(#trees)"
                  rx="2"
                />
              )}
            </g>
          ))}
        </g>

        {/* Custom elements overlay */}
        <g className="overlay">
          {children}
        </g>
      </svg>

      {/* Zoom controls */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          +
        </button>
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          −
        </button>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-24 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md">
        <span className="text-white/60 text-xs">© 2Клика Maps</span>
      </div>
    </div>
  );
};
