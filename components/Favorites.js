import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ImBin } from "react-icons/im"
import { BiWindowOpen } from "react-icons/bi"
import { handleSession } from "../lib/weather_utils.js"

function Favorites() {
	const [favorites, setFavorites] = useState()
	const [deleteFavorite, setDeleteFavorite] = useState(0)

	// UseEffect to make sure window is run in the Browser
	useEffect(() => {
		if (deleteFavorite === 0) return
		const urls = []
		favorites.forEach(favorite => {
			urls.push(favorite.url)
		})
		handleSession("favorite", urls.toString())
		setDeleteFavorite(0)
	}, [deleteFavorite, favorites])

	useEffect(() => {
		const session = window.sessionStorage.getItem("favorite")
		const formattedPlaces = []
		if (typeof session == null) return
		if (session && session !== "") {
			const places = session.split(",")
			places.forEach(place => {
				const location = place.split("_")
				const country = location[1].split("=")
				const coord = country[1].split("+")
				formattedPlaces.push({
					location: location[0].replaceAll("-", " "),
					country: country[0].replaceAll("-", " "),
					lat: coord[0],
					lng: coord[1],
					url: place,
				})
			})
		}
		setFavorites(formattedPlaces)
	}, [])
	function handleRemoveFavorite(selected) {
		const newFavorites = favorites.filter(favorite => favorite !== selected)
		setDeleteFavorite(deleteFavorite + 1)
		setFavorites(newFavorites)
	}

	return (
		<div>
			{favorites &&
				favorites.map(fav => (
					<div key={fav.place} className='flex justify-start p-5'>
						<h3 className='capitalize text-lg sm:text-2xl text-cyan-600'>
							{fav.location}
							<span className='uppercase mx-5 text-xs sm:text-sm text-cyan-500'>
								{fav.country}
							</span>
						</h3>
						<Link href={`/location/${fav.url}`} scroll={false}>
							<a className='mr-6 ml-5 sm:mr-10 hover:text-orange-400'>
								<BiWindowOpen className='mt-2 sm:mt-3' />
							</a>
						</Link>
						<div
							onClick={() => handleRemoveFavorite(fav)}
							className='mr-6 ml-5 sm:mr-10 hover:text-red-400  cursor-pointer'>
							<ImBin className='mt-2 sm:mt-3' />
						</div>
					</div>
				))}
			{!favorites ||
				(favorites && favorites.length === 0 && (
					<p className='ml-8 text-lg text-cyan-600 dark:text-cyan-200 p-6'>
						You don&apos;t have any favorite yet ...
					</p>
				))}
		</div>
	)
}

export default Favorites
