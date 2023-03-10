import React, {useState} from 'react'
 import {Link} from 'react-router-dom'
import {Container, Navbar, Nav} from 'react-bootstrap'
import { MdFastfood, MdAdd,MdLogout}  from 'react-icons/md';
import {FaShoppingBasket, FaUserCheck} from 'react-icons/fa'
import {BiUser} from 'react-icons/bi'
import {app} from "../firebase.config"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


const Header = () => {

const firebaseAuth = getAuth(app)
const provider = new GoogleAuthProvider();

const [{user}, dispatch ] =useStateValue()

const [isMenu, setIsMenu] = useState(false)

    const userLogin= async ()=>{
       if(!user){
        const {user: {refreshToken,providerData}} = await signInWithPopup(firebaseAuth, provider)
        dispatch({
            type: actionType.SET_USER,
            user: providerData[0]
        })
        localStorage.setItem("user", JSON.stringify(providerData[0]))
    }else{
      setIsMenu(!isMenu)
    }
       }

  const logout=()=>{
    setIsMenu(false)
    localStorage.clear()

    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }

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
         <div className='login-container' > 
         {user ? <FaUserCheck  className='login mt-2' onClick={userLogin}/> : <BiUser className='login mt-2' onClick={userLogin}/>}

        {
          isMenu &&  (
            
            <div className='userChoose'>
              { //sadece asli.aytass@gmail ile girdiğimde admin yetkisi gösterilecek
               user && user.email ==="asli.aytass@gmail.com"&& (
                 <Link className='link' to={'/createItem'}><p>New Item <MdAdd className='mdAdd ms-1'/></p></Link>
               )
              }
               <p onClick={logout}>Logout<MdLogout className='mdLogout ms-3'/></p>
             </div>
           )}
         </div>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>



    </div>
  )
}

export default Header