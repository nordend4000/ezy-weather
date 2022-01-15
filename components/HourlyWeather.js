import moment from "moment"
import React from "react"
import Image from "next/image"
import { formatWindDirection, formatWindAverage } from "../lib/weather_utils.js"

export default function HourlyWeather({ hourlyWeather, timezone }) {
	return (
		<div className='border-2 border-cyan-600 my-8 rounded-lg bg-white'>
			<h2 className='bg-cyan-600 rounded-t-sm text-5xl pb-5 text-sky-100 text-center capitalize font-thin tracking-widest pt-5'>
				Today&apos;s Forecast
			</h2>
			<div className='flex w-full overflow-x-auto py-2'>
				{hourlyWeather.length > 0 &&
					hourlyWeather.map((weather, index) => (
						<div className='m-3 h-30 w-50 flex flex-col ' key={weather.dt}>
							<span
								className={`text-cyan-700 text-xs text-center ${
									index == 0 ? "font-bold" : ""
								}`}>
								{index == 0
									? "Now"
									: moment.unix(weather.dt).tz(timezone).format("LT")}
							</span>
							<div className='text-center shadow-xl rounded-3xl  bg-cyan-500 border-2 border-cyan-600 my-3'>
								<Image
									src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
									alt={weather.weather[0].description}
									width='100'
									height='100'
								/>
							</div>
							<span className='text-center font-light text-xs pb-2 text-orange-400 capitalize'>
								{weather.weather[0].description}
							</span>
							<span className='text-center text-orange-500'>
								{weather.temp.toFixed(0)}&deg;C
							</span>
							<span className='text-center text-cyan-700 text-xs'>
								<span className='flex justify-center w-full mt-2'>
									{formatWindDirection(weather.wind_deg)[1]}
								</span>
								<span className='flex justify-center w-full mt-2'>
									{formatWindDirection(weather.wind_deg)[0]}
								</span>
								{formatWindAverage(weather.wind_speed, weather.wind_gust)}
							</span>
						</div>
					))}
			</div>
		</div>
	)
}
