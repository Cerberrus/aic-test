import React from "react"
import { motion } from "framer-motion"

// Import static files
import './Loader.css'


// Animation setting
const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.2
        }
    },
    end: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

const loadingCircleVariants = {
    start: {
        y: "50%"
    },
    end: {
        y: "150%"
    }
}

const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut"
}

const Loader = () => {
    return (
        <motion.div
            className="loader"
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
        >
            <motion.span
                className="loader__circle"
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                className="loader__circle"
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                className="loader__circle"
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
        </motion.div>
    )
}

export default Loader