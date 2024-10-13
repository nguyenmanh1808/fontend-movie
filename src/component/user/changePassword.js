import { useState } from 'react';
import './UserInfor.scss'
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useSelector} from 'react-redux';
import {updatePassword} from '../../services/userService'
import {useNavigate } from "react-router-dom"
const ChangePassword = ()=>{
    let history = useNavigate();
    // account
    const account = useSelector(state => state.user.account);
   
    //
    const [isAppearOldPass,setIsAppearOldPass] = useState(false);
    const [isAppearNewPass,setIsAppearNewPass] = useState(false);
    const [isAppearAgainPass,setIsAppearAgainPass] = useState(false)  ;
    // value
    const [oldPass,setOldPass] = useState("");
    const [newPass,setNewPass] = useState("");
    const [againPass,setAgainPass] = useState("");

    const checkValue = ()=>{
        if(oldPass.length < 6 || !oldPass ){
            toast.error("Mật khẩu  không phù hợp.");
            return false;
        }
        if(!newPass || newPass.length < 6){
            toast.error("Mật khẩu mới không phù hợp.");
            return false;
        }
        if(newPass !== againPass){
            toast.error("Mật khẩu không trùng khớp.");
            return false;
        }
        return true;
    }

    const handleChangePassword = async()=>{
       let check =  checkValue();
       if(check){
            let data = {
                token:account.access_token,
                oldPass:oldPass,
                newPass:newPass
            }

            let res = await updatePassword(data)
            if(res.data && res.data.EC === 0){
                toast.success(res.data.EM)
                history('/account')
            }
            else{
                toast.error(res.data.EM)
            }
       }
    }
    return (
        <div className="change-password-container ">
                <div className='title'> <h2>Đổi mật khẩu</h2></div>
               <div className='content'>
                <div className="col-md-4 old-pass">
                        <label  className="form-label ">Nhập mật khẩu cũ</label>
                        <input type={isAppearOldPass ? "input" : "password" } value={oldPass} onChange={(event)=>{setOldPass(event.target.value)}} className="form-control" placeholder='Nhập mật khẩu cũ' />
                       <div className='appear-pass' onClick={()=>{if(isAppearOldPass){setIsAppearOldPass(false)}else{setIsAppearOldPass(true)}}}>
                        { isAppearOldPass ? 
                            <FaEyeSlash/>
                            :
                            <IoEyeSharp/>
                        }
                       </div>
                    </div>
                    <div className="col-md-4 new-pass">
                        <label  className="form-label">Nhập mật khẩu mới</label>
                        <input type={isAppearNewPass ? "input" : "password" } value={newPass} onChange={(event)=>{setNewPass(event.target.value)}}  className="form-control"  placeholder='Nhập mật khẩu mới' />
                        <div className='appear-pass' onClick={()=>{if(isAppearNewPass){setIsAppearNewPass(false)}else{setIsAppearNewPass(true)}}}>
                            { isAppearNewPass ? 
                                <FaEyeSlash/>
                                :
                                <IoEyeSharp/>
                            }
                       </div>
                    </div>
                    <div className="col-md-4 again-pass">
                        <label  className="form-label">Nhập lại mật khẩu</label>
                        <input type={isAppearAgainPass ? "input" : "password" } value={againPass} onChange={(event)=>{setAgainPass(event.target.value)}} className="form-control" placeholder='Nhập lại mật khẩu' />
                        <div className='appear-pass'onClick={()=>{if(isAppearAgainPass){setIsAppearAgainPass(false)}else{setIsAppearAgainPass(true)}}}>
                            { isAppearAgainPass ? 
                                    <FaEyeSlash/>
                                    :
                                    <IoEyeSharp/>
                             }
                       </div>
                    </div>

                    <div className=' button-container'>
                        <button className="btn button-change" onClick={()=>{handleChangePassword()}} > Đổi mật khẩu</button>
                        <button className="btn button-return" > Quay lại</button>
                    </div>
               </div>
        </div>
    )
}

export default ChangePassword