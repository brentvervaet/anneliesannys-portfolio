/**
 * Performance optimization utilities
 */

/**
 * Throttle function execution to improve performance
 * Ensures function is called at most once per specified time period
 */
export const throttle = <T extends (...args: unknown[]) => void>(
	func: T,
	limit: number,
): ((...args: Parameters<T>) => void) => {
	let inThrottle: boolean
	return function (this: unknown, ...args: Parameters<T>) {
		if (!inThrottle) {
			func.apply(this, args)
			inThrottle = true
			setTimeout(() => (inThrottle = false), limit)
		}
	}
}

/**
 * Request animation frame throttle for smooth scroll handlers
 */
export const rafThrottle = <T extends (...args: unknown[]) => void>(
	func: T,
): ((...args: Parameters<T>) => void) => {
	let rafId: number | null = null
	return function (this: unknown, ...args: Parameters<T>) {
		if (rafId === null) {
			rafId = requestAnimationFrame(() => {
				func.apply(this, args)
				rafId = null
			})
		}
	}
}
