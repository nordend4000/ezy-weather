import React from "react"
import moment from "moment-timezone"
import TodaysWeather from "../../components/TodaysWeather"
import HourlyWeather from "../../components/HourlyWeather"
import WeeklyWeather from "../../components/WeeklyWeather"
import Layout from "../../components/Layout"

export async function getServerSideProps(context) {
	let url = context.params.location.split("=")
	let location = url[0].split("_")
	let name = location[0]
	let country = location[1]
	let coordinates = url[1].split("+")
	let lat = coordinates[0]
	let lng = coordinates[1]

	if (!url) {
		return {
			notFound: true,
		}
	}
	const elevation = await fetch(
		`https://maps.googleapis.com/maps/api/elevation/json?locations=${lat}%2C${lng}&key=${process.env.NEXT_PUBLIC_API_KEY_AUTOCOMPLETE}`,
	)
	const data_elevation = await elevation.json()
	if (!data_elevation) {
		return {
			notFound: true,
		}
	}
	const reverse = await fetch(
		`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}`,
	)
	const data_reverse = await reverse.json()
	if (!data_reverse) {
		return {
			notFound: true,
		}
	}
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&exclude=minutely&units=metric`,
	)
	const data_weather = await res.json()

	if (!data_weather) {
		return {
			notFound: true,
		}
	}
	const hourlyWeather = getHourlyWeather(
		data_weather.hourly,
		data_weather.timezone,
	)
	const weeklyWeather = data_weather.daily
	return {
		props: {
			location: {
				name: name,
				country: country,
				elevation: data_elevation.results[0].elevation || "",
				lat: lat,
				lng: lng,
				url: context.params.location,
				state: data_reverse[0].state || "",
			},
			timezone: data_weather.timezone,
			currentWeather: data_weather.current,
			hourlyWeather: hourlyWeather,
			weeklyWeather: weeklyWeather,
			alerts: data_weather.alerts || "",
		},
	}
}

const getHourlyWeather = (hourlyData, timezone) => {
	const endOfDay = moment().tz(timezone).endOf("day").valueOf()
	const endTimeStamp = Math.floor(endOfDay / 1000)
	const todaysData = hourlyData.filter(data => data.dt < endTimeStamp)
	return todaysData
}

export default function Location({
	location,
	currentWeather,
	hourlyWeather,
	weeklyWeather,
	timezone,
	alerts,
}) {
	return (
		<Layout page={`EZY Weather - ${location.name}`}>
			<div className='container mx-auto'>
				<div className='container mx-auto'>
					<TodaysWeather
						location={location}
						weather={currentWeather}
						timezone={timezone}
						alerts={alerts}
					/>
					<HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
					<WeeklyWeather weeklyWeather={weeklyWeather} timezone={timezone} />
				</div>
			</div>
		</Layout>
	)
}
