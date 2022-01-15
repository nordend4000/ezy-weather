import React from "react"
import moment from "moment-timezone"
import Image from "next/image"
import IsFavorite from "./IsFavorite"
import Alerts from "./Alerts"
import { formatWindDirection, formatWindSpeed } from "../lib/weather_utils.js"
import { FaTemperatureHigh } from "react-icons/fa"
import { GiWindsock } from "react-icons/gi"

export default function TodaysWeather({ location, weather, timezone, alerts }) {
	return (
		<>
			<div className='border-2 border-cyan-600 rounded-lg bg-white'>
				<h2 className='bg-cyan-600 rounded-t-sm text-5xl pb-5 text-sky-100 text-center capitalize font-thin tracking-widest pt-5'>
					Weather Now
				</h2>
				<div className='pt-2 text-sm text-center text-cyan-500 font-normal'>
					{moment.unix(weather.dt).tz(timezone).format("LLL")}
				</div>
				<div className='flex justify-around'>
					<div className='w-3/5 p-2'>
						<div className='text-5xl text-cyan-600 text-center capitalize leading-snug tracking-wider font-semibold py-4 '>
							{location.name.replaceAll("-", " ")}{" "}
							<div className='text-2xl pt-3 ml-3 text-cyan-500 text-center tracking-wider uppercase font-normal'>
								<span className='text-lg pt-3 ml-3 text-cyan-400 text-center tracking-wider uppercase font-normal'>
									{location.state && location.state} {location.state && " - "}
								</span>
								{location.country.replaceAll("-", " ")}
							</div>
						</div>
						<div className='flex justify-center w-1/2 mx-auto'>
							<IsFavorite url={location.url} />
						</div>
						<div className='w-full flex justify-around pb-2 text-sm text-center text-cyan-500 font-normal'>
							<div>
								<span className='text-cyan-700 font-light'>Elevation : </span>
								{location.elevation.toFixed(0)} m
							</div>
							<div>
								<span className='text-cyan-700  font-light'>lat : </span>
								{location.lat}
							</div>
							<div>
								<span className='text-cyan-700  font-light'>long : </span>
								{location.lng}
							</div>
						</div>
						<div className='flex justify-around mx-1 my-5 px-4 py-5 tracking-wide shadow-xl rounded-lg bg-cyan-50 border-2 border-cyan-400'>
							<GiWindsock className='text-2xl text-cyan-800' />
							<div>
								<span className='text-sm mr-2 text-cyan-500 font-light '>
									Wind :
								</span>
								<span className='text-sm mr-4 text-cyan-600 font-semibold'>
									{formatWindSpeed(weather.wind_speed)}{" "}
								</span>
							</div>
							<div className='text-2xl text-cyan-800  font-semibold'>
								{formatWindDirection(weather.wind_deg)[1]}
							</div>
							<div className='text-l text-cyan-800 tracking-widest mr-5 ml-2  font-light'>
								{formatWindDirection(weather.wind_deg)[0]}
							</div>
							{weather && weather.wind_gust && (
								<div>
									<span className='text-sm ml-5 mr-2 text-cyan-500 font-light'>
										Wind Gust :
									</span>
									<span className='text-sm mr-4 text-cyan-600  font-semibold'>
										{formatWindSpeed(weather.wind_gust)}
									</span>
								</div>
							)}
						</div>
						<div className='flex justify-around p-5'>
							<div>
								<span className='text-cyan-700  font-light'>Sunrise :</span>
								<span className='pt-1 text-sm text-center text-cyan-500 font-normal ml-2'>
									{moment.unix(weather.sunrise).tz(timezone).format("LT")}
								</span>
							</div>
							<div>
								<span className='text-cyan-700  font-light'>Pressure :</span>
								<span className='pt-1 text-sm text-center text-cyan-500 font-normal ml-2'>
									{weather.pressure} hPa
								</span>
							</div>
						</div>
						<div className='flex justify-around pb-3'>
							<div>
								<span className='text-cyan-700  font-light'>Sunset :</span>
								<span className='pt-1 text-sm text-center text-cyan-500 font-normal ml-2'>
									{moment.unix(weather.sunset).tz(timezone).format("LT")}
								</span>
							</div>
							<div>
								<span className='text-cyan-700  font-light'>Humidity :</span>
								<span className='pt-1 text-sm text-center text-cyan-500 font-normal ml-2'>
									{weather.humidity} %
								</span>
							</div>
						</div>
					</div>
					<div className='w-2/5 flex flex-col'>
						<FaTemperatureHigh className='text-center text-3xl text-orange-400 w-full mb-2' />
						<div className='flex justify-evenly'>
							<div className='flex flex-col justify-center text-center p-4'>
								<div className='text-sm text-orange-400 tracking-wider font-bold mb-4'>
									Temperature
								</div>
								<div className='text-5xl text-orange-400'>
									{weather.temp.toFixed(0)}&deg;C
								</div>
							</div>
							<div className='flex flex-col justify-center  text-center p-4'>
								<div className='text-sm text-orange-300 tracking-wider font-bold mb-4'>
									Feels like
								</div>
								<div className='text-2xl text-orange-300'>
									{weather.feels_like.toFixed(0)}&deg;C
								</div>
							</div>
						</div>
						<div className='shadow-xl rounded-3xl bg-cyan-500 m-5 border-2 border-cyan-600'>
							<div className='text-center'>
								<Image
									src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
									alt='Weather Icon'
									width='150'
									height='150'
								/>
							</div>
							<h3 className='pb-4 text-center text-3xl capitalize text-sky-50 tracking-widest font-light '>
								{weather.weather[0].description}
							</h3>
						</div>
					</div>
				</div>
			</div>
			{alerts && <Alerts alerts={alerts} timezone={timezone} />}
		</>
	)
}
