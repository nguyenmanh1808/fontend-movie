
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.scss'
import {  Link,NavLink ,useNavigate} from "react-router-dom";
import { CiSearch } from "react-icons/ci"
import { IconContext } from "react-icons";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { persistor } from '../../redux/store';
import { logOutUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { refesh } from '../../redux/action/refeshUserAction';
import { useDispatch } from 'react-redux';
import {fetchAllCategory} from '../../services/categoryService'
function Header() {
  //thông tin user
  let history = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector(state => state.user.account);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  ///

  const[listCategory,setLisCategory]= useState([]);
  const handleLogOut = async ()=>{
      let res = await logOutUser();
      if (res.data && res.data.EC === 0){
          persistor.pause();
          persistor.flush().then(() => {
            return persistor.purge();
          });
          dispatch(refesh()) ;
          history("/")
          toast.success("Đăng xuất thành công")
      }
      else{
        toast.error("Lỗi server")
      }
  }
  const getCategory = async ()=>{
    let res = await fetchAllCategory();
    if(res.data && res.data.EC === 0){
      setLisCategory(res.data.DT);
    }
  }
  const handleGetMovie =(item)=>{
    history(`/movie/category/${item.id}`)
    window.location.reload();
  }
  useEffect(()=>{
    getCategory();
  },[])
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand > <Link to="/" > TVWatch </Link></Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink to="/phim-moi" className="nav-link">Phim mới</NavLink>
            <NavLink to="/phim-le" className="nav-link">Phim lẻ</NavLink>
            <NavLink to="/phim-bo" className="nav-link">Phim bộ</NavLink>
            <NavDropdown title="Thể loại" >
              {listCategory && listCategory.length> 0 && 
                  Array.from({length:listCategory.length > 5 ? 5: listCategory.length }).map((_,index)=>{
                    return (
                      <NavDropdown.Item key={`category ${index}`} > <Link to="#" onClick={()=>{handleGetMovie(listCategory[index])}} className='dropdown-item'>{listCategory[index].name}</Link></NavDropdown.Item>
                    )
                 })
              }
             
             
            </NavDropdown>
            <NavDropdown title="Quốc gia">
                <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Việt Nam</Link></NavDropdown.Item>
                <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Trung Quốc</Link></NavDropdown.Item>
                <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Hàn Quốc</Link></NavDropdown.Item>
                <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Thái Lan</Link></NavDropdown.Item>
                <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Mỹ</Link></NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          <Nav>
            <div className='search-contaner'>
              <IconContext.Provider value={{  className: "search-icon" }}>    
                <CiSearch  />
              </IconContext.Provider>
            
              <input type='text' placeholder='Tìm kiếm' className='nav-search'/>
            </div>
            
            {isAuthenticated ?
              <div className='user-container'>
              
                <div className='user-infor'>
                    {account.username}
                </div>
                <NavDropdown title="Cài đặt">
                  <NavDropdown.Item > <Link to="/#" onClick={()=>handleLogOut()} className='dropdown-item'>Log out</Link></NavDropdown.Item>
                  <NavDropdown.Item > <Link to="/account" className='dropdown-item'>Thông tin cá nhân</Link></NavDropdown.Item>
                </NavDropdown>
               </div>

               :
               <div className='login_register'>
                <button className='btn btn-login'><Link to="/login" >Log in</Link></button>
                <button className='btn btn-signup btn-primary'><Link to="/register">Sign up</Link></button>
              </div>
            }
            

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

