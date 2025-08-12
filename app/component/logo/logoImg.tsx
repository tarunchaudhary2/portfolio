"use client"
import { motion } from "framer-motion"

const Logo = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 cursor-pointer group"
    >
      {/* Initials Badge */}
      <div className="relative">
        {/* Glassmorphic circle */}
        <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-purple-600/20 transition-all duration-300">
          {/* Initials */}
          <span className="text-white font-bold text-lg tracking-tighter">TC</span>
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-purple-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10" />
      </div>
      
      {/* Full Name - appears on larger screens */}
      <div className="hidden md:block">
        <motion.div
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white font-medium"
        >
          <div className="text-sm leading-tight">Tarun Chaudhary</div>
          {/* <div className="text-xs text-gray-300">John</div> */}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Logo


export const Logo1 = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 cursor-pointer group"
    >
      {/* Initials Badge */}
      <div className="relative">
        {/* Glassmorphic circle */}
        <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-purple-600/20 transition-all duration-300">
          {/* Initials */}
          <span className="text-black font-bold text-lg tracking-tighter">TC</span>
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-purple-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10" />
      </div>
      
      {/* Full Name - appears on larger screens */}
      <div className="hidden md:block">
        <motion.div
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#333] font-medium"
        >
          <div className="text-sm leading-tight text-[#333]">Tarun Chaudhary</div>
          {/* <div className="text-xs text-[#333]">John</div> */}
        </motion.div>
      </div>
    </motion.div>
  )
}