import { useRouter } from "next/router"
import Link from "next/link"

function ActiveLink({ children, href }) {
	const router = useRouter()
	const handleClick = e => {
		e.preventDefault()
		router.push(href)
	}
	return (
		<Link href={href}>
			<a
				className='mr-10  hover:text-orange-300 transition ease-in duration-200  '
				onClick={handleClick}>
				<span
					className={
						router.asPath === href
							? "border-cyan-100 border-b-2 pb-3 hover:border-orange-300"
							: "border-none"
					}>
					{children}
				</span>
			</a>
		</Link>
	)
}

export default ActiveLink
