import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { handleSession } from "../lib/weather_utils.js"
import { BsHeartFill } from "react-icons/bs"
import { BsHeart } from "react-icons/bs"
import { IoSyncSharp } from "react-icons/io5"

function IsFavorite({ url }) {
	const [favorites, setFavorites] = useState()
	const [isFavorite, setIsFavorite] = useState(false)
	const [hovered1, setHovered1] = useState(false)
	const [hovered2, setHovered2] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const sessionFav = window.sessionStorage.getItem("favorite")
		if (sessionFav == null || sessionFav === "") return
		if (sessionFav) {
			setFavorites(sessionFav.split(","))
		}
	}, [])
	useEffect(() => {
		if (favorites && favorites.includes(url)) setIsFavorite(true)
		else setIsFavorite(false)
	}, [favorites, url])

	const handleAddToFavorite = () => {
		if (typeof window !== "undefined") {
			const sessionFav = window.sessionStorage.getItem("favorite")
			const favoriteToUpdate = []
			if (
				sessionFav === null ||
				typeof favorites === "undefined" ||
				(favorites && !favorites.includes(url))
			) {
				if (sessionFav != null && sessionFav !== "") {
					sessionFav.split(",").forEach(favorite => {
						favoriteToUpdate.push(favorite)
					})
				}
				favoriteToUpdate.push(url)
				handleSession("favorite", favoriteToUpdate.toString())
				setFavorites(favoriteToUpdate)
			}
		}
	}
	// (typeof window !== "undefined") to make sure window is run in the Browser
	const handleRemoveFromFavorite = () => {
		if (typeof window !== "undefined") {
			const newFavorites = favorites.filter(favorite => favorite !== url)
			const urls = []
			newFavorites.forEach(favorite => {
				urls.push(favorite)
			})
			handleSession("favorite", urls.toString())
			setFavorites(urls)
		}
	}
	const reloadPage = () => {
		router.push(router.asPath)
	}

	return (
		<div className='w-full mx-auto flex justify-center sm:pt-1 '>
			<div
				className='text-xl text-orange-700 dark:text-orange-300 cursor-pointer hover:text-orange-400 dark:hover:text-orange-400 pt-1  w-full'
				onMouseEnter={() => setHovered1(true)}
				onMouseLeave={() => setHovered1(false)}>
				{isFavorite ? (
					<div className='flex justify-center'>
						<BsHeartFill onClick={handleRemoveFromFavorite} />
					</div>
				) : (
					<div className='flex justify-center'>
						<BsHeart onClick={handleAddToFavorite} />
					</div>
				)}
				<div
					className={`text-center sm:ml-3 text-xs text-orange-300 px-3 py-2 mt-1 bg-orange-50 dark:bg-cyan-900 rounded-xl ${
						!hovered1 ? "hidden" : "block"
					}`}>
					{!isFavorite ? "Add Favorite" : "Remove Favorite"}
				</div>
			</div>
			<div
				className='text-2xl text-orange-700 dark:text-orange-300 cursor-pointer hover:text-orange-400 dark:hover:text-orange-400  w-full'
				onMouseEnter={() => setHovered2(true)}
				onMouseLeave={() => setHovered2(false)}>
				<div className='flex justify-center'>
					{" "}
					<IoSyncSharp onClick={reloadPage} />
				</div>
				<div
					className={`text-center sm:ml-3 text-xs text-orange-300 px-3 py-2 mt-1 bg-orange-50 dark:bg-cyan-900 rounded-xl ${
						!hovered2 ? "hidden" : "block"
					}`}>
					Update weather
				</div>
			</div>
		</div>
	)
}

export default IsFavorite
