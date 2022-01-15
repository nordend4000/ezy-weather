import React from "react"
import moment from "moment-timezone"
import Image from "next/image"
import { formatWindDirection, formatWindAverage } from "../lib/weather_utils.js"

export default function WeeklyWeather({ weeklyWeather, timezone }) {
	return (
		<div className='border-2 border-cyan-600 my-8 rounded-lg '>
			<h2 className='bg-cyan-600 rounded-t-sm text-5xl pb-5 text-sky-100 text-center capitalize font-thin tracking-widest pt-5'>
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
								className='bg-white border-t-2 border-cyan-600'
								key={weather.dt}>
								<div className='flex justify-around align-center items-center p-2'>
									<div>
										<h3 className='text-4xl text-cyan-600 tracking-wider font-light pt-2'>
											{moment.unix(weather.dt).tz(timezone).format("dddd")}
										</h3>
										<h4 className='text-white my-4'>
											<span className='text-bold text-orange-400 text-2xl '>
												{weather.temp.max.toFixed(0)}&deg;C
											</span>
											<span className='ml-4 text-orange-300 text-xl '>
												{weather.temp.min.toFixed(0)}&deg;C
											</span>
										</h4>
									</div>
									<h5 className='capitalize text-orange-500 text-2xl font-light pb-2'>
										{weather.weather[0].description}
									</h5>
									<div className='text-center shadow-xl rounded-3xl  bg-cyan-500 border-2 border-cyan-600'>
										<Image
											src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
											alt='Weather Icon'
											width='120'
											height='120'
										/>
									</div>
									<div className='flex flex-col text-center shadow-xl rounded-3xl p-5 bg-cyan-50 border-2 border-cyan-400'>
										<div className='text-2xl p-1 text-cyan-700 flex justify-center'>
											{formatWindDirection(weather.wind_deg)[1]}
										</div>
										<div className='text-l p-1 text-cyan-700'>
											{formatWindDirection(weather.wind_deg)[0]}
										</div>
										<div className='text-sm p-1 text-cyan-700'>
											{formatWindAverage(weather.wind_speed, weather.wind_gust)}
										</div>
									</div>
								</div>
								<div className='flex justify-around pb-4'>
									<div>
										<span className='text-xs ml-4 text-cyan-600'>
											Sunrise :
										</span>
										<span className='text-xs ml-4 text-cyan-500'>
											{moment.unix(weather.sunrise).tz(timezone).format("LT")}
										</span>
									</div>
									<div>
										<span className='text-xs ml-4 text-cyan-600'>Sunset :</span>
										<span className='text-xs ml-4 text-cyan-500'>
											{moment.unix(weather.sunset).tz(timezone).format("LT")}
										</span>{" "}
									</div>
									<div>
										<span className='text-xs ml-4 text-cyan-600'>
											Humidity :
										</span>
										<span className='text-xs ml-4 text-cyan-500'>
											{weather.humidity} %
										</span>{" "}
									</div>
									<div>
										<span className='text-xs ml-4 text-cyan-600'>
											Pressure :
										</span>
										<span className='text-xs ml-4 text-cyan-500'>
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
