import React, { useState, useEffect } from "react"
import swal from "sweetalert"
import { handleSession } from "../lib/weather_utils.js"

function AlertModal({ setCenterMap, setShare, defaultCenter }) {
	const [openModal, setOpenModal] = useState(false)
	const [session, setSession] = useState(false)

	useEffect(() => {
		// check session
		const sessionCheck = window.sessionStorage.getItem("position")
		if (sessionCheck == null || sessionCheck === "false") {
			setSession(false)
			setOpenModal(true)
		}
		if (sessionCheck && sessionCheck === "true") {
			setSession(true)
			setOpenModal(false)
			setShare(true)
		}
	}, [])

	const alertModal = () => {
		setOpenModal(false)
		swal({
			title: "EZY Weather want to get access to your Location",
			text: "Would you like to share your postion with EZY Weather ?",
			icon: "info",
			buttons: {
				once: {
					text: "Yes, only this time",
					value: "once",
					type: "confirm",
				},
				always: {
					text: "Yes, Always",
					value: "always",
					type: "confirm",
				},
				no: {
					text: "No Thanks",
					value: "no",
				},
			},
		}).then(value => {
			switch (value) {
				case "no":
					if (typeof window !== "undefined") handleSession("position", "false")
					setSession(false)
					setCenterMap(defaultCenter)
					swal("Your position won't be shared", {
						icon: "success",
						button: false,
						timer: 2400,
					})
					break
				case "once":
					if (typeof window !== "undefined") handleSession("position", "false")
					setShare(true)
					setSession(false)
					swal("Your position will be shared only once", {
						icon: "success",
						button: false,
						timer: 2400,
					})
					break
				case "always":
					if (typeof window !== "undefined") handleSession("position", "true")
					setShare(true)
					setSession(true)
					swal("Your position will be shared every time", {
						icon: "success",
						button: false,
						timer: 2400,
					})
					//set session
					break
				default:
					swal("Your position won't be shared", {
						icon: "success",
						button: false,
						timer: 2400,
					})
					setCenterMap(defaultCenter)
			}
		})
	}

	return <div>{!session && openModal && alertModal()}</div>
}

export default AlertModal
