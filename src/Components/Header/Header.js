import React,{useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
function Header() {
  const history=useHistory()
  const{user} =useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <span>
              <Link to="/"><OlxLogo></OlxLogo></Link>
            </span>
        </div>
        <div className="placeSearch">
          
          <Search></Search>
          <input type="text" placeholder='Kerala'/>
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          ⌄

          {/* <Arrow sx={{ fontSize: "5px" }}></Arrow> */}
          {/* <i className='fas fa-angle-down'></i> */}
        </div>
        <div className="loginPage">
          <span> {user ? ` ${user.displayName}` : <Link to='/login' >Login</Link>}</span>
          
          
               

        </div>
         {user && <span className='logout' onClick={()=>{
           alert("Do you want logout")
            firebase.auth().signOut()
            history.push("/login")
         }}>Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>
              <Link to="/create">SELL</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
