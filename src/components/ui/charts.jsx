import React, { useState, useId } from 'react';
import Card from './Card';
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  BarChart2,
  PieChart as PieIcon,
  ShieldCheck,
} from 'lucide-react';

// Helper to generate smooth cubic bezier SVG path
function getSmoothPath(points) {
  if (points.length < 2) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
}

// ----------------------------------------------------------------------
// 1. Sparkline Metric Card (KPI + Mini Chart)
// ----------------------------------------------------------------------
export const SparklineMetricCard = ({
  title,
  value,
  change,
  positive = true,
  subtitle,
  data = [30, 42, 38, 55, 48, 62, 58, 75, 70, 85],
  color = '#22c55e',
  icon: Icon = Activity,
}) => {
  const gradientId = useId();
  const width = 160;
  const height = 48;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 10) - 5,
  }));

  const linePath = getSmoothPath(points);
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <Card className="flex flex-col justify-between overflow-hidden">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{title}</span>
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5 tracking-tight">{value}</h4>
        </div>
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 sm:gap-4 mt-2">
        <div className="space-y-1 min-w-0 flex-1">
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              positive
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
            }`}
          >
            {positive ? <ArrowUpRight className="w-3.5 h-3.5 me-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 me-0.5" />}
            {change}
          </span>
          {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 truncate" title={subtitle}>{subtitle}</p>}
        </div>

        <div className="w-24 sm:w-32 h-10 sm:h-12 shrink-0" dir="ltr">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#${gradientId})`} />
            <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill={color} />
          </svg>
        </div>
      </div>
    </Card>
  );
};

