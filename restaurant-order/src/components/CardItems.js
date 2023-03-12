import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdAirlineSeatFlatAngled } from "react-icons/md";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const CardItems = ({ item, flag, setFlag }) => {
  const [qty, setQty] = useState(item.qty);
  const [items, setItems] = useState();
  const [{ cardItems }, dispatch] = useStateValue();

  const cardDispatch = () => {
    localStorage.setItem("cardItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARDITEMS,
      cardItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      cardItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag+1)
        }
      });
      cardDispatch();
    }else{
        if(qty ==1){
            items =cardItems.filter((item) => item.id !== id)
            setFlag(flag +1)
            cardDispatch();
        }else{
            setQty(qty-1)
            cardItems.map((item) => {
                if (item.id === id) {
                  item.qty -= 1;
                  setFlag (flag+1)
                }
              });
              cardDispatch();
        }
    }
  };

  useEffect(() => {
    setItems(cardItems)
  }, [qty,items]);

  return (
    <>
      <div key={item.id} className="col-3 ">
        <img className="basket-img m-2" src={item?.imageURL} />
      </div>
      <div className="col-6 d-flex align-item-center mt-3 justify-content-start">
        <p className="me-2">{item?.title}</p> /
        <p className="ms-2">$ {parseFloat(item?.price) * qty}</p>
      </div>
      <div className="col-3">
        <div className="mt-3 d-flex justify-content-around">
          <div className="">
            <button id="cardBtn">
              <AiOutlineMinus
                className="mb-1"
                onClick={() => updateQty("remove", item?.id)}
              />
            </button>
          </div>
          <div className="">
            <p>{qty}</p>
          </div>
          <div className="">
            <button className="d" id="cardBtn">
              <AiOutlinePlus
                className="mb-1"
                onClick={() => updateQty("add", item?.id)}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItems;
