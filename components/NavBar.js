import React from "react"
import Link from "next/link"
import ActiveLink from "./ActiveLink.js"
import { FaSearchLocation } from "react-icons/fa"
import { GiFluffyCloud } from "react-icons/gi"

function NavBar() {
	return (
		<nav
			className='w-full flex justify-between py-5 bg-cyan-600'
			style={{ height: "12vh" }}>
			<div className='ml-10  text-2xl tracking-wider group '>
				<Link href='/'>
					<a className='border border-cyan-600 flex '>
						<GiFluffyCloud className='mr-8 text-4xl text-cyan-200 group-hover:text-cyan-300 transition ease-in duration-200 ' />
						<h1 className='flex'>
							<span className='font-mono text-3xl italic text-orange-200  group-hover:text-cyan-100 transition ease-in duration-200 '>
								EZY{" "}
							</span>
							<span className=' ml-2 pt-2 text-sm text-orange-300 border-b border-cyan-600 group-hover:text-cyan-200 group-hover:border-orange-300 p-2 transition ease-in duration-200 '>
								WEATHER
							</span>
						</h1>
					</a>
				</Link>
			</div>
			<div className='flex flex-row mr-12 text-cyan-100 text-lg tracking-widest  text-center'>
				<ActiveLink href='/'>HOME</ActiveLink>
				<ActiveLink href='/map'>WEATHER MAPS</ActiveLink>
				<ActiveLink href='/my-favorites'>MY FAVORITES</ActiveLink>
				<ActiveLink href='/about'>ABOUT</ActiveLink>
				<ActiveLink href='/' className='cursor-pointer'>
					<FaSearchLocation />
				</ActiveLink>
			</div>
		</nav>
	)
}

export default NavBar
