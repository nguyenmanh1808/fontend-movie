import instance from "../until/axiosCustomize"


const registerNewUser =  (email,username,password,age)=>{
  return (
    instance.post('/register', {
      email,username,password,age
    })
  )
    
}
const loginUser = (email,password)=>{
  return instance.post('/login', {
      email,password
    })
  
}

const fetchAllUser = (page,limit)=>{
  return instance.get(`/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user)=>{
  return instance.delete('/user/delete', {data:{id:user.id}})
}

const fetchGroup = ()=>{
  return instance.get(`/group/read`)
} 

const createUsesr = (data)=>{
  return (
    instance.post('/user/create', {...data})
  )
}
const updateUser = (data) =>{
  return (
    instance.put('/user/update', {...data})
  )
}

const logOutUser = ()=>{
  return instance.post('/logout');
}


const fetchAcount = (data)=>{
  return instance.get(`/account/read?data=${data}`)
}
const updatePassword = (data)=>{
  return instance.put(`/account/password/update `,{...data})
}
export {registerNewUser,loginUser,fetchAllUser,deleteUser,fetchGroup,createUsesr,updateUser,logOutUser,fetchAcount,
  updatePassword
};