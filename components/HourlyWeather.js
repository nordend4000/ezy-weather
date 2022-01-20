import moment from "moment"
import React from "react"
import Image from "next/image"
import { formatWindDirection, formatWindAverage } from "../lib/weather_utils.js"

export default function HourlyWeather({ hourlyWeather, timezone }) {
	return (
		<div className='border-2 border-cyan-600 dark:border-cyan-700 rounded-lg bg-white dark:bg-cyan-800 my-12'>
			<h2 className='bg-cyan-600 dark:bg-cyan-700  rounded-t-sm text-3xl sm:text-5xl py-3 sm:py-5 text-sky-100 text-center capitalize font-thin tracking-widest '>
				Today&apos;s Forecast
			</h2>
			<div className='flex w-full overflow-x-auto py-2'>
				{hourlyWeather.length > 0 &&
					hourlyWeather.map((weather, index) => (
						<div className='m-2 flex flex-col ' key={weather.dt}>
							<span
								className={`text-cyan-700 dark:text-cyan-200 text-xs text-center mx-auto h-3 w-20 ${
									index == 0 ? "font-bold" : ""
								}`}>
								{index == 0
									? "Now"
									: moment.unix(weather.dt).tz(timezone).format("LT")}
							</span>
							<div className='text-center shadow-xl rounded-3xl  bg-cyan-500 border-2 border-cyan-600 dark:bg-cyan-700 my-4'>
								<Image
									src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
									alt={weather.weather[0].description}
									width='100'
									height='100'
								/>
							</div>
							<span className='text-center font-light text-xs pb-2 text-orange-400 dark:text-orange-200 capitalize  my-auto'>
								{weather.weather[0].description}
							</span>
							<span className='text-center text-orange-500 dark:text-orange-300  my-auto'>
								{weather.temp.toFixed(0)}&deg;C
							</span>
							<span className='text-center text-cyan-700 dark:text-cyan-200 text-xs my-auto'>
								<span className='flex justify-center w-full mt-2'>
									{formatWindDirection(weather.wind_deg)[1]}
								</span>
								<span className='flex justify-center w-full mt-2 mb-2'>
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
