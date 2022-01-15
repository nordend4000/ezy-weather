import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"

export default function SearchBox({ placeholder }) {
	const router = useRouter()
	const [render, setRender] = useState(true)
	const [query, setQuery] = useState("")
	const [coordinate, setCoordinate] = useState({
		lat: null,
		lng: null,
	})

	useEffect(() => {
		if (router.asPath === "/map") setRender(false)
	}, [router])

	const handleSelect = async value => {
		const results = await geocodeByAddress(value)
		const coord = await getLatLng(results[0])
		setQuery(value)
		setCoordinate(coord)
		let url = value.split(",")
		let countryArray = url.slice(-1)
		let country = countryArray[0].toLowerCase().trim()
		let place = url[0].replaceAll(" ", "-").toLowerCase()
		router.push(`/location/${place}_${country}=${coord.lat}+${coord.lng}`)
	}
	useEffect(() => {
		const clearQuery = () => setQuery("")
		router.events.on("routeChangeComplete", clearQuery)
		return () => {
			router.events.off("routeChangeComplete", clearQuery)
		}
	}, [router])

	return (
		<div className=''>
			{render && (
				<PlacesAutocomplete
					value={query}
					onChange={setQuery}
					onSelect={handleSelect}
					highlightFirstSuggestion>
					{({
						getInputProps,
						suggestions,
						getSuggestionItemProps,
						loading,
					}) => (
						<div
							className='w-screen flex flex-col justify-center py-8'
							key={suggestions.description}>
							<input
								{...getInputProps({
									placeholder: placeholder,
									className:
										"w-2/5 border-2 mx-auto border-cyan-600 rounded-md p-3 focus:text-orange-500 placeholder:text-cyan-600",
								})}
							/>
							{query && (
								<ul className='text-orange-500 w-2/5 mx-auto rounded-xs'>
									{loading && <div>Loading...</div>}
									{suggestions.map(suggestion => {
										const style = suggestion.active
											? { backgroundColor: "#cffafe", cursor: "pointer" }
											: { backgroundColor: "#ffffff", cursor: "pointer" }
										return (
											<li
												className='p-1 text-sm'
												key={suggestion.description}
												{...getSuggestionItemProps(suggestion, {
													style,
												})}>
												<span>{suggestion.description}</span>
											</li>
										)
									})}
								</ul>
							)}
						</div>
					)}
				</PlacesAutocomplete>
			)}
		</div>
	)
}
