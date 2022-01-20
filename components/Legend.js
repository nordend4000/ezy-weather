import { useEffect } from "react"
import { useMap } from "react-leaflet"
import L from "leaflet"

const LEGEND_DATA = [
	{
		name: "Precipitation",
		unit: "mm",
		numbers: [0, 35, 70, 105, 140],
		position: "bottomleft",
	},
	{
		name: "Clouds",
		unit: "%",
		numbers: [0, 25, 50, 75, 100],
		position: "bottomleft",
	},
	{
		name: "Pressure",
		unit: "hPa",
		numbers: [950, 980, 1010, 1040, 1070],
		position: "bottomleft",
	},
	{
		name: "Wind",
		unit: "m/s",
		numbers: [0, 25, 50, 75, 100],
		position: "bottomleft",
	},
	{
		name: "Temperatures",
		unit: "&deg;C",
		numbers: [-40, -20, 0, 20, 40],
		position: "bottomleft",
	},
]

function Legend({ layer }) {
	const map = useMap()
	useEffect(() => {
		if (!map) return
		const legend = LEGEND_DATA.filter(el => el.name === layer)
		const legendContainer = L.control({ position: legend[0].position })
		legendContainer.onAdd = () => {
			const div = L.DomUtil.create("div", "legend")
			div.innerHTML = `<div class='w-full text-xs font-light px-5 py-1 static top-15 left-20 z-50 border border-cyan-600  bg-white rounded-lg text-cyan-800 opacity-1'>
			<div class='flex justify-center items-center tracking-widest'>
			<div class=' ml-3'><b>${legend[0].name}, ${legend[0].unit}</b></div>
			</div>		
			<div>
			<div class='${legend[0].name}-line Line'></div>
			<div class='flex justify-evenly font-light'>
			<div>${legend[0].numbers[0]}</div>
			<div>${legend[0].numbers[1]}</div>
			<div>${legend[0].numbers[2]}</div>
			<div>${legend[0].numbers[3]}</div>
			<div>${legend[0].numbers[4]}</div>
			</div>
			</div>
			</div>`
			return div
		}
		legendContainer.addTo(map)
		// Clean previous Legend
		return () => legendContainer.remove()
	}, [map, layer])

	return null
}

export default Legend
