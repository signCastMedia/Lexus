import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import AnimatedRoutes from "./utils/AnimatedRoutes";
import TopBar from "./components/Header/TopBar";
import Footer from "./components/Footer/Footer";
import toast, { Toaster } from "react-hot-toast";

import { MainContainer  } from "./App.styled";




function App() {
  return (
   
      <Router>
        <TopBar  />
        <MainContainer>
        <AnimatedRoutes/>
        </MainContainer>
        {/* <Footer /> */}
      </Router>

  );
}

export default App;
