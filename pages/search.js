import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SearchBox from "../components/SearchBox"
import { SiOpenstreetmap } from "react-icons/si"
import dynamic from "next/dynamic"

const SearchMap = dynamic(() => import("../components/SearchMap"), {
	ssr: false,
})

function Search() {
	const [isBrowser, setIsBrowser] = useState(false)

	useEffect(() => {
		setIsBrowser(true)
	}, [])
	return (
		<Layout page={"EZY Weather - Search"}>
			<div className='flex justify-center mt-4'>
				<SiOpenstreetmap className='text-lg sm:text-3xl text-orange-400 dark:text-orange-300' />
			</div>
			<div className='my-1 sm:my-10 text-center text-base sm:text-2xl text-orange-400 dark:text-orange-300 px-4 uppercase tracking-widest font-light'>
				Search any place in the world among billion of location.
			</div>
			<div className='w-3/4 mx-auto'>
				<SearchBox placeholder='Search for a new location...' />
			</div>
			<div className='my-1 sm:my-6 mt-2 sm:mt-8 text-center text-xs sm:text-sm text-cyan-600 dark:text-orange-300 w-3/4 mx-auto'>
				Just enter your search above and click on one of the suggestions listed.
			</div>
			<div className='my-1 sm:my-6 text-center text-xs sm:text-sm text-cyan-600 dark:text-orange-300 px-2'>
				Or browse the map below and click on your desired location ...
			</div>
			<h2 className='bg-cyan-50 dark:bg-cyan-900 dark:text-cyan-200 rounded-t-sm text-xl sm:text-3xl py-3 sm:py-5 sm:px-3 text-cyan-600 text-center capitalize font-thin tracking-widest '>
				<b>SEARCHING MAP : </b>{" "}
				<span className='text-sm block sm:inline sm:text-2xl mt-2 '>
					CLICK TO GET THE WEATHER ANYWHERE IN THE WORLD
				</span>
			</h2>
			{isBrowser && <SearchMap />}
		</Layout>
	)
}

export default Search
