import React, { useState, useEffect } from "react"
import Link from "next/link"
import ActiveLink from "./ActiveLink"
import ToggleMode from "./ToggleMode"
import { AnimatePresence, motion, useCycle } from "framer-motion"
import { FaSearchLocation } from "react-icons/fa"
import { GiFluffyCloud } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai"

const Mobile_Links = [
	{ name: "HOME", to: "/", id: 1 },
	{ name: "WEATHER MAPS", to: "/map", id: 2 },
	{ name: "MY FAVORITES", to: "/my-favorites", id: 3 },
	{ name: "ABOUT", to: "/about", id: 4 },
	{ name: <FaSearchLocation />, to: "/search", id: 5 },
	{ name: "ToggleMode", to: "", id: 6 },
]

const itemVariants = {
	closed: {
		opacity: 0,
	},
	open: { opacity: 1 },
}

const sideVariants = {
	closed: {
		transition: {
			staggerChildren: 0.25,
			staggerDirection: -1,
		},
	},
	open: {
		transition: {
			staggerChildren: 0.25,
			staggerDirection: 1,
		},
	},
}

function NavBar() {
	const [width, setWidth] = useState()
	const [open, cycleOpen] = useCycle(false, true)

	const checkWidth = () => {
		if (window.innerWidth >= 768) setWidth(true)
		else setWidth(false)
	}
	if (typeof window !== "undefined") {
		window.addEventListener("resize", checkWidth)
	}
	useEffect(() => {
		if (window.innerWidth >= 768) setWidth(true)
		else setWidth(false)
	}, [])

	return (
		<header>
			<div
				className='w-full flex justify-between py-5 bg-cyan-600 dark:bg-cyan-800'
				style={{ height: "12vh" }}>
				<div className='ml-2 lg:ml-10 tracking-wider group '>
					<Link href='/' scroll={false}>
						<a className='border border-cyan-600 dark:border-cyan-800 flex '>
							<GiFluffyCloud className='mr-3 lg:mr-8 text-4xl text-cyan-200 group-hover:text-cyan-300 transition ease-in duration-200 ' />
							<div className='flex'>
								<span className='font-mono pt-1 text-lg lg:text-3xl italic text-orange-200  group-hover:text-cyan-100 transition ease-in duration-200 '>
									EZY{" "}
								</span>
								<span className=' lg:ml-2 lg:pt-2 text-sm text-orange-300 border-b border-cyan-600 group-hover:text-cyan-200 group-hover:border-orange-300 p-2 transition ease-in duration-200 '>
									WEATHER
								</span>
							</div>
						</a>
					</Link>
				</div>
				{!width ? (
					!open ? (
						<div
							className='p-2 mr-3 space-y-2 bg-cyan-600 dark:bg-cyan-800 group cursor-pointer '
							onClick={cycleOpen}>
							<span className='block w-8 h-0.5 bg-cyan-200 group-hover:bg-orange-200 transition ease-in duration-200 '></span>
							<span className='block w-8 h-0.5 bg-cyan-200 group-hover:bg-orange-200 transition ease-in duration-200 '></span>
							<span className='block w-8 h-0.5 bg-cyan-200 group-hover:bg-orange-200 transition ease-in duration-200 '></span>
						</div>
					) : (
						<div
							className='p-2 mr-3 space-y-2 bg-cyan-600 dark:bg-cyan-800 group cursor-pointer text-3xl text-cyan-200 '
							onClick={cycleOpen}>
							<AiOutlineClose className=' hover:text-orange-200 transition ease-in duration-200' />
						</div>
					)
				) : (
					<nav className='flex flex-row  text-cyan-100 sm:mr-5 lg:mr-10 sm:text-base lg:text-lg tracking-widest text-center'>
						<ActiveLink href='/'>HOME</ActiveLink>
						<ActiveLink href='/map'>WEATHER MAPS</ActiveLink>
						<ActiveLink href='/my-favorites'>MY FAVORITES</ActiveLink>
						<ActiveLink href='/about'>ABOUT</ActiveLink>
						<div className='pt-1'>
							<ActiveLink href='/search'>
								<FaSearchLocation />
							</ActiveLink>
						</div>
						<ToggleMode />
					</nav>
				)}
			</div>
			<AnimatePresence>
				{!width && open && (
					<motion.div
						initial={{ width: 0 }}
						animate={{
							width: "100%",
						}}
						exit={{
							width: 0,
							transition: { delay: 1.4, duration: 0.2 },
						}}>
						<motion.div
							className='flex flex-col text-center bg-cyan-600 dark:bg-cyan-800 text-cyan-300 text-lg tracking-widest'
							initial='closed'
							animate='open'
							exit='closed'
							variants={sideVariants}>
							{Mobile_Links.map(el => (
								<motion.nav
									className='pb-10  mx-auto'
									key={el.id}
									whileHover={{ scale: 1.1 }}
									variants={itemVariants}>
									{el.id === 6 ? (
										<span onClick={cycleOpen}>
											<ToggleMode />
										</span>
									) : (
										<ActiveLink href={el.to}>{el.name}</ActiveLink>
									)}
								</motion.nav>
							))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	)
}

export default NavBar
