import React, { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import NavBar from "./NavBar.js"
import Footer from "./Footer.js"
import SearchBox from "./SearchBox"

import { useRouter } from "next/router"
import { SiOpenstreetmap } from "react-icons/si"
import { motion } from "framer-motion"

const variants = {
	hidden: { opacity: 0, x: -400, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 200, y: 0 },
}

export default function Layout({ children, page }) {
	const [openSearch, setOpenSearch] = useState(false)
	const [render, setRender] = useState(true)
	const router = useRouter()

	useEffect(() => {
		if (
			router.asPath === "/map" ||
			router.asPath === "/search" ||
			router.asPath === "/about"
		) {
			setRender(false)
		}
	}, [router])

	useEffect(() => {
		if (!openSearch) return
		const scrollBottom = document.getElementById("layout-ctn")
		scrollBottom.scrollTop = scrollBottom.scrollHeight
	}, [openSearch])
	return (
		<div
			className='flex flex-col h-screen justify-between  overflow-x-hidden'
			id='layout-ctn'>
			<Head>
				<title>{page}</title>
			</Head>
			<NavBar />

			<motion.main
				key={page}
				initial='hidden'
				animate='enter'
				exit='exit'
				variants={variants}
				transition={{ type: "linear" }}
				className=' bg-cyan-50 dark:bg-cyan-900 flex-grow'>
				{render && (
					<div className='bg-cyan-50 dark:bg-cyan-900 flex justify-evenly content-center py-3 sm:py-7'>
						<div className='w-1/2 lg:w-3/6 ml-2'>
							<SearchBox placeholder='Search for a new location...' />
						</div>
						<div className='w-1/2 lg:w-2/6 text-center self-center mt-2'>
							<Link href='/search'>
								<a className='bg-orange-200 dark:bg-cyan-800 font-regular lg:font-thin text-xs sm:text-base lg:text-2xl py-2 sm:py-3 px-3 sm:px-8 text-orange-700 dark:text-cyan-200 dark:border-cyan-200 border border-orange-700 uppercase tracking-widest rounded-lg hover:dark:bg-cyan-900 hover:dark:text-cyan-600 hover:dark:border-cyan-600 hover:bg-cyan-50 hover:border-orange-500 hover:text-orange-500 transition ease-in duration-200  shadow-lg hover:shadow-none '>
									<SiOpenstreetmap className='inline mr-2 sm:mr-5' />
									Searching Map
								</a>
							</Link>
						</div>
					</div>
				)}
				{children}
			</motion.main>
			<Footer openSearch={openSearch} setOpenSearch={setOpenSearch} />
		</div>
	)
}
