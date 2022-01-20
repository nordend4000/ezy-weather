import React, { useState, useEffect } from "react"
import AlertModal from "./AlertModal"
import swal from "sweetalert"
import { GiFluffyCloud } from "react-icons/gi"
import { useRouter } from "next/router"
import {
	MapContainer,
	TileLayer,
	LayersControl,
	useMapEvent,
	Marker,
	Popup,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"

const DEFAULT_CENTER = [46.71583, 13.31304]

function GetCoordOnClick({ setCoord }) {
	useMapEvent("click", e => {
		setCoord(e.latlng)
	})
	return null
}
function SendAlertOnFirstHover({ hoveredFirst, setHoveredFirst }) {
	useMapEvent("mouseover", e => {
		if (!hoveredFirst) setHoveredFirst(true)
		return null
	})
	return null
}
function SendAlertOnFirstMove({ hoveredFirst, setHoveredFirst }) {
	useMapEvent("movestart", e => {
		if (!hoveredFirst) setHoveredFirst(true)
		return null
	})
	return null
}

function SearchMap() {
	const router = useRouter()
	const [coord, setCoord] = useState()
	const [reverse, setReverse] = useState()
	const [hoveredFirst, setHoveredFirst] = useState(false)
	const [position, setPosition] = useState(null)
	const [share, setShare] = useState(false)
	const [centerMap, setCenterMap] = useState(DEFAULT_CENTER)

	// GET LOCATION
	useEffect(() => {
		getLocation()
		// eslint-disable-next-line
	}, [share])

	function getLocation() {
		if (!share) return
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError)
		} else {
			console.log("The Browser Does not Support Geolocation")
			setCenterMap(DEFAULT_CENTER)
		}
	}

	function showPosition(position) {
		setPosition({
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		})
		setCenterMap([position.coords.latitude, position.coords.longitude])
	}

	function showError(error) {
		if (error.PERMISSION_DENIED) {
			console.log("The User have denied the request for Geolocation.")
			setCenterMap(DEFAULT_CENTER)
		}
	}

	// REVERSE GEOCODING
	useEffect(() => {
		if (!coord) return
		CallGeocode(coord)
	}, [coord])

	useEffect(() => {
		if (!reverse) return
		router.push(
			`/location/${reverse.location}_${reverse.country}=${reverse.lat}+${reverse.lng}`,
		)
	}, [reverse, router])

	const CallGeocode = async e => {
		const geocoding = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.lat},${e.lng}&key=${process.env.NEXT_PUBLIC_API_KEY_AUTOCOMPLETE}`,
		)
		const data_geocoding = await geocoding.json()

		if (
			!data_geocoding ||
			!data_geocoding.plus_code ||
			!data_geocoding.plus_code.compound_code
		) {
			swal("Sorry we didn't find any location, please try again !", {
				buttons: false,
				timer: 2000,
			})
		} else {
			const response = data_geocoding.plus_code.compound_code.split(" ")
			swal({
				title: `${response[1]} ${response[response.length - 1]} `,
				text: `Would you like to get the weather for this location ?`,
				icon: "info",
				buttons: ["Cancel", "Search"],
			}).then(searching => {
				if (searching) {
					setReverse({
						lat: e.lat,
						lng: e.lng,
						location: response[1].replace(",", ""),
						country: response[response.length - 1],
					})
				}
				return null
			})
		}
	}

	return (
		<>
			{hoveredFirst && (
				<AlertModal
					setShare={setShare}
					setCenterMap={setCenterMap}
					defaultCenter={DEFAULT_CENTER}
				/>
			)}
			{centerMap != null && (
				<MapContainer
					center={centerMap}
					zoom={4}
					scrollWheelZoom={false}
					style={{ height: "90vh", width: "100%" }}>
					<LayersControl position='topright'>
						<LayersControl.BaseLayer checked name='Open Street Map'>
							<TileLayer
								opacity='0.40'
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name='Landscape - Thunderforest'>
							<TileLayer
								opacity='0.40'
								attribution='&copy; <a href="https://www.thunderforest.com/terms/">Thunderforest</a>'
								url={`https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${process.env.NEXT_PUBLIC_API_KEY_THUNDERFOREST}`}
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name='Black And White'>
							<TileLayer
								opacity='0.40'
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
								url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
							/>
						</LayersControl.BaseLayer>
					</LayersControl>
					{share && position != null && (
						<Marker position={position}>
							<Popup>
								<span className='text-orange-400 font-semibold'>
									<GiFluffyCloud className='inline text-cyan-400 mr-2' />
									You are here
								</span>
							</Popup>
						</Marker>
					)}
					<GetCoordOnClick setCoord={setCoord} />
					<SendAlertOnFirstHover
						hoveredFirst={hoveredFirst}
						setHoveredFirst={setHoveredFirst}
					/>
					<SendAlertOnFirstMove
						hoveredFirst={hoveredFirst}
						setHoveredFirst={setHoveredFirst}
					/>
				</MapContainer>
			)}
		</>
	)
}
export default SearchMap
