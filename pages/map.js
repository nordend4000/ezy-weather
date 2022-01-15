import React from "react"
import Layout from "../components/Layout"
import RenderLayer from "../components/RenderLayer"
export default function Map() {
	return (
		<Layout page={"EZY Weather - Maps"}>
			<div className='flex justify-center'>
				<RenderLayer />
			</div>
		</Layout>
	)
}
