import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from '../Header';

import * as Styled from './styles';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ checkAuthentication, children }) => {
  const currentPath = useLocation().pathname;
  const marginTop = currentPath === '/' ? 'mt-40' : 'mt-20';

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Styled.Layout>
          <Header />
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex-1 ${marginTop}`}
          >
            {children}
          </motion.div>
          <Footer />
        </Styled.Layout>
      </AnimatePresence>
    </>
  );
};

export default Layout;
