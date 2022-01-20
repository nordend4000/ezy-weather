import React from "react"
import Layout from "../components/Layout"
import { SiNextdotjs } from "react-icons/si"
import { SiLeaflet } from "react-icons/si"
import { SiTailwindcss } from "react-icons/si"
import { SiOpenstreetmap } from "react-icons/si"
import { TiWeatherPartlySunny } from "react-icons/ti"
import { GiFluffyCloud } from "react-icons/gi"

export default function About() {
	return (
		<Layout page={"EZY Weather - About"}>
			<div className='p-3 w-full sm:w-2/3 mx-auto text-cyan-600 leading-9 my-8 dark:text-cyan-200'>
				<GiFluffyCloud className='mr-3 lg:mr-8 text-6xl text-orange-300 dark:text-orange-200 float-left ' />
				<p>
					Hi there, I&apos;m{" "}
					<a
						className='font-bold hover:underline hover:text-orange-300 dark:text-cyan-100'
						href='https://romaingioux.dev'>
						Romain GIOUX{" "}
					</a>
					an inspired self-taught Web Developer based in Zurich, Switzerland. I
					love discovering new technologies and Solving Digital Puzzles. Aiming
					for a career reconversion, I have past the last 2 years learning how
					the Web is Built and how I can contribute in make it a Pleasant Space.
					My challenge is to turn this enthusiasm and commitment into a
					professional activity, gain experience by Creating Complex Projects
					and join an Ambitious Team.
				</p>
				<div className='flex justify-evenly mt-3 text-orange-400 text-3xl py-3 dark:text-orange-200'>
					<SiNextdotjs />
					<SiLeaflet /> <SiTailwindcss />
					<SiOpenstreetmap /> <TiWeatherPartlySunny />
				</div>
				<p className='mt-4 mx-auto text-cyan-600 dark:text-cyan-200 leading-9 '>
					I created this project using fun technologies such as{" "}
					<a href='https://nextjs.org' className='hover:underline '>
						{" "}
						<b>Next.js</b>
					</a>
					,{" "}
					<a href='https://tailwindcss.com' className='hover:underline'>
						{" "}
						<b>Tailwind CSS</b>
					</a>
					,{" "}
					<a href='https://leafletjs.com' className='hover:underline'>
						{" "}
						<b>Leafletjs</b>
					</a>
					,{" "}
					<a href='https://react-leaflet.js.org' className='hover:underline'>
						{" "}
						<b>React Leaflet</b>
					</a>
					,{" "}
					<a
						href='https://ricostacruz.com/nprogress/'
						className='hover:underline'>
						{" "}
						<b>NProgress</b>
					</a>
					, and{" "}
					<a href='https://sweetalert.js.org' className='hover:underline'>
						{" "}
						<b>SweetAlert</b>
					</a>{" "}
					.
				</p>
				<p className='mt-4 mx-auto text-cyan-600 dark:text-cyan-200 leading-9 '>
					Thanks to{" "}
					<a href='https://openweathermap.org' className='hover:underline'>
						{" "}
						<b>Open Weather Map</b>
					</a>{" "}
					for the weather data and{" "}
					<a href='https://openweathermap.org' className='hover:underline'>
						{" "}
						<b>Open Street Map</b>
					</a>{" "}
					for the map&apos;s layer.
				</p>
				<div className='flex justify-evenly mt-3 text-xs sm:text-base text-center'>
					<a
						href='https://romaingioux.dev'
						className='mt-4 mx-auto text-cyan-600 dark:text-cyan-200 sm:leading-9 font-light border rounded-lg border-cyan-600 dark:border-cyan-200 px-2 sm:px-7 py-1 sm:py-3 hover:bg-cyan-600 dark:hover:bg-cyan-800 hover:text-white transition ease-in duration-200 '>
						VISIT MY PORTFOLIO
					</a>
					<a
						href='https://romaingioux.dev/contact'
						className='mt-4 mx-auto text-cyan-600 dark:text-cyan-200 sm:leading-9 font-light border rounded-lg  border-cyan-600 dark:border-cyan-200 px-2 sm:px-7 py-1 sm:py-3 hover:bg-cyan-600 dark:hover:bg-cyan-800 hover:text-white transition ease-in duration-200 '>
						{" "}
						GET IN TOUCH
					</a>
				</div>
			</div>
		</Layout>
	)
}
