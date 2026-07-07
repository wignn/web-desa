'use client'

import { useState } from 'react'

type BudgetItem = {
  id: string
  label: string
  value: string
  description?: string
}

export function BudgetDonutChart({ items }: { items: BudgetItem[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // Parse string values into numbers
  const parseNumber = (valStr: string) => {
    const clean = valStr.replace(/[^0-9]/g, '')
    const parsed = parseInt(clean, 10)
    return isNaN(parsed) ? 0 : parsed
  }

  const parsedItems = items.map((item) => ({
    ...item,
    numValue: parseNumber(item.value),
  }))

  const totalNum = parsedItems.reduce((acc, curr) => acc + curr.numValue, 0)

  // If no numeric values exist, fallback to mock proportions for visual rendering
  const hasData = totalNum > 0
  const chartData = parsedItems.map((item, idx) => {
    const share = hasData ? item.numValue / totalNum : 1 / items.length
    return {
      ...item,
      share,
      percentage: Math.round(share * 100),
    }
  })

  // Format currency value helper
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num)
  }

  // Segment colors (matching premium emerald style)
  const colors = [
    'stroke-emerald-800 fill-none', // Primary
    'stroke-emerald-500 fill-none', // Secondary
    'stroke-lime-500 fill-none',    // Tertiary
    'stroke-teal-500 fill-none',    // 4th if any
    'stroke-emerald-300 fill-none', // 5th if any
  ]

  const hoverColors = [
    'stroke-emerald-900',
    'stroke-emerald-600',
    'stroke-lime-600',
    'stroke-teal-600',
    'stroke-emerald-400',
  ]

  const fillColors = [
    'bg-emerald-800',
    'bg-emerald-500',
    'bg-lime-500',
    'bg-teal-500',
    'bg-emerald-300',
  ]

  // Donut SVG layout details
  const size = 260
  const radius = 80
  const strokeWidth = 22
  const center = size / 2
  const circumference = 2 * Math.PI * radius

  let accumulatedPercentage = 0

  return (
    <div className="flex flex-col items-center justify-center p-4 text-emerald-950">
      <div className="relative size-[260px]">
        {/* SVG Donut */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 transform select-none"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="stroke-neutral-100 fill-none"
            strokeWidth={strokeWidth}
          />

          {/* Data segments */}
          {chartData.map((item, idx) => {
            const strokeDasharray = `${item.share * circumference} ${circumference}`
            const strokeDashoffset = -((accumulatedPercentage / 100) * circumference)
            accumulatedPercentage += item.share * 100

            const isHovered = hoveredIdx === idx
            const colorClass = isHovered
              ? hoverColors[idx % hoverColors.length]
              : colors[idx % colors.length]

            return (
              <circle
                key={item.id}
                cx={center}
                cy={center}
                r={radius}
                className={`transition-all duration-300 cursor-pointer ${colorClass}`}
                strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            )
          })}
        </svg>

        {/* Center Text Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
          {hoveredIdx !== null ? (
            <>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-emerald-700 w-44 truncate">
                {chartData[hoveredIdx].label}
              </p>
              <p className="mt-1.5 text-base font-black text-emerald-950 leading-tight w-44 truncate">
                {chartData[hoveredIdx].value}
              </p>
              {hasData && (
                <p className="mt-1 text-xs font-semibold text-emerald-800">
                  {chartData[hoveredIdx].percentage}% dari total
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-emerald-700">
                Transparansi Anggaran
              </p>
              <p className="mt-1.5 text-lg font-black text-emerald-950 leading-none">
                {hasData ? formatCurrency(totalNum) : '2026'}
              </p>
              <p className="mt-1.5 text-[0.6rem] font-bold text-emerald-950/50">
                {hasData ? 'Total APBDes' : 'Arahkan kursor untuk info'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Legend list below */}
      <div className="mt-6 grid w-full gap-2 text-xs">
        {chartData.map((item, idx) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`flex items-center justify-between rounded-xl px-3 py-2 border transition-all duration-200 cursor-pointer ${
              hoveredIdx === idx
                ? 'border-emerald-700/20 bg-emerald-50/50 scale-[1.01]'
                : 'border-transparent hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`size-3 shrink-0 rounded-md ${fillColors[idx % fillColors.length]}`} />
              <span className="font-bold text-emerald-950 truncate">{item.label}</span>
            </div>
            <span className="font-extrabold text-emerald-800 shrink-0 ml-2">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
