import Layout from "../components/Layout"
import Favorites from "../components/Favorites"

function myFavorites() {
	return (
		<Layout page={"EZY Weather - My Favorites"}>
			<div className='flex justify-center'>
				<div className='w-3/4 border-2 border-cyan-600 rounded-lg bg-white'>
					<h2 className='bg-cyan-600 rounded-t-sm text-5xl pb-5 text-sky-100 text-center capitalize font-thin tracking-widest pt-5'>
						MY FAVORITE PLACES :
					</h2>
					<Favorites />
				</div>
			</div>
		</Layout>
	)
}

export default myFavorites
