/**
 * Web Vitals Performance Tracking
 * Tracks Core Web Vitals and sends to console (can be extended to analytics)
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'

type MetricName = 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB'

interface WebVitalsReport {
	name: MetricName
	value: number
	rating: 'good' | 'needs-improvement' | 'poor'
	delta: number
	id: string
}

/**
 * Format and report web vital metric
 */
const reportMetric = (metric: Metric): void => {
	const report: WebVitalsReport = {
		name: metric.name as MetricName,
		value: metric.value,
		rating: metric.rating,
		delta: metric.delta,
		id: metric.id,
	}

	// Log to console in development
	if (import.meta.env.DEV) {
		const color = report.rating === 'good' ? '🟢' : report.rating === 'needs-improvement' ? '🟡' : '🔴'
		console.log(`${color} ${report.name}: ${report.value.toFixed(2)}ms (${report.rating})`)
	}

	// In production, you could send to analytics service:
	// sendToAnalytics(report)
}

/**
 * Initialize Web Vitals tracking
 * Call this in main.ts to start tracking
 */
export const initWebVitals = (): void => {
	// Only track in browser environment
	if (typeof window === 'undefined') return

	// Track all Core Web Vitals
	onCLS(reportMetric) // Cumulative Layout Shift
	onFCP(reportMetric) // First Contentful Paint
	onINP(reportMetric) // Interaction to Next Paint (replaces FID)
	onLCP(reportMetric) // Largest Contentful Paint
	onTTFB(reportMetric) // Time to First Byte
}

/**
 * Web Vitals Thresholds
 * Source: https://web.dev/vitals/
 */
export const WEB_VITALS_THRESHOLDS = {
	LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
	INP: { good: 200, poor: 500 }, // Interaction to Next Paint (ms)
	CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift (score)
	FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
	TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
} as const
