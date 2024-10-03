
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({Component})=>{
        const account = useSelector(state => state.user.account);
        const isAuthenticated = useSelector(state => state.user.isAuthenticated);  
        if(isAuthenticated === true && account.roles.id === 1){
                return  <Component/>
        }
         else{
                return (
                        <>
                        <div>
                                404 not found
                        </div>
                        </>
                )
         } 
}

export default PrivateRoutes;