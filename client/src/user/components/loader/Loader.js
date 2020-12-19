import React from "react"
import { motion } from "framer-motion"

// Import static files
import './Loader.css'

const Loader = () => (
    <motion.div
        className="loader"
        exit={{
            opacity: 0,
        }}
        transition={{ duration: 0.6 }}
    >
            <motion.div
                initial={{
                    opacity: 0,
                    y: -30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        yoyo: Infinity,
                    }
                }}
                exit={{
                    opacity: 0
                }}
                transition={{ duration: 0.6 }}
            >
                <svg width="35" height="50" viewBox="0 0 21 30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 10C16.299 10 21 14.4771 21 20C21 25.5228 16.299 30 10.5 30C4.70101 30 -1.95703e-07 25.5228 -4.37114e-07 20C-6.78525e-07 14.4772 4.70101 10 10.5 10Z" fill="url(#paint0_radial)"/>
                    <path d="M10.5 5C16.299 5 21 9.47715 21 15C21 20.5228 16.299 25 10.5 25C4.70101 25 -1.95703e-07 20.5228 -4.37114e-07 15C-6.78525e-07 9.47715 4.70101 5 10.5 5Z" fill="url(#paint1_radial)"/>
                    <path d="M10.5 -2.54513e-06C16.299 -2.79861e-06 21 4.47715 21 10C21 15.5228 16.299 20 10.5 20C4.70101 20 -1.95703e-07 15.5228 -4.37114e-07 10C-6.78525e-07 4.47715 4.70101 -2.29165e-06 10.5 -2.54513e-06Z" fill="url(#paint2_radial)"/>
                    <defs>
                        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.90789 27.6316) rotate(-40.6629) scale(18.5775 19.3459)">
                            <stop stop-color="#FF5555"/>
                            <stop offset="1" stop-color="#FFDE31"/>
                        </radialGradient>
                        <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(2.45 -5) rotate(63.0922) scale(27.0685 28.4998)">
                            <stop stop-color="#FF5555"/>
                            <stop offset="1" stop-color="#FFDE31"/>
                        </radialGradient>
                        <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.90789 17.6316) rotate(-40.6629) scale(18.5775 19.3459)">
                            <stop stop-color="#FF5555"/>
                            <stop offset="1" stop-color="#FFDE31"/>
                        </radialGradient>
                    </defs>
                </svg>
            </motion.div>
    </motion.div>
)

export default Loader
