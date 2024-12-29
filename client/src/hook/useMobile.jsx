
import { useEffect, useState } from 'react'

const useMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)
    const handleResize = () => {
        const checkBreakPoint = window.innerWidth < breakpoint
        setIsMobile(checkBreakPoint)
    }
    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [isMobile])
    return [isMobile]
}

export default useMobile