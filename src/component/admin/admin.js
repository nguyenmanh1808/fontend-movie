
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useEffect, useState } from "react";
import SideBar from './Sidebar';
import {  Outlet,Link ,useNavigate} from "react-router-dom";
import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';  
import { FaUserSecret } from "react-icons/fa6";
import { persistor } from '../../redux/store';
import { logOutUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { refesh } from '../../redux/action/refeshUserAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    let history = useNavigate();
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
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
    useEffect(()=>{
        document.title= "Admin"
    },[])
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
               
            </div>
            <div className="admin-content">
                <div className='admin-header'>  
                
                <header className='navbar sticky-top bg-dark admin-header-nav p-0 shadow' data-bs-theme='dark'>
                    <div  onClick={() => setCollapsed(!collapsed)} className='navbar-brand col-md-3 col-lg-2 me-0 p-3 fs-6 text-white fw-bold d-flex align-items-center' >
                    <FaBars  className='collapsed-icon'  />
                    </div>
                    <form className='d-flex mx-4 d-none d-md-flex' role='search'>
                        <input className='form-control me-2' type='search' placeholder='Tìm kiếm' aria-label='Search' />
                        <button className='btn btn-primary' type='submit'>Tìm </button>
                    </form>
                    <div className='admin-infor'>
                        Hí admin {account.username} !
                    </div>
                    <div className='admin-setting'>
                    <NavDropdown title={<FaUserSecret size={'2.5em'} color='#fff' />}>
                        <NavDropdown.Item > <Link to ="/#" onClick={()=>handleLogOut()} className='dropdown-item'>Log out</Link></NavDropdown.Item>
                        <NavDropdown.Item > <Link to="/account" className='dropdown-item'>Thông tin cá nhân</Link></NavDropdown.Item>
                    </NavDropdown>
                    </div>
                </header>
                </div>
                <div className='admin-main'>
                     <Outlet/>
                </div>
                
            </div>
        </div>
    )
}
export default Admin;