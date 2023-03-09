import React from 'react'
import {Container, Navbar, Nav} from 'react-bootstrap'
import { MdFastfood}  from 'react-icons/md';
import {FaShoppingBasket} from 'react-icons/fa'
import {BiUser} from 'react-icons/bi'

const Header = () => {
  return (
    <div>

<Navbar bg="light" expand="lg">
      <Container >
        <div>
        <MdFastfood className='mb-1'/> 
        <Navbar.Brand href="#" className="shopName ms-2">Food</Navbar.Brand>
        </div>
      
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
         
          <Nav
            className=" mx-auto my-2 my-lg-0 d-flex "
            style={{ maxHeight: '100px' , minHeight:"70px"} }
            navbarScroll
          >
            <Nav.Link href="#action1" className='mt-3 '>Home</Nav.Link>
            <Nav.Link href="#action2" className='mt-3 '>Menu</Nav.Link>
            <Nav.Link href="#action2" className='mt-3 '>About Us</Nav.Link>
          </Nav>
          
      
          <div className='basket-container me-2'>
         <FaShoppingBasket className='basket mt-2 '/>
          <div className='basketInfo  mt-1'>
            <p>0</p>
          </div>
         </div>
         <div className='login-container'><BiUser className='login mt-2'/></div>
          



        
        </Navbar.Collapse>
      </Container>
    </Navbar>



    </div>
  )
}

export default Header