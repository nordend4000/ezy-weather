import React from "react"
import Image from "next/image"
import Link from "next/link"
import { GiFluffyCloud } from "react-icons/gi"
import LondonImage from "../public/images/london.jpg"
import ParisImage from "../public/images/paris.jpg"
import TokyoImage from "../public/images/tokyo.jpg"
import NewYorkImage from "../public/images/new-york.jpg"
import SydneyImage from "../public/images/sydney.jpg"
import BuenosAiresImage from "../public/images/buenos-aires.jpg"
import ShanghaiImage from "../public/images/shanghai.jpg"
import CapeTownImage from "../public/images/cape-town.jpg"

const places = [
	{
		name: "London",
		image: LondonImage,
		url: "/location/london_united-kingdom=51.5072178+-0.1275862",
	},
	{
		name: "Paris",
		image: ParisImage,
		url: "/location/paris_france=48.856614+2.3522219",
	},
	{
		name: "Tokyo",
		image: TokyoImage,
		url: "/location/tokyo_japan=35.6761919+139.6503106",
	},
	{
		name: "New York",
		image: NewYorkImage,
		url: "/location/new-york_usa=40.7127753+-74.0059728",
	},
	{
		name: "Sydney",
		image: SydneyImage,
		url: "/location/sydney_australia=-33.8688197+151.2092955",
	},
	{
		name: "Buenos Aires",
		image: BuenosAiresImage,
		url: "/location/buenos-aires_argentina=-34.6036844+-58.3815591",
	},
	{
		name: "Shanghai",
		image: ShanghaiImage,
		url: "/location/shanghai_china=31.230416+121.473701",
	},
	{
		name: "Cape Town",
		image: CapeTownImage,
		url: "/location/cape-town_south-africa=-33.9248685+18.4240553",
	},
]

export default function FamousPlaces() {
	return (
		<div className='w-screen py-9 '>
			<div className='flex flex-row flex-wrap justify-around'>
				{places &&
					places.length > 0 &&
					places.map((place, index) => (
						<div className='flex justify-center w-1/6 m-6' key={index}>
							<Link href={place.url}>
								<a>
									<div className='shadow-xl bg-cyan-900 p-1 rounded-lg group'>
										<div className='text-xl text-cyan-50 text-center p-2 tracking-widest font-light uppercase'>
											{place.name}
										</div>
										<Image
											src={place.image}
											alt={`${place.name} Image`}
											width='200'
											height='200'
											objectFit='cover'
											className='rounded-sm  opacity-80 group-hover:opacity-100 transition ease-in duration-200 '
										/>
									</div>
									<button className='text-center shadow-xl p-2 mt-6 text-cyan-600 w-full text-xs  border border-cyan-500 rounded-sm hover:text-cyan-100 hover:bg-cyan-500 hover:shadow transition ease-in duration-200 '>
										<GiFluffyCloud className='inline mr-2 ' /> Weather in{" "}
										{place.name}
									</button>
								</a>
							</Link>
						</div>
					))}
			</div>
		</div>
	)
}
