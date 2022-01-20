import React, { useEffect, useState } from "react"
import Link from "next/link"
import SearchBox from "./SearchBox"
import { useRouter } from "next/router"
import { GiFluffyCloud } from "react-icons/gi"
import { FaSearchLocation } from "react-icons/fa"

function Footer({ openSearch, setOpenSearch }) {
	const router = useRouter()
	const [render, setRender] = useState(true)

	useEffect(() => {
		if (router.asPath === "/map") setRender(false)
	}, [router.asPath])

	return (
		<footer>
			{openSearch && (
				<div className=' bg-cyan-600 dark:bg-cyan-800 pt-3'>
					<SearchBox placeholder={"Search for a new location ..."} />
				</div>
			)}
			<div className='lg:flex justify-around py-3 bg-cyan-600 dark:bg-cyan-800 text-center'>
				<div className='lg:basis-1/3 border border-cyan-600 dark:border-cyan-800 flex ml-4  justify-center'>
					<GiFluffyCloud className='mr-4 mt-2 text-2xl text-cyan-200  ' />
					<h1 className='pt-2'>
						<span className='text-base text-cyan-200 tracking-widest sm:text-lg'>
							EZY WEATHER
						</span>
						<span className='text-xs ml-3 italic text-cyan-300 tracking-widest lg:text-md'>
							- Copyright 2022
						</span>
					</h1>
				</div>
				<nav className='mt-3 md:basis-2/3 w-full  text-orange-300 text-l flex flex-row justify-around'>
					<Link href='/' scroll={false}>
						<a className='mr-1  text-xs md:text-sm hover:text-orange-400'>
							HOME
						</a>
					</Link>
					<Link href='/map' scroll={false}>
						<a className='mr-1  text-xs md:text-sm hover:text-orange-400'>
							WEATHER MAPS
						</a>
					</Link>
					<Link href='/my-favorites' scroll={false}>
						<a className='mr-1  text-xs md:text-sm hover:text-orange-400'>
							MY FAVORITES
						</a>
					</Link>
					<Link href='/about' scroll={false}>
						<a className='mr-1  text-xs md:text-sm hover:text-orange-400'>
							ABOUT
						</a>
					</Link>
					{render ? (
						<span
							className='cursor-pointer'
							onClick={() => setOpenSearch(!openSearch)}>
							<FaSearchLocation className='mr-1 text-xs' />
						</span>
					) : (
						<Link href='/home' scroll={false}>
							<a>
								<FaSearchLocation className='mr-3 text-xs' />
							</a>
						</Link>
					)}
				</nav>
			</div>
		</footer>
	)
}

export default Footer
