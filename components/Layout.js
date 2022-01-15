import React, { useState, useEffect } from "react"
import Head from "next/head"
import NavBar from "./NavBar.js"
import Footer from "./Footer.js"
import SearchBox from "./SearchBox"

export default function Layout({ children, page }) {
	const [openSearch, setOpenSearch] = useState(false)

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
			<header className=''>
				<NavBar />
			</header>
			<div className='bg-cyan-50'>
				<SearchBox placeholder='Search for a new location...' />
			</div>
			<main className=' bg-cyan-50 flex-grow'>{children}</main>
			<footer>
				<Footer openSearch={openSearch} setOpenSearch={setOpenSearch} />
			</footer>
		</div>
	)
}
