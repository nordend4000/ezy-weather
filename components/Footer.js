import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { GiFluffyCloud } from "react-icons/gi"
import SearchBox from "./SearchBox"
import { FaSearchLocation } from "react-icons/fa"

function Footer({ openSearch, setOpenSearch }) {
	const router = useRouter()
	const [render, setRender] = useState(true)
	useEffect(() => {
		if (router.asPath === "/map") setRender(false)
	}, [router.asPath])
	return (
		<>
			{openSearch && (
				<div className='p-1 bg-cyan-600'>
					<SearchBox placeholder={"Search for a new location ..."} />
				</div>
			)}
			<div className='flex justify-around py-5 bg-cyan-600 text-center'>
				<div className='basis-1/3 border border-cyan-600 flex ml-4'>
					<GiFluffyCloud className='mr-4 mt-2 text-2xl text-cyan-200  ' />
					<h1 className='pt-2'>
						<span className='text-lg text-cyan-200 tracking-widest '>
							EZY WEATHER
						</span>
						<span className='text-sm ml-3 italic text-cyan-300 tracking-widest '>
							- Copyright 2022
						</span>
					</h1>
				</div>
				<div className='mt-3 basis-2/3 w-full  text-orange-300 text-l flex flex-row justify-around'>
					<Link href='/'>
						<a className='mr-10  hover:text-orange-400'>HOME</a>
					</Link>
					<Link href='/map'>
						<a className='mr-10  hover:text-orange-400'>WEATHER MAP</a>
					</Link>
					<Link href='/my-favorites'>
						<a className='mr-10 hover:text-orange-400'>MY FAVORITES</a>
					</Link>
					<Link href='/about'>
						<a className='mr-10 hover:text-orange-400'>ABOUT</a>
					</Link>
					{render ? (
						<span
							className='cursor-pointer'
							onClick={() => setOpenSearch(!openSearch)}>
							<FaSearchLocation className='mr-3 text-xl' />
						</span>
					) : (
						<Link href='/home'>
							<a>
								<FaSearchLocation className='mr-3 text-xl' />
							</a>
						</Link>
					)}
				</div>
			</div>
		</>
	)
}

export default Footer
