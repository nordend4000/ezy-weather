import Layout from "../components/Layout"
import FamousPlaces from "../components/FamousPlaces"

export default function Home() {
	return (
		<Layout page={"EZY Weather - Home"}>
			<div className='container'>
				<FamousPlaces />
			</div>
		</Layout>
	)
}
