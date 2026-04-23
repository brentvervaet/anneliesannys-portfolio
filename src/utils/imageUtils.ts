/**
 * Utility functions for responsive image path handling
 */

/**
 * Get the medium-sized version of an image path
 * e.g., "/images/BA3/lbm01.webp" -> "/images/BA3/med/lbm01.webp"
 */
export const getMediumImagePath = (originalPath: string): string => {
	const pathParts = originalPath.split('/')
	const filename = pathParts.pop()
	return [...pathParts, 'med', filename].join('/')
}

/**
 * Get the small-sized version of an image path
 * e.g., "/images/BA3/lbm01.webp" -> "/images/BA3/sm/lbm01.webp"
 */
export const getSmallImagePath = (originalPath: string): string => {
	const pathParts = originalPath.split('/')
	const filename = pathParts.pop()
	return [...pathParts, 'sm', filename].join('/')
}

/**
 * Get the large-sized version of an image path
 * e.g., "/images/BA3/lbm01.webp" -> "/images/BA3/lg/lbm01.webp"
 */
export const getLargeImagePath = (originalPath: string): string => {
	const pathParts = originalPath.split('/')
	const filename = pathParts.pop()
	return [...pathParts, 'lg', filename].join('/')
}

/**
 * Get responsive image path based on window width
 */
export const getResponsiveImage = (imagePath: string, windowWidth: number): string => {
	if (windowWidth < 768) {
		return getSmallImagePath(imagePath)
	}
	return getMediumImagePath(imagePath)
}

/**
 * Extract number from image filename
 * e.g., "lbm01.webp" -> "01"
 */
export const extractImageNumber = (src: string): string => {
	const filename = src.split('/').pop() || ''
	const match = filename.match(/(\d+)/)
	return match?.[1]?.padStart(2, '0') || '01'
}
