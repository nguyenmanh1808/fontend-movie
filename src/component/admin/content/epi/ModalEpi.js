import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {   toast } from 'react-toastify';
import { FcPlus } from "react-icons/fc";
import { useParams } from 'react-router-dom';
import { createEpi,updateEpi } from '../../../../services/epsService';
const ModalEpi = (props)=> {
  let { id } = useParams();
  //props
  const {show,setShow} = props;
  const {nameMovie} = props;
  const {action,setAction} = props;
  const {dataEpi,setDataEpi} = props;
  // data
  const[name,setName] = useState("")
  const [slug,setSlug] = useState("")
  const [video,setVideo] = useState("")
  const [preVideo,setPreVideo] = useState("")
  // reset dữ liệu
  const handleClose = () => {
    setShow(false);
    setName("");
    setSlug("");
    setPreVideo("");
    setVideo("");
    setDataEpi({});
    setAction("CREATE")
  };
  
  useEffect(()=>{
    if(action === "EDIT"){
        setName(dataEpi.name);
        setSlug(dataEpi.slug);
        setPreVideo(require(`../../../../assets/video/${dataEpi.ep_url}`))
    }
  },[dataEpi])

 // video
 const handleVideoUpload = (event) =>{
  if(event.target && event.target.files && event.target.files[0]){
    setPreVideo(URL.createObjectURL(event.target.files[0]))
      setVideo(event.target.files[0])
  }
  else{
      // setPreviewImg(null)
  }
}
  /// xử lý thêm mới
  const handleSubmit = async()=>{
    let check = checkValue();
     if(check){
      let data = {
        movieId: id,
        slug: slug,
        name: name,
        ep_url: video.name
    }

    let res = await createEpi(data);
    if(res.data && res.data.EC === 0){
        toast.success(res.data.EM);
        handleClose();
        props.getEpi();
    }
    else{
      toast.error(res.data.EM);
    }
  }
}
  // xử lsy edit 

  const handleEdit = async()=>{
    let check = checkValue();
    if(check){
      let data = {
            id: dataEpi.id,
            name: name,
            ep_url: video.name ? video.name : dataEpi.ep_url
      }
      let res = await updateEpi(data);
      if(res.data && res.data.EC === 0){
          toast.success(res.data.EM);
          props.getEpi();
          handleClose();
      }
    }
    
  }

  //check validate
  const checkValue = ()=>{
    if(!name){
      toast.error("Tên tập trống");
      return false;
    }
    if(!slug){
      toast.error("Tập phim trống");
      return false
    }
    if(!video  && !dataEpi.ep_url){
      toast.error("Nội dung tập phim trống");
      return false;
    }
    return true;
  }
 

  return (
    <>
      <Modal show={show} onHide={handleClose} size='xl' backdrop ="static" className="modal-add-user">
        <Modal.Header closeButton>
          <Modal.Title>
              {action === "EDIT" ? "Sửa tập phim" : "Thêm mới tập phim" }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
        <div className="col-md-12">
            <label  className="form-label" >Tên phim</label>
            <input disabled type="text"  className="form-control"  value={nameMovie}  id="inputEmail4" />
        </div>
        <div className="col-md-6">
        <label  className="form-label">Tên tập</label>
        <input type="text" className="form-control" value={name}  onChange={(event)=>{setName(event.target.value)}} />
         </div>
        <div className="col-md-6">
            <label  className="form-label">Tập </label>
            <input disabled={action === "EDIT" ? true : false } type="number" className="form-control" value={slug} onChange={(event)=>{setSlug(event.target.value)}} />
        </div>
        <div className='col-md-12'>
            <label className='form-lable lable-upload' htmlFor='lableUpload'> 
                <FcPlus/>
                 Upload video</label>
            <input id='lableUpload' type='file' hidden    onChange={event => handleVideoUpload(event)} />
        </div>
        <div className='col-md-6 img-preview'>
            {preVideo ? 
               <video autoPlay  muted loop width={"100%"} height={"100%"} >
               <source 
                  src={preVideo} type='video/mp4'
                />
                </video>
                :
                <span>Preview video</span>
            }
            
        </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{handleClose()}} >
            Close
          </Button>
          <Button variant="primary" onClick={action === "EDIT" ? handleEdit : handleSubmit} >
             {action === "EDIT" ? "Cập nhật" :"Lưu"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEpi;