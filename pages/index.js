import Layout from "../components/Layout"
import FamousPlaces from "../components/FamousPlaces"
import Link from "next/link"
import { GiFluffyCloud } from "react-icons/gi"

export default function Home() {
	return (
		<Layout page={"EZY Weather - Home"}>
			<>
				<div className='flex flex-col mt-10'>
					<div className='text-center p-2 md:p-0 text-lg sm:text-2xl mx-auto uppercase text-orange-400  sm:leading-9 font-light tracking-wider'>
						<GiFluffyCloud className='inline mr-5 text-3xl ' />
						<b>EZY WEATHER MAP : </b>
						<span className='block md:inline mt-2 md:mt-0 text-orange-300'>
							Latest forcast directly on the map.
						</span>
					</div>
					<div className='text-center p-3 text-sm sm:text-xl mx-auto uppercase text-orange-500 sm:leading-9 font-light tracking-widest'>
						Precipitation, Wind, Clouds, Pressure, Temperatures.{" "}
					</div>
					<Link href='/map' scroll={false}>
						<a className='cursor-pointer mt-3 text-center w-2/3 py-1 sm:w-2/6 mx-auto uppercase dark:bg-cyan-800 dark:hover:bg-cyan-900 shadow-lg text-cyan-600 dark:text-cyan-200 sm:leading-9 font-light border rounded-lg  border-cyan-600 dark:border-cyan-200  hover:bg-cyan-600 dark:hover:text-cyan-600 dark:hover:border-cyan-600 hover:text-white transition ease-in duration-200 hover:shadow-none'>
							<GiFluffyCloud className='inline mr-3' />
							Weather mapS
						</a>
					</Link>
				</div>

				<FamousPlaces />
			</>
		</Layout>
	)
}
