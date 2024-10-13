import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import axios from 'axios';
import {   toast } from 'react-toastify';
import { fetchGroup,createUsesr,updateUser } from '../../../../services/userService';
const ModalCreateUser = (props)=> {
  
  const {show,setShow} = props;
  const {dataUser,setDataUser}= props;
  const {action,setAction} =props;
  
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setAge("");
    setSex("Nam");
    setGroupId("");
    setObjCheckInput(defaulValidInput)
    setDataUser({});
    setAction("CREATE")
    // setImage("") ;
    // setPreviewImg("");
  };
  

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [groupId,setGroupId] = useState("");
  const [age,setAge] = useState("");
  const [sex,setSex] = useState("Nam")

  const [groups,setGroups] = useState([]);
  // const [image,setImage] = useState("");
  // const [previewImg,setPreviewImg] = useState("");
  //validate
  const defaulValidInput = {
    isValidEmail: true,
    isValidPassword: true
  }
  const [objCheckInput,setObjCheckInput] = useState(defaulValidInput);
  useEffect(()=>{
    getGroup();
  },[])
  useEffect(()=>{
    if(action ==="EDIT"){
      console.log(dataUser)
      setEmail(dataUser.email)
      setUsername(dataUser.username)
      setAge(dataUser.age)
      setGroupId(dataUser.groupId)
      setSex(dataUser.sex)
    }
      
  },[dataUser])

  //get group
  const getGroup = async ()=>{
      let res = await fetchGroup();
      if(res.data && res.data.EC=== 0){
        setGroups(res.data.DT);
      }
  }
  ///

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
    
    if(!password){
        toast.error("Mật khẩu trống");
        setObjCheckInput({...objCheckInput,isValidPassword:false})
        return false;
    }
    else {
      setObjCheckInput({...objCheckInput,isValidPassword:true})
  }
  if(age <13 || !age ){
    toast.error("Chưa đủ tuổi xem phim người lớn!");
    return false;
  }
    
    return true;

  }
 
  const handleSubmitUser = async() =>{
    let check = isValidInput();
    if( check === true){
      if(!groupId && groups.length>0){
        setGroupId(groups[0].id)
      }
      let dataUser = {
        email: email,
        password:password,
        username: username,
        groupId: groupId,
        age: age,
        sex: sex
      }
      console.log(dataUser)
      let res = await createUsesr(dataUser)
      if(res.data && res.data.EC === 0){
          handleClose();
          toast.success("Thêm mới thành công");
          props.resfesh();
      }
      else if(res.data && res.data.EC !== 0){
        toast.error(res.data.EM);
      }
    }
    
  }
  // xut lý update user
  const handleUpdateUser = async()=>{
    let data = {
      id:dataUser.id,
      email: email,
      username: username,
      groupId: groupId,
      age: age,
      sex: sex
    }
    console.log(data)
    let res = await updateUser(data)
    if(res.data && res.data.EC === 0){
        toast.success("Cập nhật thành công");
        handleClose();
        props.resfesh();
    }
    else if(res.data && res.data.EC !== 0){
      toast.error(res.data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size='xl' backdrop ="static" className="modal-add-user">
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'CREATE'? "Tạo mới người dùng" : "Sửa người dùng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
        <div className="col-md-6">
            <label  className="form-label" >Email</label>
            <input disabled={action === 'CREATE'? false : true} type="email"  className={objCheckInput.isValidEmail ? "form-control" : "form-control is-invalid" }   id="inputEmail4" value={email} onChange={(event) => {setEmail(event.target.value)}}
           />
        </div>
        <div className="col-md-6">
        {action === 'CREATE' && 
          <>
            <label  className="form-label">Password</label>
            <input type="password"  className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid" }  id="inputPassword4" value={password}  onChange={(event) => {setPassword(event.target.value)}}/>
          </>

        }
         </div>
        <div className="col-md-6">
            <label  className="form-label">Username</label>
            <input type="text" className="form-control" id="inputCity" value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
        </div>
        <div className="col-md-4">
            <label  className="form-label">Group</label>
            <select id="inputState" className="form-select" value={groupId} onChange={(event)=> setGroupId(event.target.value)} >
              {groups.length > 0 && 
                  groups.map((item,index)=>{
                    return (
                      <option key={`group-${index}`} value={item.id}> {item.name} </option>
                    )
                  })
              }
              
            </select>
        </div>
         <div className="col-md-6">
            <label  className="form-label">Age</label>
            <input type="number" className="form-control" id="inputCity" value={age} onChange={(event)=>{setAge(event.target.value)}}/>
        </div>
         <div className="col-md-4">
            <label  className="form-label">Giới tính</label>
            <select id="inputState" className="form-select" value={sex} onChange={event => setSex(event.target.value)}>
              <option value="Nam" > Nam </option>
              <option value="Nữ">Nữ</option>
            </select>
        </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={action === "CREATE" ? (()=>handleSubmitUser()) : (()=>handleUpdateUser())}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;