// ----------------------------------------------------------------------
// 2. Interactive Area Chart Card (Trends over Time)
// ----------------------------------------------------------------------
export const AreaChartCard = ({
  title,
  subtitle,
  data = [],
  dataKey = 'value',
  labelKey = 'label',
  color = '#22c55e',
  badgeText = '+14.8%',
  value = '1,420 Patients',
  className = '',
}) => {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState(null);

  const width = 600;
  const height = 240;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 25;
  const padBottom = 35;

  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padTop - padBottom;

  const values = data.map((d) => d[dataKey] ?? 0);
  const maxVal = Math.max(...values, 100);

  const points = data.map((d, i) => {
    const val = d[dataKey] ?? 0;
    const x = padLeft + (i / Math.max(data.length - 1, 1)) * chartWidth;
    const y = padTop + chartHeight - (val / maxVal) * chartHeight;
    return { x, y, data: d, val };
  });

  const linePath = getSmoothPath(points);
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${padTop + chartHeight} L ${points[0].x} ${padTop + chartHeight} Z`
    : '';

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            {title}
          </h3>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="text-start sm:text-end shrink-0">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
          <div className="text-xs text-emerald-500 font-semibold">{badgeText} vs previous month</div>
        </div>
      </div>

      <div className="relative w-full h-64" dir="ltr">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full select-none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="90%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.33, 0.66, 1].map((tick, i) => {
            const y = padTop + chartHeight * (1 - tick);
            return (
              <g key={i}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  className="text-gray-200 dark:text-gray-800"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-gray-400 dark:fill-gray-500 text-xs font-mono"
                >
                  {Math.round(maxVal * tick)}
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* X axis labels */}
          {points.map((pt, i) => (
            <text
              key={i}
              x={pt.x}
              y={padTop + chartHeight + 20}
              textAnchor="middle"
              className="fill-gray-400 dark:fill-gray-500 text-xs font-medium"
            >
              {pt.data[labelKey]}
            </text>
          ))}

          {/* Hover interactive bars */}
          {points.map((pt, i) => (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setHoverIndex(i)}>
              <rect
                x={pt.x - chartWidth / (points.length * 2)}
                y={padTop}
                width={chartWidth / points.length}
                height={chartHeight}
                fill="transparent"
              />
              {hoverIndex === i && (
                <>
                  <line
                    x1={pt.x}
                    y1={padTop}
                    x2={pt.x}
                    y2={padTop + chartHeight}
                    stroke={color}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="opacity-70"
                  />
                  <circle cx={pt.x} cy={pt.y} r="5" fill={color} />
                  <circle cx={pt.x} cy={pt.y} r="2" fill="#ffffff" />
                </>
              )}
            </g>
          ))}
        </svg>

        {/* Floating tooltip */}
        {hoverIndex !== null && points[hoverIndex] && (
          <div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-full -mt-2 px-3 py-1.5 rounded-xl bg-gray-900/95 dark:bg-gray-950/95 text-white border border-gray-700/60 dark:border-gray-800 shadow-xl backdrop-blur-md text-xs z-30 text-start"
            style={{
              left: `${(points[hoverIndex].x / width) * 100}%`,
              top: `${(points[hoverIndex].y / height) * 100}%`,
            }}
          >
            <div className="font-semibold text-gray-300 text-xs mb-0.5">
              {points[hoverIndex].data[labelKey]}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-bold text-white">
                {points[hoverIndex].val.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

// ----------------------------------------------------------------------
// 3. Paired Bar Chart Card (Department Comparisons)
// ----------------------------------------------------------------------
export const BarChartCard = ({
  title,
  subtitle,
  data = [],
  seriesKey1 = 'current',
  seriesKey2 = 'previous',
  seriesLabel1 = 'Current Inflow',
  seriesLabel2 = 'Target Capacity',
  color1 = '#22c55e',
  color2 = '#06b6d4',
  className = '',
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const width = 600;
  const height = 240;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 25;
  const padBottom = 35;

  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padTop - padBottom;

  const maxVal = Math.max(
    ...data.flatMap((d) => [d[seriesKey1] || 0, d[seriesKey2] || 0]),
    100
  );

  const groupWidth = chartWidth / data.length;
  const barWidth = Math.min(groupWidth * 0.3, 18);
  const gap = 3;

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-cyan-500" />
            {title}
          </h3>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: color1 }} />
            <span className="text-gray-600 dark:text-gray-300">{seriesLabel1}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: color2 }} />
            <span className="text-gray-600 dark:text-gray-300">{seriesLabel2}</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-64" dir="ltr">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full select-none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {[0, 0.33, 0.66, 1].map((tick, i) => {
            const y = padTop + chartHeight * (1 - tick);
            return (
              <g key={i}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  className="text-gray-200 dark:text-gray-800"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-gray-400 dark:fill-gray-500 text-xs font-mono"
                >
                  {Math.round(maxVal * tick)}
                </text>
              </g>
            );
          })}

          {data.map((d, i) => {
            const groupCenterX = padLeft + i * groupWidth + groupWidth / 2;
            const val1 = d[seriesKey1] || 0;
            const val2 = d[seriesKey2] || 0;
            const h1 = (val1 / maxVal) * chartHeight;
            const h2 = (val2 / maxVal) * chartHeight;

            const x1 = groupCenterX - barWidth - gap / 2;
            const x2 = groupCenterX + gap / 2;
            const y1 = padTop + chartHeight - h1;
            const y2 = padTop + chartHeight - h2;
            const isHover = hoverIndex === i;

            return (
              <g
                key={i}
                className="cursor-pointer transition-opacity duration-200"
                onMouseEnter={() => setHoverIndex(i)}
                opacity={hoverIndex !== null && !isHover ? 0.45 : 1}
              >
                {isHover && (
                  <rect
                    x={padLeft + i * groupWidth + 4}
                    y={padTop}
                    width={groupWidth - 8}
                    height={chartHeight}
                    fill="currentColor"
                    className="text-gray-100 dark:text-gray-800/40"
                    rx="6"
                  />
                )}
                <rect x={x1} y={y1} width={barWidth} height={h1} fill={color1} rx="4" />
                <rect x={x2} y={y2} width={barWidth} height={h2} fill={color2} rx="4" />
                <text
                  x={groupCenterX}
                  y={padTop + chartHeight + 20}
                  textAnchor="middle"
                  className={`text-xs font-medium transition-colors ${
                    isHover
                      ? 'fill-gray-900 dark:fill-white font-bold'
                      : 'fill-gray-400 dark:fill-gray-500'
                  }`}
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {hoverIndex !== null && data[hoverIndex] && (
          <div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-full -mt-2 px-3 py-1.5 rounded-xl bg-gray-900/95 dark:bg-gray-950/95 text-white border border-gray-700/60 dark:border-gray-800 shadow-xl backdrop-blur-md text-xs z-30 space-y-1 text-start"
            style={{
              left: `${((padLeft + hoverIndex * groupWidth + groupWidth / 2) / width) * 100}%`,
              top: `${(padTop / height) * 100}%`,
            }}
          >
            <div className="font-semibold text-gray-300 text-xs">{data[hoverIndex].label}</div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color1 }} />
                {seriesLabel1}:
              </span>
              <span className="font-bold text-white">{data[hoverIndex][seriesKey1]}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color2 }} />
                {seriesLabel2}:
              </span>
              <span className="font-bold text-white">{data[hoverIndex][seriesKey2]}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

// ----------------------------------------------------------------------
// 4. Donut & Segment Distribution Chart Card
// ----------------------------------------------------------------------
export const DonutChartCard = ({
  title,
  subtitle,
  data = [],
  totalLabel = 'Total Inpatients',
  className = '',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const size = 200;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = data.reduce((s, d) => s + (d.value || 0), 0) || 1;

  const { list: segments } = data.reduce(
    (acc, d, i) => {
      const pct = d.value / total;
      const dash = pct * circumference;
      const offset = acc.accumulated * circumference;
      acc.list.push({ ...d, pct: Math.round(pct * 100), dash, offset, index: i });
      acc.accumulated += pct;
      return acc;
    },
    { accumulated: 0, list: [] }
  );

  const activeSlice = hoveredIdx !== null ? segments[hoveredIdx] : null;

  return (
    <Card className={`relative overflow-hidden flex flex-col justify-between ${className}`}>
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-purple-500" />
          {title}
        </h3>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex flex-col items-center justify-between w-full my-auto">
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full transform -rotate-90 select-none"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className="text-gray-100 dark:text-gray-800"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={seg.color}
                strokeWidth={hoveredIdx === i ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
                strokeDashoffset={-seg.offset}
                strokeLinecap="butt"
                fill="transparent"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4" dir="ltr">
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              {activeSlice ? `${activeSlice.value}` : total.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate max-w-full">
              {activeSlice ? activeSlice.name : totalLabel}
            </span>
            {activeSlice && (
              <span className="text-xs font-bold text-primary mt-0.5">
                {activeSlice.pct}% share
              </span>
            )}
          </div>
        </div>

        {/* Responsive legend grid that fits mobile, tablet & laptop columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 w-full pt-3 mt-3 border-t border-gray-100 dark:border-gray-800/80">
          {segments.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-1.5 px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                hoveredIdx === i
                  ? 'bg-gray-100 dark:bg-gray-800'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate" title={item.name}>
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs shrink-0 font-mono" dir="ltr">
                <span className="font-bold text-gray-900 dark:text-white">{item.value}</span>
                <span className="text-gray-400">({item.pct}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// ----------------------------------------------------------------------
// 5. Radar / Spider Web Chart Card (Clinical Quality Indices)
// ----------------------------------------------------------------------
export const RadarChartCard = ({
  title,
  subtitle,
  metrics = [
    { label: 'Patient Safety', value: 94 },
    { label: 'Infection Control', value: 88 },
    { label: 'Bed Turnover', value: 76 },
    { label: 'Med Accuracy', value: 98 },
    { label: 'Nurse Ratio', value: 85 },
  ],
  color = '#22c55e',
  className = '',
}) => {
  const size = 320;
  const center = size / 2;
  const radius = 72;
  const totalAxes = metrics.length;

  const getCoordinates = (index, valPercent) => {
    const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2;
    const r = radius * (valPercent / 100);
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const points = metrics.map((m, i) => getCoordinates(i, m.value));
  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <Card className={`relative overflow-hidden flex flex-col justify-between ${className}`}>
      <div className="mb-2">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          {title}
        </h3>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="w-full flex items-center justify-center my-auto py-2" dir="ltr">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-xs h-auto mx-auto select-none overflow-visible">
          {[0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const ringPts = Array.from({ length: totalAxes }).map((_, i) =>
              getCoordinates(i, pct * 100)
            );
            return (
              <polygon
                key={idx}
                points={ringPts.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-200 dark:text-gray-800"
              />
            );
          })}

          {Array.from({ length: totalAxes }).map((_, i) => {
            const outer = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-200 dark:text-gray-800"
              />
            );
          })}

          <polygon
            points={polygonPath}
            fill={color}
            fillOpacity="0.25"
            stroke={color}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {metrics.map((m, i) => {
            const pt = points[i];
            const labelCoord = getCoordinates(i, 132);
            return (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="3.5" fill={color} stroke="#ffffff" strokeWidth="1.5" />
                <text
                  x={labelCoord.x}
                  y={labelCoord.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-600 dark:fill-gray-300 text-xs font-semibold"
                >
                  {m.label} ({m.value}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
};
