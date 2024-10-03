 import './UserInfor.scss'
 import { useSelector } from 'react-redux'
 import { FaUserCog } from "react-icons/fa";
 import { IoSettingsOutline } from "react-icons/io5"
 const UserInfor =(props)=>{
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
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
                <div className='account-detail'>
                    <div className='name' >
                        Tên người dùng : {account.username}
                    </div>
                    <div className='email' >
                        Email : nguyenducmanhtm12@gmail.com
                    </div>
                    <div className='password'>
                        Mật khẩu : ********
                    </div>
                    <div className='age'>
                        Tuổi: 22
                    </div>
                </div>
                <a href='#' className='update-account'> Thay đổi thông tin tài khoản</a>
            </div>
            <div className='setting-account'>
                <div className='setting-tiltle'> 
                    <IoSettingsOutline size='2em' color='red'/>
                    <span>Cài đặt</span>
                </div>
                <div className='setting-container'>
                    <a href='#' >Giới thiệu</a>
                    <a href='#' >Điều khoản sử dụng</a>
                    <a href='#' >Chính sách dữ liệu cá nhân</a>
                    <a href='#' >Đăng xuất</a>
                </div>

            </div>
        </div>
    )
 }

 export default UserInfor;