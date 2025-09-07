"use client"

import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function BuyMeACoffeeWidget() {
  const [shake, setShake] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true)
      setTimeout(() => setShake(false), 1000) // shake lasts 1s
    }, 60000) // every 60s

    return () => clearInterval(interval)
  }, [])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href="https://www.buymeacoffee.com/zainolamzar"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            fixed z-50 flex items-center justify-center
            w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
            rounded-full shadow-lg transition-transform
            bg-[#FF813F] dark:bg-white
            hover:scale-110
            ${shake ? "animate-shake" : ""}
          `}
          style={{
            bottom: "calc(1rem + env(safe-area-inset-bottom))",
            right: "calc(1rem + env(safe-area-inset-right))",
          }}
          aria-label="Buy me a coffee"
        >
          {/* Buy Me a Coffee styled Cup Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 884 1279"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-white dark:fill-[#FF813F]"
          >
            <path d="M791 413l25-183H154l25 183h612zm-42 301l50-373H157l50 373h542zM206 863c0 37 31 67 68 67h335c37 0 67-30 67-67V782H206v81zm492-160l61-453H126l61 453h511z"/>
          </svg>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>Buy me a coffee</p>
      </TooltipContent>
    </Tooltip>
  )
}
