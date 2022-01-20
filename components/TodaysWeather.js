import React, { useState, useEffect } from "react"
import moment from "moment-timezone"
import Image from "next/image"
import IsFavorite from "./IsFavorite"
import Alerts from "./Alerts"
import { formatWindDirection, formatWindSpeed } from "../lib/weather_utils.js"
import { FaTemperatureHigh } from "react-icons/fa"
import { GiWindsock } from "react-icons/gi"

function InfoData({ weather, timezone }) {
	return (
		<>
			<div className='flex justify-around p-1 sm:p-4 text-xs sm:text-sm'>
				<div>
					<span className='text-cyan-700  font-light dark:text-cyan-200'>
						Sunrise :
					</span>
					<span className='pt-1  text-center text-cyan-500 font-normal ml-2'>
						{moment.unix(weather.sunrise).tz(timezone).format("LT")}
					</span>
				</div>
				<div>
					<span className='text-cyan-700  font-light dark:text-cyan-200'>
						Pressure :
					</span>
					<span className='pt-1  text-center text-cyan-500 font-normal ml-2'>
						{weather.pressure} hPa
					</span>
				</div>
			</div>
			<div className='flex justify-around pb-3 text-xs sm:text-sm'>
				<div>
					<span className='text-cyan-700 font-light dark:text-cyan-200'>
						Sunset :
					</span>
					<span className='pt-1text-center text-cyan-500 font-normal ml-2'>
						{moment.unix(weather.sunset).tz(timezone).format("LT")}
					</span>
				</div>
				<div>
					<span className='text-cyan-700  font-light dark:text-cyan-200'>
						Humidity :
					</span>
					<span className='pt-1text-center text-cyan-500 font-normal ml-2'>
						{weather.humidity} %
					</span>
				</div>
			</div>
		</>
	)
}

