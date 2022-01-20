import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import PlacesAutocomplete from "react-places-autocomplete"
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"

export default function SearchBox({ placeholder }) {
	const router = useRouter()
	const [query, setQuery] = useState("")

	const handleSelect = async value => {
		const results = await geocodeByAddress(value)
		const coord = await getLatLng(results[0])
		setQuery(value)
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
			<PlacesAutocomplete
				value={query}
				onChange={setQuery}
				onSelect={handleSelect}
				highlightFirstSuggestion>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div
						className='flex flex-col justify-center pt-3 '
						key={suggestions.description}>
						<input
							{...getInputProps({
								placeholder: placeholder,
								className:
									"w-full sm:w-3/4 border-2 mx-auto  bg-cyan-50 dark:bg-cyan-800 border-cyan-600 rounded-md p-2 text-xs sm:text-base sm:p-3 focus:text-orange-500 placeholder:text-cyan-600 dark:placeholder:text-cyan-200",
							})}
						/>
						{query && (
							<ul className='w-full sm:w-3/4 text-cyan-800 dark:text-cyan-600 bg-cyan-50 dark:bg-cyan-900  mx-auto rounded-xs text-xs sm:text-base'>
								{loading && <div>Loading...</div>}
								{suggestions.map(suggestion => {
									const style = suggestion.active
										? { backgroundColor: "#cffafe", cursor: "pointer" }
										: { cursor: "pointer" }
									return (
										<li
											className='p-1'
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
		</div>
	)
}
