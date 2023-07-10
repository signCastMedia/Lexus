import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <>
          <Route index path="/" element={<Home />} />
        </>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
