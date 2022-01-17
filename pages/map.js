import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
//import RenderLayer from "../components/RenderLayer"
import dynamic from "next/dynamic"

const RenderLayer = dynamic(() => import("../components/RenderLayer"), {
	ssr: false,
})

export default function Map() {
	const [isBrowser, setIsBrowser] = useState(false)
	useEffect(() => {
		setIsBrowser(true)
	}, [])

	return (
		<Layout page={"EZY Weather - Maps"}>
			<div className='flex justify-center'>{isBrowser && <RenderLayer />}</div>
		</Layout>
	)
}
