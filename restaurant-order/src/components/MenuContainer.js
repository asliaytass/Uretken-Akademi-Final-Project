import React, { useEffect, useState } from "react";
import { BsPatchPlus } from "react-icons/bs";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import RowContainer from "./RowContainer";
const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");
  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <div className="container mb-3">
      <div className="row">
        <div className="d-flex justify-content-start">
          <button id="menu-btn">Menu</button>
        </div>
      </div>
      <div className="row mt-1 ">
        {categories &&
          categories.map((category) => (
            
            <div
              key={category.id}
              className="col  w-50 d-flex flex-wrap justify-content-center"
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                className={`shadow mt-4 ${
                  filter === category.urlParamName ? "active" : "menuButton"
                }`}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div className="  d-flex flex-column justify-content-center ">
                  <button className="mx-auto">
                    <BsPatchPlus />{" "}
                  </button>
                  <p className="d-flex justify-content-center mt-1">
                    {category.name}
                  </p>
                </div>
              </motion.button>
            </div>
          ))}
      </div>
      <div className="row ">
        <div className="col">
        <RowContainer flag={false} data={foodItems?.filter(n=>n.category=== filter)}/>
        </div>
     
      </div>


    </div>
  );
};

export default MenuContainer;
