// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	srcDark: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
}

export const configData: Config = {
	siteTitle:
		'Russel — self-hosted microVM & container deployment platform',
	siteDescription:
		'Russel boots services as hardware-isolated microVMs in under 2 seconds, or as fast immutable containers. Self-hosted, zero-drift, no lock-in.',
	ogImage: '/og.jpg',
	logo: {
		src: '/logo-light.svg',
		srcDark: '/logo-dark.svg',
		alt: 'Russel logo'
	},
	canonical: true,
	noindex: false,
	mode: 'dark',
	scrollAnimations: true
}
