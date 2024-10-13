 import './UserInfor.scss'
 import { useSelector } from 'react-redux'
 import { FaUserCog } from "react-icons/fa";
 import { IoSettingsOutline } from "react-icons/io5"
 import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {fetchAcount} from '../../services/userService'
 const UserInfor =(props)=>{
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
//
    const [user,setUser] = useState("");
    useEffect(()=>{
        getAccount();
    },[])
    const getAccount = async()=>{
        let res = await fetchAcount(account.access_token);
        if(res.data && res.data.EC === 0){
            setUser(res.data.DT);
            console.log(res.data.DT)
        }
    }
   
    return(
        <div className='account-container'>
           <div className='account'>
                <div className='account-tiltle'>
                    Tài khoản
                </div>
                <div className='account-name'>
                    {account.username}
                </div>
           </div>
            <div className='account-infor'>
                <div className='infor-tiltle'><FaUserCog size='2em' color='blue' /> 
                    <span>Thông tin tài khoản</span>
                </div>
                {user &&
                    <div className='account-detail'>
                    <div className='name' >
                        Tên người dùng : {account.username}
                    </div>
                    <div className='email' >
                        Email : {user.email}
                    </div>
                    <div className='password'>
                        Mật khẩu : ********
                    </div>
                    <div className='age'>
                        Tuổi: {user.age}
                    </div>
                </div>
                }
               <div className='list-option'>
               <Link to='/like-movie' className='like-movie'> Danh sách phim yêu thích</Link>
                <Link to='/history' className='history-movie'> Lịch sử xem phim</Link>
                <Link to='/change-password' className='change-password'> Thay đổi mật khẩu</Link>
                <Link to='/change-infor' className='update-account'> Thay đổi thông tin tài khoản</Link>
               </div>
            </div>
            <div className='setting-account'>
                <div className='setting-tiltle'> 
                    <IoSettingsOutline size='2em' color='red'/>
                    <span>Cài đặt</span>
                </div>
                <div className='setting-container'>
                    <Link to='#' >Giới thiệu</Link>
                    <Link to='#' >Điều khoản sử dụng</Link>
                    <Link to='#' >Chính sách dữ liệu cá nhân</Link>
                    <Link to='#' >Đăng xuất</Link>
                </div>

            </div>
        </div>
    )
 }

 export default UserInfor;