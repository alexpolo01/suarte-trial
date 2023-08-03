import { motion } from 'framer-motion';

export default function FadeIn({ children }) {
  return (
    <>
      <motion.div style={{ width: '100%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
