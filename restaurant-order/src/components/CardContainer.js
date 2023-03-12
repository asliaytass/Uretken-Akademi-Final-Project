import React, { useEffect, useState } from "react";
import { actionType } from "../context/reducer";

import { useStateValue } from "../context/StateProvider";
import EmptyCard from '../img/emptyCart.svg'
import CardItems from "./CardItems";

const CardContainer = () => {
  const [{ cardItems, user },dispatch] = useStateValue();
  const [tot, setTot] = useState(0);
  const [flag, setFlag] = useState(1);

  useEffect(() => {
    let totalPrice = cardItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);


  const clearCard = () => {
    dispatch({
      type: actionType.SET_CARDITEMS,
      cardItems: [],
    });
    localStorage.setItem("cardItems", JSON.stringify([]));
  };




  return (
    <div className=" container d-flex justify-content-center">

       {
          cardItems && cardItems.length > 0 ? (
            <div id="basket-container" className=" w-50 row mt-5">
       
        {cardItems &&
          cardItems.map((item) => (
            <CardItems
            key ={item.id} item={item}
            />
          ))}

        <div className=" card-end d-flex justify-content-end">
          <p className="me-2">Sub Total </p> / <p className="ms-2">$ {tot}</p>
        </div>
        <div className=" d-flex justify-content-end">
          <p className="me-2">Delivery </p> / <p className="ms-2">$ 5</p>
        </div>

        <div className="mt-5 d-flex justify-content-end">
          <p className="me-2">Total </p> / <p className="ms-2">$ {tot + 5}</p>
        </div>
        {user ?(<div className="mt-5 d-flex justify-content-center">
          <button className="check py-2">Check Out</button>
        </div>): (<div className="mt-5 d-flex justify-content-center">
          <button className="check py-2">Login to check out</button>
        </div>)}




        
        <div className="mt-5 d-flex justify-content-end">
          <button className="clear " onClick={clearCard}>Clear</button>
        </div>
      </div>): (
        <div  className=" w-50 row mt-5">
          <div className="d-flex flex-column justify-content-center">
          <img src={EmptyCard} className="w-100 "/> 
          <p>Add some items to your card</p>
          </div>

          
        </div>

      )}



      
    </div>
  );
};

export default CardContainer;
