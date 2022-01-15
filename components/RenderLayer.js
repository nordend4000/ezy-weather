import React, { useState, useEffect, useRef } from "react"
import AlertModal from "./AlertModal"
import Legend from "./Legend"
import { GiFluffyCloud } from "react-icons/gi"
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

const Layers = [
	{ name: "Precipitation", path: "precipitation_new" },
	{ name: "Clouds", path: "clouds_new" },
	{ name: "Pressure", path: "pressure_new" },
	{ name: "Wind", path: "wind_new" },
	{ name: "Temperatures", path: "temp_new" },
]
const DEFAULT_CENTER = [46.71583, 13.31304]

function DynamicLegend() {
	const [layer, setLayer] = useState(["Precipitation"])

	const add = useMapEvent("overlayadd", e => {
		setLayer([...layer, e.name])
	})
	const remove = useMapEvent("overlayremove", e => {
		if (layer.includes(e.name)) {
			let array = layer.filter(entry => entry !== e.name)
			setLayer(array)
		}
	})
	return (
		<div>
			{layer &&
				layer.map(el => (
					<div key={el} className='flex w-screen'>
						<Legend layer={el} />
					</div>
				))}
		</div>
	)
}

//  On Map Click Animated Panning
function SetViewOnClick({ animateRef }) {
	const map = useMapEvent("click", e => {
		map.setView(e.latlng, map.getZoom(), {
			animate: animateRef.current || false,
		})
	})
	return null
}

function RenderLayer() {
	const animateRef = useRef(false)
	const [position, setPosition] = useState(null)
	const [share, setShare] = useState(false)
	const [centerMap, setCenterMap] = useState(null)

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

	return (
		<>
			<AlertModal
				setShare={setShare}
				setCenterMap={setCenterMap}
				defaultCenter={DEFAULT_CENTER}
			/>
			{centerMap != null && (
				<>
					<MapContainer
						center={centerMap}
						zoom={4}
						scrollWheelZoom={false}
						style={{ height: "88vh", width: "99vw" }}>
						<LayersControl position='topright'>
							<LayersControl.BaseLayer checked name='Open Street Map'>
								<TileLayer
									opacity='0.40'
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
								/>
							</LayersControl.BaseLayer>
							<LayersControl.BaseLayer name='Landscape - Thunderforest'>
								<TileLayer
									opacity='0.40'
									attribution='&copy; <a href="https://www.thunderforest.com/terms/">Thunderforest</a> contributors'
									url={`https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${process.env.NEXT_PUBLIC_API_KEY_THUNDERFOREST}`}
								/>
							</LayersControl.BaseLayer>
							<LayersControl.BaseLayer name='Black And White'>
								<TileLayer
									opacity='0.40'
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
								/>
							</LayersControl.BaseLayer>
							{Layers.map((layer, index) => (
								<div key={index}>
									<LayersControl.Overlay
										name={layer.name}
										key={index}
										checked={layer.path === "precipitation_new" ? true : false}>
										<TileLayer
											opacity='1'
											attribution='&copy; <a href="https://www.openweathermap.org/">OpenWeatherMap</a> contributors'
											url={`https://tile.openweathermap.org/map/${layer.path}/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}`}
										/>
									</LayersControl.Overlay>
								</div>
							))}
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
						<SetViewOnClick animateRef={animateRef} />
						<DynamicLegend />
					</MapContainer>
				</>
			)}
		</>
	)
}
export default RenderLayer
