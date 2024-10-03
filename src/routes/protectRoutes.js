
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
const ProtectRoutes = ({Component})=>{
       
        const isAuthenticated = useSelector(state => state.user.isAuthenticated);  
        if(isAuthenticated === true ){
                return  <Component/>
        }
         else{
            toast.warning("Bạn cần đăng nhập sử dụng dịch vụ")
            return <Navigate to="/login"/>
           
         } 
}

export default ProtectRoutes;