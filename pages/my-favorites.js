import Layout from "../components/Layout"
import Favorites from "../components/Favorites"

function myFavorites() {
	return (
		<Layout page={"EZY Weather - My Favorites"}>
			<div className='flex justify-center mt-8'>
				<div className='w-5/6 sm:w-3/4 border-2 border-cyan-600 rounded-lg bg-white dark:bg-cyan-900 dark:border-cyan-800'>
					<h2 className='bg-cyan-600 dark:bg-cyan-800 rounded-t-sm text-xl sm:text-5xl py-3 sm:py-5 text-cyan-50 text-center capitalize font-thin tracking-widest '>
						MY FAVORITE PLACES :
					</h2>
					<Favorites />
				</div>
			</div>
		</Layout>
	)
}

export default myFavorites
