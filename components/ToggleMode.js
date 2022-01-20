import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"

import { MdModeNight } from "react-icons/md"
import { MdLightMode } from "react-icons/md"

function ToggleMode() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), [])

	const toggleMode = () => {
		if (theme === "system" || theme === "light") setTheme("dark")
		if (theme === "dark") setTheme("light")
	}

	if (!mounted) return null
	return (
		<div
			onClick={() => toggleMode()}
			className='pt-1 mx-3 cursor-pointer hover:text-orange-300'>
			{theme === "system" || theme === "light" ? (
				<MdModeNight />
			) : (
				<MdLightMode />
			)}
		</div>
	)
}

export default ToggleMode
