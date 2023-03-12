import React, { useRef } from "react";
import HomeContainer from "./HomeContainer";
import {GrNext,GrPrevious} from 'react-icons/gr'

import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";


const Main = () => {

  const [{ foodItems, cartShow }, dispatch] = useStateValue();
const rowContainerRef =useRef();

  return (
    <div className="main">
      <HomeContainer/>
      <MenuContainer/>   
     
     </div>
  
  );
};

export default Main;
