import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthHeader from '../../components/AuthHeader';
import AuthSidebar from '../../components/AuthSidebar';
import AuthFooter from '../../components/AuthFooter';
import { Link, useLocation,useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// const location = useLocation()


const MainLayout = ({ children }) => {
  console.log('child',children)
  const { user, Logout } = useAuth();
  const [showLeftMenue, setShowLeftMenue] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const history = useHistory();
  const goToProfile = () => {
    console.log('Enrwechhsddh')
    history.push('/user/account');
  };

  const goToEditProfile = () => {
    history.push('/user/edit-profile');
  } 
  const goToChangePassword = () => {
    history.push('/user/change-passsword');
  } 

  const goToHelp = () => {
    history.push('/user/help');
  }

  console.log(user)
  return (
    <div className='body'>
      {/* <main className="custom-dashboard"> */}
      <div className="adminLayout">
        <div className={showLeftMenue ? "leftPanel show" : "leftPanel"}>

          <button className={showLeftMenue ? "mainDashboard-toggle active" : "mainDashboard-toggle"}
            onClick={() => setShowLeftMenue(!showLeftMenue)}>
            <div></div>
          </button>
          <div className="logoDiv" >
            <Link to="/user/dashboard"style={{color: "#dee2e6"}} >Testing</Link>
          </div>
          <ul>
            <li><Link to="/user/dashboard" className={history.location.pathname === "/user/dashboard" && "active"}><img src="../../images/home.svg" /> <span>Dashboard</span></Link></li>
            {/* <li><Link to="/user/all-accounts" className={( history.location.pathname === "/user/all-accounts" && "active" ) || ( history.location.pathname === "/user/create-new-account" && "active" )} ><img src="../../images/group.svg" /> <span>All Accounts</span></Link></li> */}
            
          </ul>
        </div>
        <div className="leftPanel-outerlayout" onClick={() => setShowLeftMenue(false)}></div>
        <div className="rightPanel">
          <div className="dashbordHead">
            <div className="dashbordHeadRow">
              <button className={showLeftMenue ? "mainDashboard-toggle active" : "mainDashboard-toggle"} onClick={() => setShowLeftMenue(!showLeftMenue)}>
                <div></div>
              </button>

              <div className="right">
                <div className="profileMenu">
                  <div class="dropdown">
                    <div className="avtarBlock" onClick={() => setShowAccountMenu(!showAccountMenu)}>
                      <div className="imgBlock">
                        <img src="../../images/people.png" />
                      </div>
                      {user &&
                      <p>{user.firstname} {user.lastname}</p>
                      }
                    </div>

                    <ul class={showAccountMenu ? "dropdown-menu show" : "dropdown-menu"} onClick={() => setShowAccountMenu(!showAccountMenu)}>
                      <li class="dropdown-menu-header">
                        <h5>Account</h5>
                        <button class="dropdown-close"><img src="/images/modaclosebtn.svg" alt="" /></button>
                      </li>
                      <li class="userAcountInfo">
                        <figure>
                          <img src="../../images/people.png" />
                          {user &&
                          <figcaption>
                          {/* {user.firstname} */}
                            <h4>{user.firstname} {user.lastname}</h4>
                            <p>{user.email}</p>
                          </figcaption>
                          }
                        </figure>
                      </li>

                      <li><a class="dropdown-item" onClick={goToEditProfile}>Edit Profile</a></li>
                      <li><a class="dropdown-item" onClick={goToChangePassword}>Change Password</a></li>
                      <li><a class="dropdown-item" onClick={goToHelp}>Help</a></li>
                      <li>
                        <div class="cdivider"></div>
                      </li>
                      <li>
                        {/* onClick={handleLogout} */}
                        <a class="dropdown-item" onClick={()=> Logout()}>Logout</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {children}
          <AuthFooter />
        </div>
      </div>
    </div >
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
