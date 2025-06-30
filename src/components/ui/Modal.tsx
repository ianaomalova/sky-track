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
          <motion.div
            className="mx-4 w-full max-w-md rounded-lg bg-white p-6"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
