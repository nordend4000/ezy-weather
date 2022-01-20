import React from "react"
import moment from "moment-timezone"
import Image from "next/image"
import { formatWindDirection, formatWindAverage } from "../lib/weather_utils.js"

export default function WeeklyWeather({ weeklyWeather, timezone }) {
	return (
		<div className='border-2 border-cyan-600 dark:border-cyan-700 rounded-lg bg-white mt-3 dark:bg-cyan-800 my-8 rounded-lg '>
			<h2 className='bg-cyan-600 dark:bg-cyan-700 rounded-t-sm text-3xl sm:text-5xl py-3 sm:py-5 text-sky-100 text-center capitalize font-thin tracking-widest '>
				Weekly Forecast
			</h2>
			<div className='flex flex-col w-full'>
				{weeklyWeather.length > 0 &&
					weeklyWeather.map((weather, index) => {
						if (index == 0) {
							return
						}
						return (
							<div
								className='bg-white dark:bg-cyan-800 border-t-2 border-cyan-600'
								key={weather.dt}>
								<div className='flex flex-col sm:flex-row justify-around align-center items-center  p-2'>
									<div className='sm:ml-8'>
										<h3 className='text-4xl text-cyan-600 dark:text-cyan-200 tracking-wider font-light pt-2'>
											{moment.unix(weather.dt).tz(timezone).format("dddd")}
										</h3>
										<h4 className='text-center my-4'>
											<span className='text-bold text-orange-400 dark:text-orange-300 text-2xl '>
												{weather.temp.max.toFixed(0)}&deg;C
											</span>
											<span className='ml-4 text-orange-300 dark:text-orange-200 text-xl '>
												{weather.temp.min.toFixed(0)}&deg;C
											</span>
										</h4>
									</div>
									<h5 className='flex-grow w-1/2 text-center capitalize text-orange-500 dark:text-orange-200 text-2xl font-light pb-2'>
										{weather.weather[0].description}
									</h5>
									<div className='flex flex-row  p-2 sm:mr-8'>
										<div className=' text-center shadow-xl rounded-3xl self-center   bg-cyan-500 border-2 border-cyan-600 dark:bg-cyan-700 mx-2'>
											<Image
												src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
												alt='Weather Icon'
												width='120'
												height='120'
											/>
										</div>
										<div className='flex flex-col text-center shadow-xl self-center  rounded-3xl py-5 px-4  bg-cyan-50 border-2 border-cyan-600 dark:bg-cyan-700 mx-2'>
											<div className='text-2xl p-1 text-cyan-700 dark:text-cyan-200 flex justify-center'>
												{formatWindDirection(weather.wind_deg)[1]}
											</div>
											<div className='text-xs p-1 text-cyan-700 dark:text-cyan-200'>
												{formatWindDirection(weather.wind_deg)[0]}
											</div>
											<div className='text-xs p-1 text-cyan-700 dark:text-cyan-200'>
												{formatWindAverage(
													weather.wind_speed,
													weather.wind_gust,
												)}
											</div>
										</div>
									</div>
								</div>
								<div className='flex justify-around pb-4 text-center'>
									<div>
										<span className='text-xs ml-1 sm:ml-4 text-cyan-600 dark:text-cyan-200'>
											Sunrise :
										</span>
										<span className='block sm:inline text-xs ml-2 sm:ml-4 text-cyan-500'>
											{moment.unix(weather.sunrise).tz(timezone).format("LT")}
										</span>
									</div>
									<div>
										<span className='text-xs ml-1 sm:ml-4 text-cyan-600 dark:text-cyan-200'>
											Sunset :
										</span>
										<span className=' block sm:inline  text-xs ml-1 sm:ml-4 text-cyan-500'>
											{moment.unix(weather.sunset).tz(timezone).format("LT")}
										</span>{" "}
									</div>
									<div>
										<span className='text-xs ml-1 sm:ml-4 text-cyan-600 dark:text-cyan-200'>
											Humidity :
										</span>
										<span className=' block sm:inline text-xs ml-1 sm:ml-4 text-cyan-500'>
											{weather.humidity} %
										</span>{" "}
									</div>
									<div>
										<span className='text-xs ml-1 sm:ml-4 text-cyan-600 dark:text-cyan-200'>
											Pressure :
										</span>
										<span className='block sm:inline text-xs ml-1 sm:ml-4 text-cyan-500'>
											{weather.pressure} hPa
										</span>{" "}
									</div>
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}