export default function TodaysWeather({ location, weather, timezone, alerts }) {
	const [width, setWidth] = useState()

	const checkWidth = () => {
		if (window.innerWidth >= 640) setWidth(true)
		else setWidth(false)
	}
	if (typeof window !== "undefined") {
		window.addEventListener("resize", checkWidth)
	}
	useEffect(() => {
		if (window.innerWidth >= 640) setWidth(true)
		else setWidth(false)
	}, [])
	return (
		<>
			<div className='border-2 border-cyan-600 dark:border-cyan-700 rounded-lg bg-white mt-3 dark:bg-cyan-800'>
				<h2 className='bg-cyan-600 dark:bg-cyan-700 rounded-t-sm text-3xl sm:text-5xl py-3 sm:py-5 text-sky-100 dark:text-cyan-100 text-center capitalize font-thin tracking-widest '>
					Weather Now
				</h2>
				<div className='pt-2 text-sm text-center text-cyan-500 font-normal'>
					Local Time : {moment.unix(weather.dt).tz(timezone).format("LLL")}
				</div>
				<div className='flex justify-around'>
					<div className='w-1/2 sm:w-3/5 p-2'>
						<div className='text-2xl sm:text-5xl text-cyan-600 text-center capitalize leading-snug tracking-wider font-semibold py-4 dark:text-cyan-200'>
							{location.name.replaceAll("-", " ")}{" "}
							<div className='text-xl sm:text-2xl pt-3 ml-3 text-cyan-500 text-center tracking-wider uppercase font-normal dark:text-cyan-600'>
								<span className='text-sm sm:text-lg pt-3 ml-3 text-cyan-400 dark:text-cyan-500 text-center tracking-wider uppercase font-normal'>
									{location.state && location.state} {location.state && " - "}
								</span>
								{location.country.replaceAll("-", " ")}
							</div>
						</div>
						<div className='flex justify-center mx-auto w-full sm:w-1/2 mb-5'>
							<IsFavorite url={location.url} />
						</div>
						<div className='w-full flex flex-col mt-4 sm:mt-1 sm:flex-row justify-around pb-2 text-sm text-center text-cyan-500 font-normal'>
							<div>
								<span className='text-cyan-700 dark:text-cyan-200 font-light'>
									Elevation :{" "}
								</span>
								{location.elevation.toFixed(0)} m
							</div>
							<div>
								<span className='text-cyan-700 dark:text-cyan-200  font-light'>
									lat :{" "}
								</span>
								{parseFloat(location.lat).toFixed(6)}
							</div>
							<div>
								<span className='text-cyan-700  dark:text-cyan-200 font-light'>
									long :{" "}
								</span>
								{parseFloat(location.lng).toFixed(6)}
							</div>
						</div>
						<div className='flex flex-col sm:flex-row text-center sm:justify-around mx-1 my-5 px-4 py-5 tracking-wide shadow-xl rounded-lg bg-cyan-50 dark:bg-cyan-700 border-2 border-cyan-400'>
							<GiWindsock className='text-2xl text-cyan-800 mx-auto sm:mt-3 dark:text-cyan-300' />
							<div className='my-2 sm:my-0'>
								<span className='text-sm mr-2 text-cyan-500 dark:text-cyan-200 font-light '>
									Wind :
								</span>
								<span className='block text-sm mr-4 text-cyan-600 font-semibold dark:text-cyan-300'>
									{formatWindSpeed(weather.wind_speed)}{" "}
								</span>
							</div>
							<div className='text-2xl text-cyan-800  font-semibold mx-auto sm:mt-3 dark:text-cyan-200'>
								{formatWindDirection(weather.wind_deg)[1]}
							</div>
							<div className='text-sm sm:text-l mt-1 text-cyan-800 dark:text-cyan-200 tracking-widest mx-auto sm:mr-5 sm:ml-2 sm:mt-3  font-light'>
								{formatWindDirection(weather.wind_deg)[0]}
							</div>
							{weather && weather.wind_gust && (
								<div className='mt-2 sm:mt-0'>
									<span className='text-sm sm:ml-5 mr-2 sm:mr-0 text-cyan-500 font-light dark:text-cyan-200'>
										Wind Gust :
									</span>
									<span className='block  text-center text-sm mr-4 sm:mr-0 text-cyan-600  font-semibold dark:text-cyan-300'>
										{formatWindSpeed(weather.wind_gust)}
									</span>
								</div>
							)}
						</div>
						{width && <InfoData weather={weather} timezone={timezone} />}
					</div>
					<div className='w-1/2 sm:w-2/5 flex flex-col py-4'>
						<FaTemperatureHigh className='text-center text-3xl text-orange-400 dark:text-orange-300 w-full mt-5 mb-2 sm:mt-0' />
						<div className='flex flex-col sm:flex-row justify-evenly'>
							<div className='flex flex-col justify-center text-center p-4'>
								<div className='text-xs sm:text-sm text-orange-400 dark:text-orange-300 tracking-wider font-bold mb-1 sm:mb-4 '>
									Temperature
								</div>
								<div className='text-4xl sm:text-5xl text-orange-400 dark:text-orange-300'>
									{weather.temp.toFixed(0)}&deg;C
								</div>
							</div>
							<div className='flex flex-col justify-center  text-center p-4'>
								<div className='text-xs sm:text-sm text-orange-300 dark:text-orange-200 tracking-wider font-bold mb-1 sm:mb-4'>
									Feels like
								</div>
								<div className='text-xl sm:text-2xl text-orange-300 dark:text-orange-200'>
									{weather.feels_like.toFixed(0)}&deg;C
								</div>
							</div>
						</div>
						<div className='shadow-xl rounded-3xl bg-cyan-500 dark:bg-cyan-700 m-5 border-2 border-cyan-600'>
							<div className='text-center'>
								<Image
									src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
									alt='Weather Icon'
									width='150'
									height='150'
								/>
							</div>
							<h3 className='pb-4 mx-5 sm:mx-3 text-center text-xl sm:text-3xl capitalize text-sky-50 tracking-widest font-light dark:text-cyan-100'>
								{weather.weather[0].description}
							</h3>
						</div>
					</div>
				</div>
				{!width && <InfoData weather={weather} timezone={timezone} />}
			</div>
			{alerts && <Alerts alerts={alerts} timezone={timezone} />}
		</>
	)
}
