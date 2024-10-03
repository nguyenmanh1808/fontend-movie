
import  { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import './Register.scss';
import {  toast } from 'react-toastify';
import {registerNewUser} from '../../services/userService';
const Register = (props)=>{
    const  [email,setEmail] = useState("");
    const   [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [rePassword,setReEnterPasswod] =useState("");
    const [age,setAge] = useState("");
    const defaulValidInput = {
        isValidEmail: true,
        isValidPassword: true,
        isValidRePassword: true
    }
    
    const [objCheckInput,setObjCheckInput] = useState(defaulValidInput);
    // chuyển hướng sang đăng nhập
    let history = useNavigate();
    const HandleNewAcount = () =>{
        history("/login")
   }
   // check validate email
   const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
   //check validate
   const isValidInput = ()=>{
        if(!email){
            toast.error("Email rỗng!");
            setObjCheckInput({...objCheckInput,isValidEmail:false})
            return false;
        }
        else if(!validateEmail(email)){
            toast.error("Email không hợp lệ!");
            setObjCheckInput({...objCheckInput,isValidEmail:false})
            return false;
        }
        else if(validateEmail(email)){
            setObjCheckInput({...objCheckInput,isValidEmail:true})
        }
        if(!username){
            toast.error("Tên người dùng rỗng!");
            return false;
        }
       
        if(!password){
            toast.error("Mật khẩu trống");
            setObjCheckInput({...objCheckInput,isValidPassword:false})
            return false;
        }
        
        if(password !== rePassword){
            toast.error("Mật khẩu không khớp nhau!");
            setObjCheckInput({...objCheckInput,isValidRePassword:false})
            return false;
        }
        return true;

   }

    /// xử lý bấm tạo ms ngiowf dùng
    const handleOnclick = async () =>{
       let check = isValidInput();

        if(check === true){
            setObjCheckInput({...objCheckInput,isValidEmail:true,isValidPassword:true,isValidRePassword:true})


           let response = await registerNewUser( email,username,password,age);

           let severData = response.data;

           if(+severData.EC === 0 ){
                toast.success(severData.EM);
                history('/login')
           }
           else{
                toast.error(severData.EM);
           }

        }
        
    }

    //

   useEffect(()=>{
        
        
        
   },[])

    return (
        <div className="register-container ">
        <div className="container">
            <div className="row">
                <div className="content-left  col-7">
                    <div className='brand'>
                        <Link to="/" >TVWatch</Link>
                    </div>
                    <div className='detail'>
                        Giải trí, thư giãn cho mọi người...
                    </div>
                </div>
                <div className="content-right  col-5 d-flex flex-column gap-3 py-3">
                   <div className='form-group'>
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className={objCheckInput.isValidEmail ? "form-control" : "form-control is-invalid" }  placeholder='Email' value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                   </div>

                   <div className='form-group'>
                    <label  className="form-label">User name</label>
                    <input type="text" className="form-control" placeholder='User name' value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
                   </div>

                   <div className='form-group'> 
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid" }  placeholder='Password' value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
                   </div>

                   <div className='form-group'>
                    <label  className="form-label">Re-enter password</label>
                    <input type="password" className={objCheckInput.isValidRePassword? "form-control" : "form-control is-invalid" } placeholder='Re-enter password' value={rePassword} onChange={(event)=>{setReEnterPasswod(event.target.value)}}/>
                   </div>

                   <div className='form-group'>
                    <label  className="form-label">Age</label>
                    <input type="text" className="form-control" placeholder='Age' value={age} onChange={(event)=>{setAge(event.target.value)}}/>
                   </div>

                    <button className='btn btn-primary' type='submit' onClick={()=> handleOnclick()}>Submit</button>
                    <hr/>
                    <div className='text-center'>
                        <button className='btn btn-success' onClick={()=>HandleNewAcount()}>Already've an account</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default Register;