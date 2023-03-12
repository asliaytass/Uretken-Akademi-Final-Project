import React from 'react'
import Delivery from "../img/delivery.png";
import {BsCurrencyDollar}  from 'react-icons/bs'
import HeroBg from '../img/heroBg.png';
import I5 from '../img/i5.png'
import { heroData } from '../utils/data';

const HomeContainer = () => {
  return (
    <div>

<div className="container mt-3">
        {/* CONTAINER ROW START*/}
        <div className="row">
          {/* LEFT COL START*/}
          <div className="col-sm mb-5">
            {/* LEFT FIRST ROW */}
            <div className="row ">
              <div className="col-sm-4 ">
                <div className="bike-delivery">
                  <p className="me-2 mt-2">Bike Delivery</p>
                  <div className="delivery-container">
                    <img src={Delivery} alt="delivery" />
                  </div>
                </div>
              </div>
            </div>

            {/* LEFT SECOND ROW*/}
            <div className="row ">
              <div className="col-sm text mt-4">
                <p className="mt-2">The Best Or Nothing</p>
              </div>
            </div>
            {/* LEFT THIRD ROW*/}
            <div className="row ">
              <div className="col-sm">
                <small className="mt-1 lorem">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur
                </small>
              </div>
            </div>
            {/* LEFT FOURTH ROW*/}
            <div className="row ">
              <div className="col-sm btn-container">
                <button type="button" className="btn btn-outline-light mt-4">
                  Order Now
                </button>
              </div>
            </div>
          </div>
          {/* LEFT COL FINISH*/}

          {/* RIGHT COL START*/}
          <div className="col-sm">

            <div className='right-col mb-5'>
                <img src={HeroBg} alt='hero-bg' className='hero-bg'/>
               
                <div className='small-img d-flex flex-wrap'>
                {heroData && heroData.map(n => (
                    <div key={n.id} className="d-flex flex-column m-3">
                    <img src= {n.imageSrc} alt="I5" className='m-0'/>
                    <p >{n.name}</p>
                    <p >{n.desc}</p>
                    <p className='text-black'><BsCurrencyDollar /> {n.price}</p>
                    </div>

                    ))}
    
                    
                   
                </div>


            </div>


          </div>
          {/* RIGHT COL FINISH*/}
        </div>
        {/* CONTAINER ROW FINISH*/}
      </div>

    </div>
  )
}

export default HomeContainer