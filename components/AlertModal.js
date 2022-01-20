import React, { useState, useEffect } from "react"
import swal from "sweetalert"
import { handleSession } from "../lib/weather_utils.js"

function AlertModal({ setCenterMap, setShare, defaultCenter }) {
	const [openModal, setOpenModal] = useState(false)
	const [session, setSession] = useState(false)

	useEffect(() => {
		// check session
		const sessionCheck = window.sessionStorage.getItem("position")
		if (sessionCheck && sessionCheck === "false") {
			setSession(true)
			setOpenModal(false)
			setShare(false)
		}
		if (sessionCheck && sessionCheck === "true") {
			setSession(true)
			setOpenModal(false)
			setShare(true)
		}
		if (sessionCheck == null || sessionCheck === "") {
			setSession(false)
			setOpenModal(true)
		}
		// eslint-disable-next-line
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
				never: {
					text: "Never",
					value: "never",
				},
			},
		}).then(value => {
			switch (value) {
				case "no":
					setSession(false)
					setCenterMap(defaultCenter)
					swal("Your position won't be shared", {
						icon: "success",
						button: false,
						timer: 2400,
					})
					break
				case "never":
					if (typeof window !== "undefined") handleSession("position", "false")
					setSession(false)
					setCenterMap(defaultCenter)
					swal("Your position will never be shared", {
						icon: "success",
						button: false,
						timer: 2400,
					})
					break
				case "once":
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
