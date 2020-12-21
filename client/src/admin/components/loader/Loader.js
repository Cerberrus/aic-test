import React from "react"
import { motion } from "framer-motion"

// Import static files
import "./Loader.css"
import logo from "~src/static/images/logo.png"

const Loader = () => (
    <motion.div
        className="adminLoader"
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
            <img src={logo} aria-hidden={true}/>
        </motion.div>
    </motion.div>
)

export default Loader
