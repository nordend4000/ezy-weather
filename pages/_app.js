import "../styles/globals.css"
import "../styles/nprogress.css"
import "../styles/legend.css"
import "../styles/alert.css"
import NProgress from "nprogress"
import React, { useEffect } from "react"
import Router from "next/router"
import Script from "next/script"

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
			<Component {...pageProps} />
			<Script
				strategy='beforeInteractive'
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY_AUTOCOMPLETE}&libraries=places&language=en`}
			/>
			<Script
				strategy='beforeInteractive'
				src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
				// integrity='sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=='
				// crossOrigin='anonymous'
			/>
		</>
	)
}

export default MyApp
