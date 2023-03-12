import React, { useEffect, useRef, useState } from "react";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import NotFound from "../img/NotFound.svg";
const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

 
  const [{ cardItems }, dispatch] = useStateValue();

  const addTocard = () => {

  
    dispatch({
      type: actionType.SET_CARDITEMS,
      cardItems: items,
    })
    localStorage.setItem("cardItems", JSON.stringify(items));
  };

  useEffect(()=> {
    addTocard()
  }, [items])

  //    useEffect(() => {
  //     rowContainer.current.scrollLeft += scrollValue;
  //    }, [scrollValue]);

  // useEffect(() => {
  //   addToCard();
  // }, [items]);

  return (
    <div className="container w-100 mt-5 cardContainer">
      <div className="row">
        <div className="col">
          <div
            className={`w-100 d-flex justify-content-around my-4   ${
              flag
                ? "overflow-x-scroll scrollbar-none "
                : "overflow-hidden flex-wrap justify-content-center"
            }`}
          >
            {data && data.length > 0 ? (
              data.map((item) => (
                <div key={item?.id} className="card-container">
                  <div className="card shadow">
                    <img
                      src={item?.imageURL}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <div className="d-flex flex-column justify-content-start">
                        <p className="card-text d-flex  justify-content-start text-secondary">
                          {item?.calories} calories
                        </p>
                        <p className="card-text d-flex  justify-content-start font-bold ">
                          $ {item?.price}
                        </p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.75 }}
                        className="add-basket"
                        onClick={() => setItems([...cardItems, item])}
                      >
                        <MdOutlineShoppingBasket className="text-white" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-100 flex flex-column align-item-center justify-center">
                {<img src={NotFound} className="notFound" />}
                <p className=" my-2">Items Not Available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowContainer;
