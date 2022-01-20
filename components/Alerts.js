import React from "react"
import moment from "moment-timezone"
import { FiAlertTriangle } from "react-icons/fi"

function Alerts({ alerts, timezone }) {
	return (
		<div className='border-2 border-orange-600 dark:border-orange-800 rounded-lg bg-white mt-8'>
			<h2 className='bg-orange-600 dark:bg-orange-800 rounded-t-sm text-2xl pb-3 text-sky-100 dark:text-orange-50 text-center capitalize font-thin tracking-widest pt-3'>
				WEATHER {alerts.length > 1 ? "ALERTS" : "ALERT"}
			</h2>
			{alerts.map((alert, index) => (
				<div
					key={index}
					className={`${
						index < alerts.length - 1 &&
						"border-b-2 border-orange-600 dark:bg-orange-900"
					} p-3 text-center dark:bg-orange-900`}>
					<div className='w-1/3 mx-auto flex justify-around items-center pb-4'>
						<div>
							<FiAlertTriangle className='text-5xl mx-auto text-orange-400 my-2' />
						</div>
						{alert.tags && alert.tags.length > 0 && (
							<div className='flex text-orange-400 text-4xl uppercase'>
								{alert.tags.map((tag, index) => (
									<p key={index}>{tag}</p>
								))}
							</div>
						)}
					</div>
					<div className='flex justify-evenly flex-wrap'>
						<div className='flex-col'>
							<div className='text-xl text-orange-600 font-semibold'>
								{" "}
								{alert.event}
							</div>
							<div className='flex-col text-orange-400'>
								{alert.sender_name}
							</div>
						</div>
						<div className='flex-col text-orange-400'>
							<div>
								{alert.start && (
									<>
										<span className='text-orange-600 font-semibold'>
											From :{" "}
										</span>
										<span>
											{moment.unix(alert.start).tz(timezone).format("LLLL")}
										</span>
									</>
								)}
							</div>
							<div>
								{alert.end && (
									<>
										<span className='text-orange-600 font-semibold'>To : </span>
										<span>
											{moment.unix(alert.end).tz(timezone).format("LLLL")}
										</span>
									</>
								)}
							</div>
						</div>
					</div>
					{alert.description && (
						<div className='p-5 text-sm text-orange-700 bg-orange-100 dark:bg-orange-800 dark:text-orange-200 rounded-lg mt-3'>
							{alert.description}
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default Alerts
