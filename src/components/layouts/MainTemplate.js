/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory, useNavigate, Link, Outlet, useLocation, NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import React, { Suspense, useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { prefix } from "@fortawesome/free-solid-svg-icons";
import { checkUsersCount, selectUsersCount } from "../../redux/features/users/usersCountSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkSelectedMenu, selectedMenu } from "../../redux/features/dropdown/selectedMenuSlice";
import { ACCESSWARRANT_ROUTE, COMPILATION_ROUTE, DEFACTURA_ROUTE, DISASSEMBLY_ROUTE, EXPIREDOBSPRODUCTS_ROUTE, FRAGMENTATION_ROUTE, INVENTORYBYSCANNER_ROUTE, INVENTORY_ROUTE, LISTOFPRODUCTVALUES_ROUTE, LISTOFSET_ROUTE, MINLIMITPRODUCTS_ROUTE, MOVEMENTSOFPRODUCTS_ROUTE, PARTNERS_ROUTE, PRICELIST_ROUTE, PRODUCTCHECKOUT_ROUTE, PRODUCTCOVER_ROUTE, PRODUCTREASSESSMENT_ROUTE, REQUIREMENTS_ROUTE, RETAILPURCHASE_ROUTE, SUPPLIERS_ROUTE, WARREHOUSESLIST_ROUTE } from "../../utils/constants";
import sideSetupSvg from '../../dist/svg/sideSetup.svg'
import packageJson from '../../../package.json';

const MainTemplate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    const dispatch = useDispatch()
    const selectMenu = useSelector(selectedMenu)
    const [activeDropdown, setActiveDropdown] = useState( localStorage.getItem("selectedMenu") || selectMenu);
    //-------------------
    const usersCount = useSelector(selectUsersCount)
    //-------------------
    //-------------------
    const [isActive, setIsActive] = useState(false);
	const menuClick = event => {
		setIsActive(current => !current);
	};
	
	const [misActive, msetIsActive] = useState(false);
	const mmenuClick = event => {
		msetIsActive(current => !current);
	};
	
	const [sisActive, ssetIsActive] = useState(false);
	const smenuClick = event => {
		ssetIsActive(current => !current);
	};
    //---------------------------------------------//
	const [misActive1, msetIsActive1] = useState(localStorage.getItem("activeMenu") || false);
	
	
	const [sisActive1, ssetIsActive1] = useState(localStorage.getItem("activeSubMenu") || false);
	
    const handleSubmenuClick = (menu,subMenu) => {
        ssetIsActive1(subMenu)
        msetIsActive1(menu)
        dispatch(checkSelectedMenu(subMenu))
        localStorage.setItem("activeMenu", menu);
        localStorage.setItem("activeSubMenu", JSON.stringify(subMenu));
       

    }
        //console.log(selectMenu)
  
   //--------------------------------------
   useEffect(() => {
    // localStorage.setItem("activeMenu", JSON.stringify(location.pathname.split('/')[1]));
    // const subMenuIsActiveData = JSON.parse(localStorage.getItem('activeSubMenu'));
    // const menuIsActiveData = JSON.parse(localStorage.getItem('activeMenu'));
    // //const storedUserData = JSON.parse(localStorage.getItem('userData'));

    // //storedUserData?setUserData(storedUserData):setUserData('')
    // menuIsActiveData?msetIsActive1(menuIsActiveData):msetIsActive1('')
    // subMenuIsActiveData?ssetIsActive1(subMenuIsActiveData):ssetIsActive1('')
  }, [location?.pathname]);
   //--------------------------------------
    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    const  isActiceDD = (currentDD) => {     
        if(activeDropdown === currentDD){
            setActiveDropdown(current => '');        
        }else{
            setActiveDropdown(current => currentDD);
            localStorage.setItem("selectedMenu", currentDD);

        }        
    }
    return (
        <section>
            {/* Wrapper */}
            <div className="hk-wrapper" data-layout="vertical" data-layout-style={misActive ? 'collapsed' : 'default'} data-hover={misActive ? 'active' : ''} data-menu="light" data-footer="simple">
                {/* Top Navbar */}
                <nav className="hk-navbar navbar navbar-expand-xl navbar-light fixed-top">
                    <div className="container-fluid">
                    {/* Start Nav */}
                        <div className="nav-start-wrap">
                            <button className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle d-xl-none" onClick={mmenuClick}>
                                <span className="icon">
                                    <span className="feather-icon">
                                        {/*<i data-feather="align-left"></i>*/}
                                        <i className="fas fa-align-left"></i>
                                    </span>
                                </span>
                            </button>
                            {/* Search */}
                            <form className="dropdown navbar-search">
                                <div className={sisActive ? 'dropdown-toggle no-caret show' : 'dropdown-toggle no-caret'} data-bs-toggle="dropdown" data-dropdown-animation data-bs-auto-close="outside">
                                    <a  href="/privacy-policy" className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover  d-xl-none" onClick={smenuClick}>
                                        <span className="icon">
                                            <span className="feather-icon">
                                                {/*<i data-feather="search"></i>*/}
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </span>
                                        </span>
                                    </a>
                                    {/* <div className="input-group d-xl-flex d-none">
                                        <span className="input-affix-wrapper input-search affix-border">
                                            <input type="text" className="form-control  bg-transparent"  data-navbar-search-close="false" placeholder="Փնտրել..." aria-label="Փնտրել" />
                                            <span className="input-suffix">
                                                <span>/</span>
                                                <span className="btn-input-clear">
                                                    <i className="bi bi-x-circle-fill"></i>
                                                </span>
                                                <span className="spinner-border spinner-border-sm input-loader text-primary" role="status">
                                                    <span className="sr-only">Բեռնում...</span>
                                                </span>
                                            </span>
                                        </span>
                                    </div> */}
                                </div>
                                <div  className={sisActive ? 'dropdown-menu p-0 show' : 'dropdown-menu p-0'}>
                                    {/* Mobile Search */}
                                    <div className="dropdown-item d-xl-none bg-transparent" >
                                        <div className="input-group mobile-search">
                                            <span className="input-affix-wrapper input-search">
                                                <input type="text" className="form-control" placeholder="Search..." aria-label="Search"/>
                                                <span className="input-suffix" onClick={smenuClick}>
                                                    <span className="btn-input-clear"><i className="bi bi-x-circle-fill"></i></span>
                                                    <span className="spinner-border spinner-border-sm input-loader text-primary" role="status">
                                                        <span className="sr-only">Բեռնում...</span>
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    {/* Mobile Search */}
                                    <div data-simplebar className="dropdown-body p-2">
                                        <h6 className="dropdown-header">Recent Search</h6>
                                        <div className="dropdown-item bg-transparent">
                                            <a href="/privacy-policy" className="badge badge-pill badge-soft-secondary">Grunt</a>
                                            <a href="/privacy-policy" className="badge badge-pill badge-soft-secondary">Node JS</a>
                                            <a href="/privacy-policy" className="badge badge-pill badge-soft-secondary">SCSS</a>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <h6 className="dropdown-header">Help</h6>
                                        <a href="/privacy-policy" className="dropdown-item">
                                            <div className="media align-items-center">
                                                <div className="media-head me-2">
                                                    <div className="avatar avatar-icon avatar-xs avatar-soft-light avatar-rounded">
                                                        <span className="initial-wrap">
                                                            <span className="svg-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-corner-down-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                    <path d="M6 6v6a3 3 0 0 0 3 3h10l-4 -4m0 8l4 -4"></path>
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    How to setup theme?
                                                </div>
                                            </div>
                                        </a>
                                        <a href="/privacy-policy" className="dropdown-item">
                                            <div className="media align-items-center">
                                                <div className="media-head me-2">
                                                    <div className="avatar avatar-icon avatar-xs avatar-soft-light avatar-rounded">
                                                        <span className="initial-wrap">
                                                            <span className="svg-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-corner-down-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                    <path d="M6 6v6a3 3 0 0 0 3 3h10l-4 -4m0 8l4 -4"></path>
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    View detail documentation
                                                </div>
                                            </div>
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <h6 className="dropdown-header">Users</h6>
                                        <a href="/privacy-policy" className="dropdown-item">
                                            <div className="media align-items-center">
                                                <div className="media-head me-2">
                                                    <div className="avatar avatar-xs avatar-rounded">
                                                        <img src="/dist/img/avatar3.jpg" alt="user" className="avatar-img"/>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    Sarah Jone
                                                </div>
                                            </div>
                                        </a>
                                        <a href="/privacy-policy" className="dropdown-item">
                                            <div className="media align-items-center">
                                                <div className="media-head me-2">
                                                    <div className="avatar avatar-xs avatar-soft-primary avatar-rounded">
                                                        <span className="initial-wrap"></span>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    Joe Jackson
                                                </div>
                                            </div>
                                        </a>
                                        <a href="/privacy-policy" className="dropdown-item">
                                            <div className="media align-items-center">
                                                <div className="media-head me-2">
                                                    <div className="avatar avatar-xs avatar-rounded">
                                                        <img src="/dist/img/avatar4.jpg" alt="user" className="avatar-img"/>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    Maria Richard
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="dropdown-footer d-xl-flex d-none">
                                        <a href="/privacy-policy">
                                            <u>Search all</u>
                                        </a>
                                    </div>
                                </div>
                            </form>
                            {/* /Search */}
                        </div>
                        {/* /Start Nav */}
                        {/* End Nav */}
                        <div className="nav-end-wrap" onClick={menuClick}>
                            <ul className="navbar-nav flex-row">
                                <li className="nav-item">
                                    <div className="dropdown ps-2">
                                        <a className=" dropdown-toggle no-caret" href="#" role="button" data-bs-display="static" data-bs-toggle="dropdown" data-dropdown-animation data-bs-auto-close="outside" aria-expanded="false">
                                            <div className="avatar avatar-rounded avatar-xs">
                                                <img src="/dist/img/avatar12.jpg" alt="user" className="avatar-img"/>
                                            </div>
                                        </a>
                                        <div className={isActive ? 'dropdown-menu dropdown-menu-end show showSlow' : 'dropdown-menu dropdown-menu-end showSlow'}>
                                            <div className="p-2">
                                                <div className="media">
                                                    <div className="media-head me-2">
                                                        <div className="avatar avatar-primary avatar-sm avatar-rounded">
                                                            <span className="initial-wrap">{}</span>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <div className="fs-7">{}</div>
                                                        <a href="/login" className="d-block fs-8 link-secondary" onClick={signOut}><u>Դուրս գալ</u></a>
                                                    </div>
                                                </div>
                                            </div>
                                      <a className="dropdown-item" href="/">Օգնություն և սպասարկում</a>
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>
                  {/* /End Nav */}
                  </div>									
              </nav>
              {/* /Top Navbar */}
  
              {/* Vertical Nav */}
              <div className="hk-menu">
              {/* Brand */}
                  <div className="menu-header">
                      <span>
                          <a className="navbar-brand" href="/dashboard">
                              <img className="brand-img img-fluid" src="/dist/img/logo-dark-blue-small.svg" alt="brand" />
                              <img className="brand-img img-fluid" src="/dist/img/text.png" alt="brand" />
                          </a>
                          <button className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle" onClick={mmenuClick}>
                              <span className="icon">
                                  <span className="svg-icon fs-5">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                          <line x1="10" y1="12" x2="20" y2="12"></line>
                                          <line x1="10" y1="12" x2="14" y2="16"></line>
                                          <line x1="10" y1="12" x2="14" y2="8"></line>
                                          <line x1="4" y1="4" x2="4" y2="20"></line>
                                      </svg>
                                  </span>
                              </span>
                          </button>
                      </span>
                  </div>
                  {/* /Brand */}
  
                  {/* Main Menu */}
                  <div data-simplebar className="nicescroll-bar">
                      <div className="menu-content-wrap">
                          <div className="menu-group">
                              <ul className="navbar-nav flex-column">
								  <li className="nav-item">
                                      <Link className={misActive1 === "/" ||  location.pathname==="/" ?"nav-link active":"nav-link"} to="./"
                                      onClick={() => handleSubmenuClick("home","")}>
                                          <span className="nav-icon-wrap">
                                              <span className="svg-icon">
                                              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0028 9.63158C10.6438 9.63158 9.54209 10.692 9.54209 12C9.54209 13.308 10.6438 14.3684 12.0028 14.3684C13.3618 14.3684 14.4635 13.308 14.4635 12C14.4635 10.692 13.3618 9.63158 12.0028 9.63158ZM7.90162 12C7.90162 9.81993 9.73778 8.05263 12.0028 8.05263C14.2678 8.05263 16.104 9.81993 16.104 12C16.104 14.1801 14.2678 15.9474 12.0028 15.9474C9.73778 15.9474 7.90162 14.1801 7.90162 12Z" fill="#030D45"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4013 12L20.6372 12.1317C21.9353 12.8564 22.384 14.4527 21.6424 15.7085L20.1373 18.2571C19.3866 19.5284 17.7029 19.9668 16.3886 19.2331L16.1861 19.12V19.3684C16.1861 20.8218 14.962 22 13.452 22H10.4674C8.95737 22 7.73326 20.8218 7.73326 19.3684V19.1537L7.63601 19.2093C6.32014 19.9618 4.61882 19.5281 3.86247 18.2473L2.35757 15.699C1.62153 14.4526 2.05745 12.8685 3.33798 12.1362L3.57614 12L3.33798 11.8638C2.05745 11.1315 1.62153 9.5474 2.35756 8.30102L3.86247 5.75268C4.61882 4.47192 6.32014 4.0382 7.63601 4.79069L7.73326 4.84631V4.63158C7.73326 3.17819 8.95737 2 10.4674 2H13.452C14.962 2 16.1861 3.1782 16.1861 4.63158V4.87996L16.3886 4.76691C17.7029 4.03322 19.3866 4.47158 20.1373 5.74292L21.6424 8.29153C22.384 9.54727 21.9353 11.1436 20.6372 11.8683L20.4013 12ZM18.7627 12.9106C18.0361 12.5049 18.0361 11.4951 18.7627 11.0894L19.8141 10.5025C20.3334 10.2126 20.5129 9.57406 20.2162 9.07176L18.7112 6.52315C18.4108 6.01462 17.7374 5.83928 17.2117 6.13275L16.188 6.70421C15.4589 7.11123 14.5457 6.6049 14.5457 5.79366V4.63158C14.5457 4.05023 14.056 3.57895 13.452 3.57895H10.4674C9.86337 3.57895 9.37373 4.05023 9.37373 4.63158V5.77123C9.37373 6.5874 8.45047 7.09307 7.72146 6.67618L6.79807 6.14812C6.27172 5.84713 5.5912 6.02061 5.28866 6.53292L3.78375 9.08126C3.48933 9.57981 3.6637 10.2135 4.17591 10.5064L5.20531 11.095C5.91867 11.503 5.91867 12.497 5.20531 12.905L4.17591 13.4936C3.6637 13.7865 3.48933 14.4202 3.78375 14.9187L5.28866 17.4671C5.5912 17.9794 6.27172 18.1529 6.79807 17.8519L7.72146 17.3238C8.45047 16.9069 9.37373 17.4126 9.37373 18.2288V19.3684C9.37373 19.9498 9.86337 20.4211 10.4674 20.4211H13.452C14.056 20.4211 14.5457 19.9498 14.5457 19.3684V18.2063C14.5457 17.3951 15.4589 16.8888 16.188 17.2958L17.2117 17.8672C17.7374 18.1607 18.4108 17.9854 18.7112 17.4768L20.2162 14.9282C20.5129 14.4259 20.3334 13.7874 19.8141 13.4975L18.7627 12.9106Z" fill="#030D45"/>
                                            </svg>
                                              </span>
                                          </span>
                                          <span className="nav-link-text">Կառ․ վահանակ</span>
                                      </Link>
                                  </li>	
                              </ul>	
                          </div>
                          <div className="menu-gap"></div>
                          <div className="menu-group">
                              <div className="nav-header">
                                  <span>Գործիքակազմ</span>
                              </div>
                              <ul className="navbar-nav flex-column">
                                <li className="nav-item">
                                        <a className={misActive1 === "users" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('users')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">

                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h1"></path>
                                                    <circle cx="16.5" cy="17.5" r="2.5"></circle>
                                                    <path d="M18.5 19.5l2.5 2.5"></path>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Օգտ. կառավարում</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='users' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children '} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    {/* <li className="nav-item">
                                                        <Link className={sisActive1==="privileges" || location.pathname==="/users/privileges"?"nav-link active":"nav-link"} to="./users/privileges"
                                                        onClick={()=>handleSubmenuClick("users","privileges")}>
                                                            <span className="nav-link-text">Արտոնություններ</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="roles" || location.pathname==="/users/roles"?"nav-link active":"nav-link"} to="./users/roles"
                                                        onClick={()=>handleSubmenuClick("users","roles")}>
                                                            <span className="nav-link-text">Դերեր</span>
                                                        </Link>
                                                    </li> */}
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="users" || location.pathname==="/users/users"?"nav-link active":"nav-link"} to="./users/users/page/1"
                                                        onClick={()=>handleSubmenuClick("users","users")}>  
                                                <span className="badge badge-sm badge-primary badge-sm badge-pill position-top-start ">{usersCount}</span>
                                                            <span className="nav-link-text">Օգտատերեր</span>
                                                         <span className="nav-icon-wrap position-relative">
                                              
                                            </span>                                                     
                                                        </Link>
                                                    </li>
                                                </ul>	
                                            </li>	
                                        </ul>	
                                </li>


                                    <li className="nav-item">
                                        <a className={misActive1 === "workers" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('workers')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.54831C10.7255 5.54831 9.69231 6.58817 9.69231 7.87089C9.69231 9.15362 10.7255 10.1935 12 10.1935C13.2745 10.1935 14.3077 9.15362 14.3077 7.87089C14.3077 6.58817 13.2745 5.54831 12 5.54831ZM8.15385 7.87089C8.15385 5.73302 9.87583 3.99992 12 3.99992C14.1242 3.99992 15.8462 5.73302 15.8462 7.87089C15.8462 10.0088 14.1242 11.7419 12 11.7419C9.87583 11.7419 8.15385 10.0088 8.15385 7.87089Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4825 14.8386C8.91318 14.8386 7.64103 16.119 7.64103 17.6984C7.64103 17.7292 7.64361 17.754 7.64706 17.7726C7.64752 17.7751 7.64798 17.7774 7.64844 17.7795C8.05927 18.0084 9.22185 18.4515 12 18.4515C14.7781 18.4515 15.9407 18.0084 16.3516 17.7795C16.352 17.7774 16.3525 17.7751 16.3529 17.7726C16.3564 17.754 16.359 17.7292 16.359 17.6984C16.359 16.119 15.0868 14.8386 13.5175 14.8386H10.4825ZM6.10256 17.6984C6.10256 15.2638 8.06352 13.2902 10.4825 13.2902H13.5175C15.9365 13.2902 17.8974 15.2638 17.8974 17.6984C17.8974 18.1328 17.7512 18.7483 17.17 19.0921C16.4639 19.5098 15.0065 19.9999 12 19.9999C8.99348 19.9999 7.53615 19.5098 6.82998 19.0921C6.24882 18.7483 6.10256 18.1328 6.10256 17.6984Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.642 5.60438C16.7529 5.19162 17.1752 4.94744 17.5853 5.059C18.9891 5.44084 19.9487 6.82831 19.9487 8.38702C19.9487 10.0344 18.8254 11.5422 17.2199 11.7363C16.7981 11.7873 16.4151 11.4845 16.3645 11.06C16.3138 10.6355 16.6147 10.25 17.0365 10.199C17.7387 10.1141 18.4103 9.39004 18.4103 8.38702C18.4103 7.43484 17.8314 6.72989 17.1839 6.55375C16.7738 6.4422 16.5312 6.01715 16.642 5.60438Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4245 13.9162C18.5058 13.4966 18.9098 13.2227 19.3267 13.3046C20.8794 13.6093 22 14.9784 22 16.5705V16.989C22 17.3864 21.8816 17.9868 21.3303 18.3414C20.9857 18.5631 20.4635 18.7915 19.6739 18.9523C19.2575 19.0371 18.8517 18.7661 18.7674 18.347C18.6832 17.9279 18.9524 17.5194 19.3688 17.4347C19.9544 17.3154 20.2853 17.1655 20.4558 17.0651L20.456 17.0637C20.4592 17.045 20.4615 17.0201 20.4615 16.989V16.5705C20.4615 15.7192 19.8624 14.9873 19.0322 14.8243C18.6153 14.7425 18.3432 14.3359 18.4245 13.9162Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.35797 11.1697C7.24713 11.5824 6.82481 11.8266 6.41469 11.715C5.01092 11.3332 4.05128 9.94573 4.05128 8.38702C4.05128 6.73965 5.1746 5.2318 6.78005 5.03771C7.20186 4.98671 7.58487 5.28952 7.63554 5.71404C7.6862 6.13857 7.38534 6.52405 6.96354 6.57504C6.2613 6.65994 5.58974 7.384 5.58974 8.38702C5.58974 9.3392 6.16857 10.0442 6.81608 10.2203C7.2262 10.3318 7.46882 10.7569 7.35797 11.1697Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.57552 13.9162C5.4942 13.4966 5.09025 13.2227 4.67327 13.3046C3.1206 13.6093 2 14.9784 2 16.5705V16.989C2 17.3864 2.11838 17.9868 2.66968 18.3414C3.01428 18.5631 3.53653 18.7915 4.32609 18.9523C4.74249 19.0371 5.14834 18.7661 5.23259 18.347C5.31683 17.9279 5.04757 17.5194 4.63117 17.4347C4.04556 17.3154 3.71472 17.1655 3.54423 17.0651L3.544 17.0637C3.54082 17.045 3.53846 17.0201 3.53846 16.989V16.5705C3.53846 15.7192 4.1376 14.9873 4.96776 14.8243C5.38474 14.7425 5.65684 14.3359 5.57552 13.9162Z" fill="#030D45"/>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Աշխատակիցներ</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='workers' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children '} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="roles" || location.pathname==="/workers/roles/page/:pageNumber"?"nav-link active":"nav-link"} to="./workers/roles/page/1"
                                                        onClick={()=>handleSubmenuClick("workers","roles")}>
                                                            <span className="nav-link-text">Աշխատակցի պաշտոն</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="workers" || location.pathname==="/workers/workers/page/:pageNumber"?"nav-link active":"nav-link"} to="./workers/workers/page/1"
                                                        onClick={()=>handleSubmenuClick("workers","workers")}>
                                                            <span className="nav-link-text">Աշխատակից</span>
                                                        </Link>
                                                    </li>
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className={misActive1 === "customers" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('customers')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.36264 3.53846C7.60261 3.53846 6.17582 4.96525 6.17582 6.72528C6.17582 8.4853 7.60261 9.91209 9.36264 9.91209C11.1227 9.91209 12.5494 8.4853 12.5494 6.72528C12.5494 4.96525 11.1227 3.53846 9.36264 3.53846ZM4.63736 6.72528C4.63736 4.11558 6.75294 2 9.36264 2C11.9723 2 14.0879 4.11558 14.0879 6.72528C14.0879 9.33497 11.9723 11.4506 9.36264 11.4506C6.75294 11.4506 4.63736 9.33497 4.63736 6.72528Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.41153 15.4066C5.27249 15.4066 3.53846 17.1406 3.53846 19.2797C3.53846 19.3861 3.55682 19.4596 3.57526 19.5013C3.59011 19.5348 3.60106 19.5412 3.60591 19.544C4.13353 19.8541 5.65133 20.4615 9.36264 20.4615C13.0739 20.4615 14.5913 19.8543 15.1189 19.5443C15.1238 19.5414 15.1352 19.5348 15.15 19.5013C15.1685 19.4596 15.1868 19.3861 15.1868 19.2797C15.1868 17.1406 13.4528 15.4066 11.3137 15.4066H7.41153ZM2 19.2797C2 16.291 4.42282 13.8681 7.41153 13.8681H11.3137C14.3024 13.8681 16.7253 16.291 16.7253 19.2797C16.7253 19.7944 16.5513 20.4869 15.8984 20.8706C15.0381 21.3763 13.2089 22 9.36264 22C5.51639 22 3.68722 21.3763 2.82683 20.8706C2.17398 20.4869 2 19.7944 2 19.2797Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5431 3.88721C15.654 3.47709 16.0763 3.23448 16.4864 3.34532C18.1832 3.80392 19.3626 5.47949 19.3626 7.38461C19.3626 9.39763 17.9829 11.2126 16.0478 11.4451C15.626 11.4957 15.243 11.1949 15.1923 10.7731C15.1416 10.3513 15.4425 9.96824 15.8643 9.91758C16.8962 9.79362 17.8242 8.75741 17.8242 7.38461C17.8242 6.08213 17.0256 5.0847 16.085 4.8305C15.6749 4.71966 15.4323 4.29733 15.5431 3.88721Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8384 14.4901C17.9197 14.0731 18.3237 13.801 18.7407 13.8824C20.6337 14.2516 22 15.91 22 17.8388V18.3735C22 18.8469 21.858 19.5212 21.2404 19.9159C20.8246 20.1817 20.1798 20.4649 19.1855 20.666C18.7691 20.7503 18.3633 20.481 18.279 20.0646C18.1948 19.6482 18.464 19.2424 18.8804 19.1581C19.7287 18.9865 20.1871 18.7633 20.4118 18.6197L20.4136 18.6179C20.4153 18.6158 20.4213 18.6077 20.4287 18.5896C20.4451 18.5498 20.4615 18.4784 20.4615 18.3735V17.8388C20.4615 16.6462 19.6167 15.6207 18.4462 15.3924C18.0292 15.311 17.7571 14.9071 17.8384 14.4901Z" fill="#030D45"/>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Հաճախորդներ</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='customers' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children'} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="customers" || location.pathname==="/customers/customers"?"nav-link active":"nav-link"} to="./customers/customers/page/1"
                                                        onClick={()=>handleSubmenuClick("customers","customers")}>
                                                            <span className="nav-link-text">Հաճախորդ</span>
                                                        </Link>
                                                    </li>
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li> */}

                                    <li className="nav-item">
                                        <a className={misActive1 === "companies" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('companies')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7166 3.79541C12.2835 3.49716 11.7165 3.49716 11.2834 3.79541L4.14336 8.7121C3.81027 8.94146 3.60747 9.31108 3.59247 9.70797C3.54064 11.0799 3.4857 13.4824 3.63658 15.1877C3.7504 16.4742 4.05336 18.1747 4.29944 19.4256C4.41371 20.0066 4.91937 20.4284 5.52037 20.4284H8.84433C8.98594 20.4284 9.10074 20.3111 9.10074 20.1665V15.9754C9.10074 14.9627 9.90433 14.1417 10.8956 14.1417H13.4091C14.4004 14.1417 15.204 14.9627 15.204 15.9754V20.1665C15.204 20.3111 15.3188 20.4284 15.4604 20.4284H18.4796C19.0806 20.4284 19.5863 20.0066 19.7006 19.4256C19.9466 18.1747 20.2496 16.4742 20.3634 15.1877C20.5143 13.4824 20.4594 11.0799 20.4075 9.70797C20.3925 9.31108 20.1897 8.94146 19.8566 8.7121L12.7166 3.79541ZM10.4235 2.49217C11.3764 1.83602 12.6236 1.83602 13.5765 2.49217L20.7165 7.40886C21.4457 7.91098 21.9104 8.73651 21.9448 9.64736C21.9966 11.0178 22.0564 13.5119 21.8956 15.3292C21.7738 16.7067 21.4561 18.4786 21.2089 19.7353C20.9461 21.0711 19.7924 22.0001 18.4796 22.0001H15.4604C14.4691 22.0001 13.6655 21.1791 13.6655 20.1665V15.9754C13.6655 15.8307 13.5507 15.7134 13.4091 15.7134H10.8956C10.754 15.7134 10.6392 15.8307 10.6392 15.9754V20.1665C10.6392 21.1791 9.83561 22.0001 8.84433 22.0001H5.52037C4.20761 22.0001 3.05389 21.0711 2.79113 19.7353C2.54392 18.4786 2.22624 16.7067 2.10437 15.3292C1.94358 13.5119 2.00338 11.0178 2.05515 9.64736C2.08957 8.73652 2.55427 7.91098 3.28346 7.40886L10.4235 2.49217Z" fill="#030D45"/>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Ընկերություններ</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='companies' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children'} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    {/* <li className="nav-item">
                                                        <Link className={sisActive1==="companies" || location.pathname==="/companies/companies"?"nav-link active":"nav-link"} to="./companies/companies"
                                                        onClick={()=>handleSubmenuClick("companies","companies")}>
                                                            <span className="nav-link-text">Ընկերություն</span>
                                                        </Link>
                                                    </li> */}
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="partners" || location.pathname===PARTNERS_ROUTE?"nav-link active":"nav-link"} to='./companies/partners/page/1'
                                                        onClick={()=>handleSubmenuClick("companies","partners")}>
                                                            <span className="nav-link-text">Գործընկերներ</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="suppliers" || location.pathname===SUPPLIERS_ROUTE?"nav-link active":"nav-link"} to='./companies/suppliers/page/1'
                                                        onClick={()=>handleSubmenuClick("companies","suppliers")}>
                                                            <span className="nav-link-text">Մատակարարներ</span>
                                                        </Link>
                                                    </li>
                                                    {/* <li className="nav-item">
                                                        <Link className={sisActive1==="brands" || location.pathname==="/companies/brands"?"nav-link active":"nav-link"} to="./companies/brands"
                                                        onClick={()=>handleSubmenuClick("companies","brands")}>
                                                            <span className="nav-link-text">Ապրանքանիշ</span>
                                                        </Link>
                                                    </li> */}
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li>


                                    <li className="nav-item">
                                        <a className={misActive1 === "products" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('products')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.8635 4.41326C3.05256 3.01944 4.24532 2 5.63943 2H18.3606C19.7547 2 20.9474 3.01944 21.1365 4.41326C21.3942 6.31335 21.782 9.40728 21.9113 11.7073C22.0386 13.9721 22.0033 17.0336 21.9618 18.9421C21.9307 20.3715 20.8258 21.5372 19.4005 21.6454C17.4623 21.7927 14.325 22 12 22C9.67497 22 6.53767 21.7927 4.59951 21.6454C3.17421 21.5372 2.06926 20.3715 2.03817 18.9421C1.99666 17.0336 1.9614 13.9721 2.0887 11.7073C2.21799 9.40728 2.60578 6.31335 2.8635 4.41326ZM5.63943 3.53846C5.00257 3.53846 4.47193 4.00132 4.38801 4.62004C4.1304 6.51925 3.7503 9.56 3.62474 11.7937C3.50113 13.9928 3.53478 17.0013 3.57626 18.9086C3.59013 19.5462 4.07974 20.0631 4.71605 20.1114C6.65325 20.2586 9.73901 20.4615 12 20.4615C14.261 20.4615 17.3467 20.2586 19.284 20.1114C19.9203 20.0631 20.4099 19.5462 20.4237 18.9086C20.4652 17.0013 20.4989 13.9928 20.3753 11.7937C20.2497 9.56 19.8696 6.51925 19.612 4.62004C19.5281 4.00132 18.9974 3.53846 18.3606 3.53846H5.63943Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.89744 6.10256C8.32227 6.10256 8.66667 6.44696 8.66667 6.8718C8.66667 8.71274 10.159 10.2051 12 10.2051C13.8409 10.2051 15.3333 8.71274 15.3333 6.8718C15.3333 6.44696 15.6777 6.10256 16.1026 6.10256C16.5274 6.10256 16.8718 6.44696 16.8718 6.8718C16.8718 9.56241 14.6906 11.7436 12 11.7436C9.30938 11.7436 7.12821 9.56241 7.12821 6.8718C7.12821 6.44696 7.4726 6.10256 7.89744 6.10256Z" fill="#030D45"/>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Ապրանքներ</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='products' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children'} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="productsClasses" || location.pathname==="/products/productsClasses"?"nav-link active":"nav-link"} to="./products/productsClasses/1"
                                                        onClick={()=>handleSubmenuClick("products","productsClasses")}>
                                                            <span className="nav-link-text">Ապրանքի դասակարգեր</span>
                                                        </Link>
                                                    </li>
                                                        <Link className={sisActive1==="productsList" || location.pathname==="/products/productsList"?"nav-link active":"nav-link"} to="./products/productsList/1"
                                                        onClick={()=>handleSubmenuClick("products","productsList")}>
                                                            <span className="nav-link-text">Ապրանքների ցանկ</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="incomingProducts" || location.pathname==="/products/incomingProducts"?"nav-link active":"nav-link"} to="./products/incomingProducts/1"
                                                        onClick={()=>handleSubmenuClick("products","incomingProducts")}>
                                                            <span className="nav-link-text">Ապրանքների մուտք</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="outgoingProducts" || location.pathname==="/products/outgoingProducts"?"nav-link active":"nav-link"} to="./products/outgoingProducts/1"
                                                        onClick={()=>handleSubmenuClick("products","outgoingProducts")}>
                                                            <span className="nav-link-text">Ապրանքների ելք</span>
                                                        </Link>
                                                    </li>
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className={misActive1 === "purchases" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('purchases')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 2.75949C1 2.34004 1.3467 2 1.77437 2H2.53267C3.96462 2 5.17248 3.0458 5.35009 4.4394L5.55544 6.05063H20.1928C21.2974 6.05063 22.1435 7.01422 21.9796 8.08567L20.8726 15.3245C20.6641 16.6877 19.4701 17.6962 18.0646 17.6962H8.19891C6.79344 17.6962 5.59946 16.6877 5.39098 15.3245L4.10604 6.92279L4.10345 6.90433L3.81331 4.6278C3.73258 3.99435 3.18355 3.51899 2.53267 3.51899H1.77437C1.3467 3.51899 1 3.17895 1 2.75949ZM5.77103 7.56962L6.92258 15.0992C7.01734 15.7188 7.56006 16.1772 8.19891 16.1772H18.0646C18.7035 16.1772 19.2462 15.7188 19.341 15.0992L20.448 7.86034C20.4714 7.70727 20.3506 7.56962 20.1928 7.56962H5.77103Z" fill="#030D45"/>
                                                    <path d="M19.3267 20.9873C19.3267 21.5466 18.8644 22 18.2942 22C17.724 22 17.2617 21.5466 17.2617 20.9873C17.2617 20.4281 17.724 19.9747 18.2942 19.9747C18.8644 19.9747 19.3267 20.4281 19.3267 20.9873Z" fill="#030D45"/>
                                                    <path d="M9.0018 20.9873C9.0018 21.5466 8.53954 22 7.96931 22C7.39908 22 6.93682 21.5466 6.93682 20.9873C6.93682 20.4281 7.39908 19.9747 7.96931 19.9747C8.53954 19.9747 9.0018 20.4281 9.0018 20.9873Z" fill="#030D45"/>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Գնում</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='purchases' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children'} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="purchaseOne" || location.pathname==="/purchases/purchaseOne"?"nav-link active":"nav-link"} to="./purchases/purchaseOne"
                                                        onClick={()=>handleSubmenuClick("purchases","purchaseOne")}>
                                                            <span className="nav-link-text">1</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="purchaseTwo" || location.pathname==="/purchases/purchaseTwo"?"nav-link active":"nav-link"} to="./purchases/purchaseTwo"
                                                        onClick={()=>handleSubmenuClick("purchases","purchaseTwo")}>
                                                            <span className="nav-link-text">2</span>
                                                        </Link>
                                                    </li>
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li> */}
                                    <li className="nav-item">
                                        <a className={misActive1 === "warehouses" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('warehouses')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.47937C7.81281 3.47937 4.28068 6.52132 4.56837 10.3097C4.60963 10.853 4.67131 11.326 4.75535 11.7013C5.17935 13.5948 6.51026 15.4758 8.00934 17.0726C9.49565 18.6558 11.0782 19.8875 11.8959 20.4848C11.9613 20.5326 12.0387 20.5326 12.1041 20.4848C12.9218 19.8875 14.5043 18.6558 15.9907 17.0726C17.4897 15.4758 18.8206 13.5948 19.2446 11.7013C19.3287 11.326 19.3904 10.853 19.4316 10.3097C19.7193 6.52132 16.1872 3.47937 12 3.47937ZM3.02115 10.4166C2.65409 5.5831 7.12259 2 12 2C16.8774 2 21.3459 5.5831 20.9789 10.4166C20.9349 10.9955 20.8664 11.5428 20.7617 12.0103C20.2534 14.2803 18.7089 16.3951 17.1464 18.0594C15.5712 19.7373 13.9062 21.0319 13.0474 21.6592C12.4254 22.1136 11.5746 22.1136 10.9526 21.6592C10.0938 21.0319 8.42877 19.7373 6.85358 18.0594C5.29114 16.3951 3.74659 14.2803 3.23828 12.0103C3.13359 11.5428 3.06511 10.9955 3.02115 10.4166Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 9.39685C11.286 9.39685 10.7073 9.94879 10.7073 10.6297C10.7073 11.3105 11.286 11.8625 12 11.8625C12.714 11.8625 13.2927 11.3105 13.2927 10.6297C13.2927 9.94879 12.714 9.39685 12 9.39685ZM9.15599 10.6297C9.15599 9.13176 10.4293 7.91748 12 7.91748C13.5707 7.91748 14.844 9.13176 14.844 10.6297C14.844 12.1275 13.5707 13.3418 12 13.3418C10.4293 13.3418 9.15599 12.1275 9.15599 10.6297Z" fill="#030D45"/>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Պահեստներ</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='warehouses' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children'} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="warehousesList" || location.pathname=== WARREHOUSESLIST_ROUTE?"nav-link active":"nav-link"} to={WARREHOUSESLIST_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","warehousesList")}>
                                                            <span className="nav-link-text">Պահեստների ցանկ</span>
                                                        </Link>
                                                    </li>
                                                    {/* <li className="nav-item">
                                                        <Link className={sisActive1==="listOfProductValues" || location.pathname=== LISTOFPRODUCTVALUES_ROUTE?"nav-link active":"nav-link"} to={LISTOFPRODUCTVALUES_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","listOfProductValues")}>
                                                            <span className="nav-link-text">Ապրանքանյութական արժեքների ցանկ</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="priceList" || location.pathname=== PRICELIST_ROUTE?"nav-link active":"nav-link"} to={PRICELIST_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","priceList")}>
                                                            <span className="nav-link-text">Գնացուցակ</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="productCover" || location.pathname=== PRODUCTCOVER_ROUTE?"nav-link active":"nav-link"} to={PRODUCTCOVER_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","productCover")}>
                                                            <span className="nav-link-text">Ապրանքների վերադիր</span>
                                                        </Link>
                                                    </li> */}
                                                    {/* <li className="nav-item">
                                                        <Link className={sisActive1==="accessWarrant" || location.pathname=== ACCESSWARRANT_ROUTE?"nav-link active":"nav-link"} to={ACCESSWARRANT_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","accessWarrant")}>
                                                            <span className="nav-link-text">Մուտք Պահեստ/Մուտքի օրդեր</span>
                                                        </Link>
                                                    </li> */}
                                                    {/* <li className="nav-item">
                                                        <Link className={sisActive1==="retailPurchase" || location.pathname=== RETAILPURCHASE_ROUTE?"nav-link active":"nav-link"} to={RETAILPURCHASE_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","retailPurchase")}>
                                                            <span className="nav-link-text">Ապրանքների ձեռքբերում մանրածախ</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="movementsOfProducts" || location.pathname=== MOVEMENTSOFPRODUCTS_ROUTE?"nav-link active":"nav-link"} to={MOVEMENTSOFPRODUCTS_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","movementsOfProducts")}>
                                                            <span className="nav-link-text">Ապրանքների տեղաշարժ</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="productReassessment" || location.pathname=== PRODUCTREASSESSMENT_ROUTE?"nav-link active":"nav-link"} to={PRODUCTREASSESSMENT_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","productReassessment")}>
                                                            <span className="nav-link-text">Ապրանքների վերագնահատում</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="productCheckout" || location.pathname=== PRODUCTCHECKOUT_ROUTE?"nav-link active":"nav-link"} to={PRODUCTCHECKOUT_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","productCheckout")}>
                                                            <span className="nav-link-text">Ապրանքների դուրսգրում</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="inventory" || location.pathname=== INVENTORY_ROUTE?"nav-link active":"nav-link"} to={INVENTORY_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","inventory")}>
                                                            <span className="nav-link-text">Գույքագրում</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="inventoryByScanner" || location.pathname=== INVENTORYBYSCANNER_ROUTE?"nav-link active":"nav-link"} to={INVENTORYBYSCANNER_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","inventoryByScanner")}>
                                                            <span className="nav-link-text">Գույքագրում սկաների միջոցով</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="listOfSet" || location.pathname=== LISTOFSET_ROUTE?"nav-link active":"nav-link"} to={LISTOFSET_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","listOfSet")}>
                                                            <span className="nav-link-text">Կոմպլեկտների անվանումների ցուցակ</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="compilation" || location.pathname=== COMPILATION_ROUTE?"nav-link active":"nav-link"} to={COMPILATION_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","compilation")}>
                                                            <span className="nav-link-text">Կոմպլեկտավորում</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="disassembly" || location.pathname=== DISASSEMBLY_ROUTE?"nav-link active":"nav-link"} to={DISASSEMBLY_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","disassembly")}>
                                                            <span className="nav-link-text">Ապակոմպլեկտավորում</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="fragmentation" || location.pathname=== FRAGMENTATION_ROUTE?"nav-link active":"nav-link"} to={FRAGMENTATION_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","fragmentation")}>
                                                            <span className="nav-link-text">Մասնատում</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="expiredObsProducts" || location.pathname=== EXPIREDOBSPRODUCTS_ROUTE?"nav-link active":"nav-link"} to={EXPIREDOBSPRODUCTS_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","expiredObsProducts")}>
                                                            <span className="nav-link-text">Ժամկետնանց ապրանքներ</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="minLimitProducts" || location.pathname=== MINLIMITPRODUCTS_ROUTE?"nav-link active":"nav-link"} to={MINLIMITPRODUCTS_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","minLimitProducts")}>
                                                            <span className="nav-link-text">Ապրանքների նվազագույն քանակը պահեստներում</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="requirements" || location.pathname=== REQUIREMENTS_ROUTE?"nav-link active":"nav-link"} to={REQUIREMENTS_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","requirements")}>
                                                            <span className="nav-link-text">Պահանջագրեր</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="defactura" || location.pathname=== DEFACTURA_ROUTE?"nav-link active":"nav-link"} to={DEFACTURA_ROUTE}
                                                        onClick={()=>handleSubmenuClick("warehouses","defactura")}>
                                                            <span className="nav-link-text">Դեֆեկտուրա</span>
                                                        </Link>
                                                    </li> */}
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className={misActive1 === "orders" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('orders')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 3.57143C5.78277 3.57143 4.77634 3.74256 4.09054 3.88071C4.00982 3.89696 3.94486 3.96042 3.93067 4.05126C3.79347 4.92993 3.58824 6.43203 3.58824 7.5C3.58824 8.56797 3.79347 10.0701 3.93067 10.9487C3.94486 11.0396 4.00982 11.103 4.09054 11.1193C4.77634 11.2574 5.78277 11.4286 6.5 11.4286C7.21723 11.4286 8.22366 11.2574 8.90946 11.1193C8.99018 11.103 9.05514 11.0396 9.06933 10.9487C9.20653 10.0701 9.41177 8.56797 9.41177 7.5C9.41177 6.43203 9.20653 4.92993 9.06933 4.05126C9.05514 3.96042 8.99018 3.89696 8.90946 3.88071C8.22366 3.74256 7.21723 3.57143 6.5 3.57143ZM3.77369 2.34087C4.46212 2.20219 5.60739 2 6.5 2C7.39261 2 8.53788 2.20219 9.22631 2.34087C9.9687 2.49041 10.5249 3.08082 10.6389 3.81133C10.7759 4.68826 11 6.29813 11 7.5C11 8.70187 10.7759 10.3117 10.6389 11.1887C10.5249 11.9192 9.9687 12.5096 9.22631 12.6591C8.53788 12.7978 7.39261 13 6.5 13C5.60739 13 4.46212 12.7978 3.77369 12.6591C3.0313 12.5096 2.47513 11.9192 2.36106 11.1887C2.22412 10.3117 2 8.70187 2 7.5C2 6.29813 2.22412 4.68826 2.36106 3.81133C2.47513 3.08082 3.0313 2.49041 3.77369 2.34087Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 20.4286C16.7828 20.4286 15.7763 20.2574 15.0905 20.1193C15.0098 20.103 14.9449 20.0396 14.9307 19.9487C14.7935 19.0701 14.5882 17.568 14.5882 16.5C14.5882 15.432 14.7935 13.9299 14.9307 13.0513C14.9449 12.9604 15.0098 12.897 15.0905 12.8807C15.7763 12.7426 16.7828 12.5714 17.5 12.5714C18.2172 12.5714 19.2237 12.7426 19.9095 12.8807C19.9902 12.897 20.0551 12.9604 20.0693 13.0513C20.2065 13.9299 20.4118 15.432 20.4118 16.5C20.4118 17.568 20.2065 19.0701 20.0693 19.9487C20.0551 20.0396 19.9902 20.103 19.9095 20.1193C19.2237 20.2574 18.2172 20.4286 17.5 20.4286ZM14.7737 21.6591C15.4621 21.7978 16.6074 22 17.5 22C18.3926 22 19.5379 21.7978 20.2263 21.6591C20.9687 21.5096 21.5249 20.9192 21.6389 20.1887C21.7759 19.3117 22 17.7019 22 16.5C22 15.2981 21.7759 13.6883 21.6389 12.8113C21.5249 12.0808 20.9687 11.4904 20.2263 11.3409C19.5379 11.2022 18.3926 11 17.5 11C16.6074 11 15.4621 11.2022 14.7737 11.3409C14.0313 11.4904 13.4751 12.0808 13.3611 12.8113C13.2241 13.6883 13 15.2981 13 16.5C13 17.7019 13.2241 19.3117 13.3611 20.1887C13.4751 20.9192 14.0313 21.5096 14.7737 21.6591Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 16.6154C5.73888 16.6154 4.66241 16.7965 3.98316 16.9294C3.90741 16.9443 3.86241 16.9941 3.84775 17.0469C3.71755 17.5158 3.58824 18.0994 3.58824 18.5C3.58824 18.9006 3.71755 19.4842 3.84775 19.9531C3.86241 20.0059 3.90741 20.0557 3.98316 20.0706C4.66241 20.2035 5.73888 20.3846 6.5 20.3846C7.26112 20.3846 8.33759 20.2035 9.01684 20.0706C9.09259 20.0557 9.13759 20.0059 9.15225 19.9531C9.28245 19.4842 9.41177 18.9006 9.41177 18.5C9.41177 18.0994 9.28245 17.5158 9.15225 17.0469C9.13759 16.9941 9.09259 16.9443 9.01684 16.9294C8.33759 16.7965 7.26112 16.6154 6.5 16.6154ZM3.68301 15.3432C4.36186 15.2103 5.57165 15 6.5 15C7.42835 15 8.63814 15.2103 9.31699 15.3432C9.95957 15.4689 10.4966 15.9447 10.6807 16.6079C10.8134 17.0857 11 17.857 11 18.5C11 19.143 10.8134 19.9143 10.6807 20.3921C10.4966 21.0553 9.95957 21.5311 9.31699 21.6568C8.63814 21.7897 7.42835 22 6.5 22C5.57165 22 4.36186 21.7897 3.68301 21.6568C3.04043 21.5311 2.50344 21.0553 2.31929 20.3921C2.18661 19.9143 2 19.143 2 18.5C2 17.857 2.18661 17.0857 2.31929 16.6079C2.50344 15.9447 3.04043 15.4689 3.68301 15.3432Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 7.38462C16.7389 7.38462 15.6624 7.20353 14.9832 7.07057C14.9074 7.05575 14.8624 7.00592 14.8477 6.95312C14.7176 6.4842 14.5882 5.90057 14.5882 5.5C14.5882 5.09943 14.7176 4.5158 14.8477 4.04688C14.8624 3.99408 14.9074 3.94425 14.9832 3.92943C15.6624 3.79647 16.7389 3.61538 17.5 3.61538C18.2611 3.61538 19.3376 3.79647 20.0168 3.92943C20.0926 3.94425 20.1376 3.99408 20.1523 4.04688C20.2824 4.5158 20.4118 5.09943 20.4118 5.5C20.4118 5.90057 20.2824 6.4842 20.1523 6.95312C20.1376 7.00592 20.0926 7.05575 20.0168 7.07057C19.3376 7.20353 18.2611 7.38462 17.5 7.38462ZM14.683 8.65685C15.3619 8.78973 16.5717 9 17.5 9C18.4283 9 19.6381 8.78973 20.317 8.65685C20.9596 8.53107 21.4966 8.05534 21.6807 7.39214C21.8134 6.91427 22 6.14299 22 5.5C22 4.85701 21.8134 4.08573 21.6807 3.60786C21.4966 2.94466 20.9596 2.46893 20.317 2.34315C19.6381 2.21027 18.4283 2 17.5 2C16.5717 2 15.3619 2.21027 14.683 2.34315C14.0404 2.46893 13.5034 2.94466 13.3193 3.60786C13.1866 4.08573 13 4.85701 13 5.5C13 6.14299 13.1866 6.91427 13.3193 7.39214C13.5034 8.05534 14.0404 8.53107 14.683 8.65685Z" fill="#030D45"/>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Պատվերներ</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='orders' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children'} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="orderOne" || location.pathname==="/orders/orderOne"?"nav-link active":"nav-link"} to="./orders/orderOne"
                                                        onClick={()=>handleSubmenuClick("orders","orderOne")}>
                                                            <span className="nav-link-text">1</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="orderTwo" || location.pathname==="/orders/orderTwo"?"nav-link active":"nav-link"} to="./orders/orderTwo"
                                                        onClick={()=>handleSubmenuClick("orders","orderTwo")}>
                                                            <span className="nav-link-text">2</span>
                                                        </Link>
                                                    </li>
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li>
                                    <li className="nav-item">
                                        <a className={misActive1 === "payments" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('payments')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-digit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                                    <rect x="9" y="12" width="3" height="5" rx="1"></rect>
                                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                                    <path d="M15 12v5"></path>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Վճարումներ</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='payments' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children'} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="paymentOne" || location.pathname==="/payments/paymentOne"?"nav-link active":"nav-link"} to="./payments/paymentOne"
                                                        onClick={()=>handleSubmenuClick("payments","paymentOne")}>
                                                            <span className="nav-link-text">1</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="paymentTwo" || location.pathname==="/payments/paymentTwo"?"nav-link active":"nav-link"} to="./payments/paymentTwo"
                                                        onClick={()=>handleSubmenuClick("payments","paymentTwo")}>
                                                            <span className="nav-link-text">2</span>
                                                        </Link>
                                                    </li>
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li>
                                    <li className="nav-item">
                                        <a className={misActive1 === "statistics" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('statistics')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.53846C9.83082 3.53846 6.86615 3.73753 5.01495 3.88095C4.40616 3.92811 3.92811 4.40616 3.88095 5.01495C3.73753 6.86615 3.53846 9.83082 3.53846 12C3.53846 14.1692 3.73753 17.1338 3.88095 18.985C3.92811 19.5938 4.40616 20.0719 5.01495 20.1191C6.86615 20.2625 9.83082 20.4615 12 20.4615C14.1692 20.4615 17.1338 20.2625 18.985 20.1191C19.5938 20.0719 20.0719 19.5938 20.1191 18.985C20.2625 17.1338 20.4615 14.1692 20.4615 12C20.4615 9.83082 20.2625 6.86615 20.1191 5.01495C20.0719 4.40616 19.5938 3.92811 18.985 3.88095C17.1338 3.73753 14.1692 3.53846 12 3.53846ZM4.89612 2.34708C6.74819 2.2036 9.76547 2 12 2C14.2345 2 17.2518 2.2036 19.1039 2.34708C20.4686 2.45281 21.5472 3.53141 21.6529 4.89612C21.7964 6.74819 22 9.76547 22 12C22 14.2345 21.7964 17.2518 21.6529 19.1039C21.5472 20.4686 20.4686 21.5472 19.1039 21.6529C17.2518 21.7964 14.2345 22 12 22C9.76547 22 6.74819 21.7964 4.89612 21.6529C3.53141 21.5472 2.45281 20.4686 2.34708 19.1039C2.2036 17.2518 2 14.2345 2 12C2 9.76547 2.2036 6.74819 2.34708 4.89612C2.45281 3.53141 3.53141 2.45281 4.89612 2.34708Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.89744 12.2564C8.32227 12.2564 8.66667 12.6008 8.66667 13.0256L8.66667 16.1026C8.66667 16.5274 8.32227 16.8718 7.89744 16.8718C7.4726 16.8718 7.12821 16.5274 7.12821 16.1026L7.12821 13.0256C7.12821 12.6008 7.4726 12.2564 7.89744 12.2564Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 9.17949C12.4248 9.17949 12.7692 9.52388 12.7692 9.94872V16.1026C12.7692 16.5274 12.4248 16.8718 12 16.8718C11.5752 16.8718 11.2308 16.5274 11.2308 16.1026V9.94872C11.2308 9.52388 11.5752 9.17949 12 9.17949Z" fill="#030D45"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1026 6.10256C16.5274 6.10256 16.8718 6.44696 16.8718 6.8718V16.1026C16.8718 16.5274 16.5274 16.8718 16.1026 16.8718C15.6777 16.8718 15.3333 16.5274 15.3333 16.1026V6.8718C15.3333 6.44696 15.6777 6.10256 16.1026 6.10256Z" fill="#030D45"/>
                                                </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Վիճակագրություն</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='statistics' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children'} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="statisticOne" || location.pathname==="/statistics/statisticOne"?"nav-link active":"nav-link"} to="./statistics/statisticOne"
                                                        onClick={()=>handleSubmenuClick("statistics","statisticOne")}>
                                                            <span className="nav-link-text">1</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="statisticTwo" || location.pathname==="/statistics/statisticTwo"?"nav-link active":"nav-link"} to="./statistics/statisticTwo"
                                                        onClick={()=>handleSubmenuClick("statistics","statisticTwo")}>
                                                            <span className="nav-link-text">2</span>
                                                        </Link>
                                                    </li>
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li>
                                    <li className="nav-item">
                                        <a className={misActive1 === "commonInfo" ?"nav-link active":"nav-link"} href="#" data-bs-toggle="collapse" onClick={()=>isActiceDD('commonInfo')}  data-bs-target="#dash_integ">
                                            <span className="nav-icon-wrap">
                                                <span className="svg-icon">
                                                <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <title/>
                                                            <g id="Complete">
                                                            <g id="user">
                                                            <g>
                                                            <path d="M20,21V19a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                                            <circle cx="12" cy="7" fill="none" r="4" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                                            </g>
                                                            </g>
                                                            </g>
                                                            </svg>
                                                </span>
                                            </span>
                                            <span className="nav-link-text">Ընդ. տեղեկատվություններ</span>
                                        </a>
                                        <ul id="dash_integ" className={activeDropdown==='commonInfo' ? 'nav flex-column collapse  nav-children show' : 'nav flex-column collapse  nav-children'} >
                                            <li className="nav-item">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="commonInfoOne" || location.pathname==="/commonInfo/commonInfoOne"?"nav-link active":"nav-link"} to="./commonInfo/commonInfoOne"
                                                        onClick={()=>handleSubmenuClick("commonInfo","commonInfoOne")}>
                                                            <span className="nav-link-text">1</span>
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className={sisActive1==="commonInfoTwo" || location.pathname==="/commonInfo/commonInfoTwo"?"nav-link active":"nav-link"} to="./commonInfo/commonInfoTwo"
                                                        onClick={()=>handleSubmenuClick("commonInfo","commonInfoTwo")}>
                                                            <span className="nav-link-text">2</span>
                                                        </Link>
                                                    </li>
                                                </ul>	
                                            </li>	
                                        </ul>	
                                    </li>
                                    <li className="nav-item">
                      <Link
                        className={
                            misActive1 === "setup"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/setup"
                        onClick={() => handleSubmenuClick("setup", "")}
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'20px'} height={'20px'} src={sideSetupSvg} alt="sideSetupSvg"/>
                          </span>
                        </span>
                        <span className="nav-link-text">Կարգաբերումներ</span>
                      </Link>
                    </li> */}
                              </ul>
                          </div>
                      </div>
                  </div>
                  {/* /Main Menu */}
                  <div className="menu-footer"><p style={{fontSize:'12px',marginLeft:'5px'}}>V{packageJson?packageJson?.version:''} Rev{packageJson?packageJson?.revision:''}</p></div>
              </div>
              <div id="hk_menu_backdrop" className="hk-menu-backdrop"></div>
              {/* /Vertical Nav */}
  
              {/* Chat Popup */}
              <div className="hk-chatbot-popup">
                  <header>
                      <div className="chatbot-head-top">
                          <a className="btn btn-sm btn-icon btn-dark btn-rounded" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span className="icon"><span className="feather-icon"><i data-feather="more-horizontal"></i></span></span>
                          </a>
                          <div className="dropdown-menu">
                              <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-notifications-active"></i><span>Send push notifications</span></a>
                              <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-volume-off"></i><span>Mute Chat</span></a>
                          </div>
                          <span className="text-white">Chat with Us</span>
                          <a id="minimize_chatbot" href="#" className="btn btn-sm btn-icon btn-dark btn-rounded">
                              <span className="icon"><span className="feather-icon"><i data-feather="minus"></i></span></span>
                          </a>
                      </div>
                      <div className="separator-full separator-light mt-0 opacity-10"></div>
                      <div className="media-wrap">
                          <div className="media">
                              <div className="media-head">
                                  <div className="avatar avatar-sm avatar-soft-primary avatar-icon avatar-rounded position-relative">
                                      <span className="initial-wrap">
                                          <i className="ri-customer-service-2-line"></i>
                                      </span>
                                      <span className="badge badge-success badge-indicator badge-indicator-lg badge-indicator-nobdr position-bottom-end-overflow-1"></span>
                                  </div>
                              </div>
                              <div className="media-body">
                                  <div className="user-name">Chat Robot</div>
                                  <div className="user-status">Online</div>
                              </div>
                          </div>
                      </div>
                  </header>
                  <div className="chatbot-popup-body">
                      <div data-simplebar className="nicescroll-bar">
                          <div>
                              <div className="init-content-wrap">
                                  <div className="card card-shadow">
                                      <div className="card-body">
                                          <p className="card-text">Hey I am chat robot 😈<br/>Do yo have any question regarding our tools?<br/><br/>Select the topic or start chatting.</p>
                                          <button className="btn btn-block btn-primary text-nonecase start-conversation">Start a conversation</button>
                                      </div>
                                  </div>
                                  <div className="btn-wrap">
                                      <button className="btn btn-soft-primary text-nonecase btn-rounded start-conversation"><span><span className="icon"><span className="feather-icon"><i data-feather="eye"></i></span></span><span className="btn-text">Just browsing</span></span></button>
                                      <button className="btn btn-soft-danger text-nonecase btn-rounded start-conversation"><span><span className="icon"><span className="feather-icon"><i data-feather="credit-card"></i></span></span><span className="btn-text">I have a question regarding pricing</span></span></button>
                                      <button className="btn btn-soft-warning text-nonecase btn-rounded start-conversation"><span><span className="icon"><span className="feather-icon"><i data-feather="cpu"></i></span></span><span className="btn-text">Need help for technical query</span></span></button>
                                      <button className="btn btn-soft-success text-nonecase btn-rounded start-conversation"><span><span className="icon"><span className="feather-icon"><i data-feather="zap"></i></span></span><span className="btn-text">I have a pre purchase question</span></span></button>
                                  </div>
                              </div>
                              <ul className="list-unstyled d-none">
                                  <li className="media sent">
                                      <div className="media-body">
                                          <div className="msg-box">
                                              <div>
                                                  <p>I have a plan regarding pricing</p>
                                              </div>
                                          </div>
                                      </div>
                                  </li>
                                  <li className="media received">
                                      <div className="avatar avatar-xs avatar-soft-primary avatar-icon avatar-rounded">
                                          <span className="initial-wrap">
                                              <i className="ri-customer-service-2-line"></i>
                                          </span>
                                      </div>
                                      <div className="media-body">
                                          <div className="msg-box">
                                              <div>
                                                  <p>Welcome back!<br/>Are you looking to upgrade your existing plan?</p>
                                              </div>
                                          </div>
                                          <div className="msg-box typing-wrap">
                                              <div>
                                                  <div className="typing">
                                                    <div className="dot"></div>
                                                    <div className="dot"></div>
                                                    <div className="dot"></div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <footer>
                      <div className="chatbot-intro-text fs-7">
                          <div className="separator-full separator-light"></div>
                          <p className="mb-2">This is jampack's beta version please sign up now to get early access to our full version</p>
                          <a className="d-block mb-2" href="#"><u>Give Feedback</u></a>		
                      </div>
                        <div className="input-group d-none">
                            <div className="input-group-text overflow-show border-0">
                                <button className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded dropdown-toggle no-caret" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
                                    <span className="icon"><span className="feather-icon"><i data-feather="share"></i></span></span>
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-icon avatar-xs avatar-soft-primary avatar-rounded me-3">
                                                <span className="initial-wrap">
                                                    <i className="ri-image-line"></i>
                                                </span>
                                            </div>
                                            <div>
                                                <span className="h6 mb-0">Photo or Video Library</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-icon avatar-xs avatar-soft-info avatar-rounded me-3">
                                                <span className="initial-wrap">
                                                    <i className="ri-file-4-line"></i>
                                                </span>
                                            </div>
                                            <div>
                                                <span className="h6 mb-0">Documents</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-icon avatar-xs avatar-soft-success avatar-rounded me-3">
                                                <span className="initial-wrap">
                                                    <i className="ri-map-pin-line"></i>
                                                </span>
                                            </div>
                                            <div>
                                                <span className="h6 mb-0">Location</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a className="dropdown-item" href="/contact">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-icon avatar-xs avatar-soft-blue avatar-rounded me-3">
                                                <span className="initial-wrap">
                                                    <i className="ri-contacts-line"></i>
                                                </span>
                                            </div>
                                            <div>
                                                <span className="h6 mb-0">Contact</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <input type="text" id="input_msg_chat_popup" name="send-msg" className="input-msg-send form-control border-0 shadow-none" placeholder="Type something..."/>
                            <div className="input-group-text overflow-show border-0">
                                <button className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded">
                                    <span className="icon"><span className="feather-icon"><i data-feather="smile"></i></span></span>
                                </button>
                            </div>
                        </div>
                        <div className="footer-copy-text">Powered by 
                            <a className="brand-link" href="#">
                                <img src="/dist/img/logo-light.png" alt="logo-brand"/>
                            </a>
                        </div>
                    </footer>
                </div>
                {/*
                <a href="#" className="btn btn-icon btn-floating btn-primary btn-lg btn-rounded btn-popup-open">
                    <span className="icon">
                        <span className="feather-icon"><i data-feather="message-circle"></i></span>
                    </span>
                </a>
                */}
                <div className="chat-popover shadow-xl"><p>Try Jampack Chat for free and connect with your customers now!</p></div>
                {/* /Chat Popup */}
                
                {/* Main Content */}
                <div className="hk-pg-wrapper">
                    {/*<div className="container-xxl">*/}
						<Suspense fallback = {<LoadingSpinner/>}>
							<Outlet/>
						</Suspense>
                    </div>
                    {/* Page Footer */}
                    <div className="hk-footer">
                        <footer className="container-xxl footer">
                            <div className="row">
                                <div className="col-xl-8 text-center">
                                    <p className="footer-text pb-0">
                                        <span className="copy-text">Vteam LIMS © {new Date().getFullYear()}</span> 
                                        <span className="footer-link-sep">|</span>
                                        <a href="/privacy-policy" className="" target="_blank">Գաղտնիության քաղաքականություն</a>
                                        {/*
                                        <span className="footer-link-sep">|</span><a href="#" className="" target="_blank">T&C</a>
                                        <span className="footer-link-sep">|</span><a href="#" className="" target="_blank">System Status</a>
                                        */}
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </div>
                    {/* Page Footer */}  
                {/*</div>*/}
                {/* /Main Content */}
            </div>
            {/* /Wrapper */}  
        </section>
    )
}

export default MainTemplate