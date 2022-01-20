import React, { useEffect } from "react"
import NProgress from "nprogress"
import Script from "next/script"
import Router from "next/router"
import { AnimatePresence } from "framer-motion"
import { ThemeProvider } from "next-themes"
import "../styles/globals.css"
import "../styles/nprogress.css"
import "../styles/legend.css"
import "../styles/alert.css"

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const start = () => NProgress.start()
		const end = () => NProgress.done()

		Router.events.on("routeChangeStart", start)
		Router.events.on("routeChangeComplete", end)
		Router.events.on("routeChangeError", end)

		return () => {
			Router.events.off("routeChangeStart", start)
			Router.events.off("routeChangeComplete", end)
			Router.events.off("routeChangeError", end)
		}
	}, [])

	return (
		<>
			{" "}
			<AnimatePresence
				exitBeforeEnter
				initial={false}
				onExitComplete={() => window.scrollTo(0, 0)}>
				<ThemeProvider attribute='class'>
					<Component {...pageProps} />
				</ThemeProvider>
			</AnimatePresence>
			<Script
				strategy='beforeInteractive'
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY_AUTOCOMPLETE}&libraries=places&language=en`}
			/>
			<Script
				strategy='beforeInteractive'
				src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
			/>
		</>
	)
}

export default MyApp
