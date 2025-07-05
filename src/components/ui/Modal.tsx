import { motion } from 'framer-motion'
import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  isOpen: boolean
}

export const Modal: FC<Props> = ({ children, isOpen }) => {
  return (
    <>
      {isOpen && (
        <motion.div
          className="bg-opacity-50 fixed inset-25 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}
