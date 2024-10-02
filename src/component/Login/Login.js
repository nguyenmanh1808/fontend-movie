import { useEffect, useState } from 'react';
import './Login.scss'
import {Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import {loginUser} from '../../services/userService'
import { useDispatch,useSelector} from 'react-redux';
import {doLogin} from '../../redux/action/userAction';
import { ImSpinner10 } from "react-icons/im";
//Trong react-router-dom v6 useHistory() được thay thế bằng useNavigate().
const Login = (props) =>{
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);  
    let history = useNavigate();
    const dispatch = useDispatch();


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    ///
    const [isLoading,setIsLoading]= useState(false)
    const handleLogin=  async()=>{
       if(!email){
        toast.error("Email không hợp lệ");
        return;
       }
       if(!password){
        toast.error("Mật khẩu không được để trống");
        return;
       }
       setIsLoading(true);
      let response = await loginUser(email,password);
      let severData = response.data;

      if(response && response.data && +severData.EC === 0 ){
            dispatch(doLogin(severData.DT))
           toast.success(severData.EM);
           setIsLoading(false);
           if(severData.DT.data.id === 1){
            history("/admin")
           }
           else{
            history('/')
           }      
      }

      else if(response && response.data && +severData.EC !== 0){
            setIsLoading(false);
           toast.error(severData.EM);
      }
    }
    ///
    const handleOnKeyPress = (event)=>{
        if(event.charCode === 13 && event.code === "Enter"){
            handleLogin();
        }
    }   
     ///
   const HandleNewAcount = () =>{
        history("/register")
   }
   ////
   
   useEffect(()=>{
        if(isAuthenticated === true){
                history("/")
        }
   },[])
    return (
        <div className="login-container ">
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
                        <input type='text' className='form-control'  placeholder='Email hoặc SĐT' value={email} onChange={(event)=>setEmail(event.target.value)}/>
                        <input  type='password' className='form-control'  placeholder='Mật khẩu' value={password} onChange={(event => setPassword(event.target.value))} onKeyPress={(event=>handleOnKeyPress(event))}/>
                        <button disabled={isLoading} className='btn btn-primary' typeof='submit' onClick={()=>handleLogin()}>
                          { isLoading &&
                              <ImSpinner10 className="loaderIcon"/>
                          }
                            <span>Login</span> 
                        </button>
                        <span className='text-center'>
                            <a href='#' className='forgot-password'>Forgot your password?</a>
                        </span>
                        <hr/>
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={()=>HandleNewAcount()}>Create new account</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login