import { BsArrowDown } from "react-icons/bs"
import { BsArrowUp } from "react-icons/bs"
import { BsArrowLeft } from "react-icons/bs"
import { BsArrowRight } from "react-icons/bs"
import { BsArrowDownLeft } from "react-icons/bs"
import { BsArrowDownRight } from "react-icons/bs"
import { BsArrowUpLeft } from "react-icons/bs"
import { BsArrowUpRight } from "react-icons/bs"
import { BsArrowRepeat } from "react-icons/bs"

export function handleSession(key, value) {
	if (typeof window !== "undefined") {
		window.sessionStorage.removeItem(key)
		window.sessionStorage.setItem(key, value)
	}
}

export function formatWindSpeed(windSpeed) {
	return `${Math.round(windSpeed * 3.349)} km/h`
}

export function formatWindAverage(windSpeed, windGust) {
	return `${Math.round(windSpeed * 3.349)}-${Math.round(windGust * 3.349)} km/h`
}

export function formatWindDirection(direction) {
	let windDirection, arrow
	switch (direction) {
		case direction <= 10 || (direction >= 350 && direction):
			windDirection = "North"
			arrow = <BsArrowDown />
			break
		case direction <= 100 && direction >= 80 && direction:
			windDirection = "East"
			arrow = <BsArrowLeft />
			break
		case direction <= 190 && direction >= 170 && direction:
			windDirection = "South"
			arrow = <BsArrowUp />
			break
		case direction <= 280 && direction >= 260 && direction:
			windDirection = "West"
			arrow = <BsArrowRight />
			break
		case direction <= 50 && direction >= 40 && direction:
			windDirection = "North East"
			arrow = <BsArrowDownLeft />
			break
		case direction <= 320 && direction >= 310 && direction:
			windDirection = "North West"
			arrow = <BsArrowDownRight />
			break
		case direction <= 140 && direction >= 130 && direction:
			windDirection = "South East"
			arrow = <BsArrowUpLeft />
			break
		case direction <= 230 && direction >= 220 && direction:
			windDirection = "South West"
			arrow = <BsArrowUpRight />
			break
		case direction < 40 && direction > 10 && direction:
			windDirection = "N-NE"
			arrow = <BsArrowDownLeft />
			break
		case direction < 80 && direction > 50 && direction:
			windDirection = "E-NE"
			arrow = <BsArrowDownLeft />
			break
		case direction < 130 && direction > 100 && direction:
			windDirection = "E-SE"
			arrow = <BsArrowUpLeft />
			break
		case direction < 170 && direction > 140 && direction:
			windDirection = "S-SE"
			arrow = <BsArrowUpLeft />
			break
		case direction < 220 && direction > 190 && direction:
			windDirection = "S-SW"
			arrow = <BsArrowUpRight />
			break
		case direction < 260 && direction > 230 && direction:
			windDirection = "W-SW"
			arrow = <BsArrowUpRight />
			break
		case direction < 310 && direction > 280 && direction:
			windDirection = "W-NW"
			arrow = <BsArrowDownRight />
			break
		case direction < 350 && direction > 320 && direction:
			windDirection = "N-NW"
			arrow = <BsArrowDownRight />
			break
		default:
			arrow = <BsArrowRepeat />
	}
	return [windDirection, arrow]
}
