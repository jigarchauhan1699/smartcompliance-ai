"use client";

import { useMemo, useState } from "react";

import type { ChartPoint, ModuleContent } from "@/lib/module-content";

type InteractiveChartProps = {
  title: string;
  subtitle: string;
  variant: ModuleContent["chartVariant"];
  data: ChartPoint[];
};

function getMaxValue(data: ChartPoint[]) {
  return Math.max(...data.map((item) => Math.max(item.value, item.secondary ?? 0)), 1);
}

export function InteractiveChart({ title, subtitle, variant, data }: InteractiveChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex] ?? data[0];
  const maxValue = getMaxValue(data);

  const linePoints = useMemo(() => {
    const width = 560;
    const height = 190;

    return data.map((item, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * width;
      const y = height - (item.value / maxValue) * 150 - 12;
      const secondaryY =
        item.secondary !== undefined ? height - (item.secondary / maxValue) * 150 - 12 : undefined;

      return { x, y, secondaryY, label: item.label, value: item.value, secondary: item.secondary };
    });
  }, [data, maxValue]);

  const primaryPath = linePoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const secondaryPath = linePoints
    .filter((point) => point.secondaryY !== undefined)
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.secondaryY}`)
    .join(" ");

  return (
    <article className="interactive-chart-card">
      <div className="interactive-chart-header">
        <div>
          <span className="graph-label">{title}</span>
          <h3>{subtitle}</h3>
        </div>
        <div className="interactive-chart-stat">
          <strong>{activeItem.value}</strong>
          <span>{activeItem.label}</span>
        </div>
      </div>

      {variant === "bar" ? (
        <div className="hover-bar-chart">
          {data.map((item, index) => {
            const height = `${(item.value / maxValue) * 100}%`;
            const active = activeIndex === index;

            return (
              <button
                className={`hover-bar-wrap ${active ? "active" : ""}`}
                key={item.label}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                type="button"
              >
                <span className="hover-bar-value">{item.value}</span>
                <span className="hover-bar" style={{ height }} />
                <span className="hover-chart-label">{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {variant === "line" ? (
        <div className="hover-line-chart">
          <svg viewBox="0 0 560 210" className="hover-line-svg" role="img" aria-label={title}>
            <defs>
              <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(14,165,233,0.2)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.02)" />
              </linearGradient>
            </defs>
            <path d={`${primaryPath} L 560 210 L 0 210 Z`} fill="url(#lineFill)" />
            {secondaryPath ? <path d={secondaryPath} className="hover-line-secondary" /> : null}
            <path d={primaryPath} className="hover-line-primary" />
            {linePoints.map((point, index) => (
              <g key={point.label}>
                <line
                  x1={point.x}
                  x2={point.x}
                  y1={18}
                  y2={190}
                  className={`hover-line-guide ${activeIndex === index ? "active" : ""}`}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={activeIndex === index ? 7 : 5}
                  className={`hover-line-dot ${activeIndex === index ? "active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                />
                {point.secondaryY !== undefined ? (
                  <circle
                    cx={point.x}
                    cy={point.secondaryY}
                    r={activeIndex === index ? 5 : 4}
                    className={`hover-line-dot secondary ${activeIndex === index ? "active" : ""}`}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                ) : null}
              </g>
            ))}
          </svg>
          <div className="hover-line-footer">
            {data.map((item, index) => (
              <button
                className={`hover-line-label ${activeIndex === index ? "active" : ""}`}
                key={item.label}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {variant === "gauge" ? (
        <div className="hover-gauge-layout">
          <div className="hover-gauge">
            <div
              className="hover-gauge-ring"
              style={{
                background: `conic-gradient(var(--theme-500) 0deg ${
                  activeItem.value * 3.6
                }deg, var(--theme-100) ${activeItem.value * 3.6}deg 360deg)`,
              }}
            >
              <div className="hover-gauge-core">
                <strong>{activeItem.value}%</strong>
                <span>{activeItem.label}</span>
              </div>
            </div>
          </div>
          <div className="hover-gauge-list">
            {data.map((item, index) => (
              <button
                className={`hover-gauge-item ${activeIndex === index ? "active" : ""}`}
                key={item.label}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                type="button"
              >
                <span>{item.label}</span>
                <strong>{item.value}%</strong>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
