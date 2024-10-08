import { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import {   toast } from 'react-toastify';
import { fetchAllCategory,fetchCategoryByMovieId } from '../../../../services/categoryService';
import { createMovie,updateMovie } from '../../../../services/moviesSevice';
const ModalCreateMovie = (props)=> {
  const {show,setShow} = props;
  const {dataMovie,setDataMovie}= props;
  const {actionModal,setActionModal} = props;
  const handleClose = () => {
    setShow(false);
    setName("");
    setSlug("");
    setDescription("");
    setType("");
    setEpTotal();
    setActor();
    setImage("") ;
    setNational("");
    setPreviewImg("");
    setIsCategory(false);
    setInputCategory("");
    setIdcategory([]);
    setDataMovie({});
    setYear("");
    setImgThumb("");
    setPreviewImg2("");
    setActionModal("CREATE");
  };
  
  const [name,setName]= useState("");
  const [slug,setSlug]= useState("");
  const [description,setDescription] = useState("");
  const [type,setType]= useState("");
  const [view,setView] = useState(0);
  const  [time,setTime] =useState();
  const [status,setStatus] = useState("")
  const  [national,setNational] = useState("");
  const [ep_curent,setEpCurent]= useState(0);
  const [ep_total,setEpTotal]= useState()
  const [url_img,setImage] = useState("");
  const [img_thumb,setImgThumb] = useState("");
  const [year,setYear] = useState("");
  const [actor,setActor] = useState("");
  const [previewImg,setPreviewImg] = useState("");
  const [previewImg2,setPreviewImg2] = useState("");
  ////
  const [inputCategory,setInputCategory] = useState([])
  const [idCategory,setIdcategory] = useState([]);
  const [isCategory,setIsCategory] = useState(false)
  const [listIdCateMovie,setListIdCateMovie] = useState([]);
  // duwxlieeuj fixx cứng
  const [listCategory,setListCategory]= useState([])
  ///useEfech

  useEffect(()=>{
    getCategory();
   
  },[])

  useEffect(()=>{
    if(actionModal === 'EDIT'){
      getCategoryByIdMovie();
      setName(dataMovie.name);
      setSlug(dataMovie.slug);
      setType(dataMovie.type);
      setStatus(dataMovie.status);
      setActor(dataMovie.actor?dataMovie.actor : "");
      setNational(dataMovie.national);
      setDescription(dataMovie.description);
      setEpTotal(dataMovie.ep_total);
      setYear(dataMovie.year?dataMovie.year: "" );
      setPreviewImg(require(`../../../../assets/img_poster/${dataMovie.url_img}`))
      setPreviewImg2(dataMovie.img_thumb? require(`../../../../assets/SlideImage/${dataMovie.img_thumb}`):"" );
      setIsCategory(true)
    }
  },[dataMovie])
  //// lấy danh mục
  const getCategory = async () =>{
    let res = await fetchAllCategory();
    if(res.data && res.data.EC=== 0){
            setListCategory(res.data.DT);
            console.log(res.data.DT)
        }
    }
  // xử lý update ảnh
  const handleImgUpload = (event) =>{
    if(event.target && event.target.files && event.target.files[0]){
        setPreviewImg(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0])
    }
    else{
        // setPreviewImg(null)
    }
  }
  ////
  const handleImgThumbUpload = (event) =>{
    if(event.target && event.target.files && event.target.files[0]){
        setPreviewImg2(URL.createObjectURL(event.target.files[0]))
        setImgThumb(event.target.files[0])
    }
    else{
        // setPreviewImg(null)
    }
  }
  // xử lý inut categroy
  
  const handleInputCategory = (event,item) =>{
   
    if(event.target.checked === true){
      setInputCategory([...inputCategory,item.name]);
      setIdcategory([...idCategory,item.id])
    }
    else {

      let arr = [...inputCategory];
      let arrId = [...idCategory];
      arr = arr.filter((a)=>{
          return a!== item.name;
      })
      arrId = arrId.filter((id)=>{
          return id!== item.id
      })
      setInputCategory([...arr]);   
      setIdcategory ([...arrId]); 
    }
  }
  //xử lý input category khi edit
 
  ////
  const checkValue = ()=>{
    if(!name){
      toast.error("Tên phim trống");
      return false;
    }
    if(!slug){
      toast.error("Slug phim trống");
      return false
    }
    if(!inputCategory){
      toast.error("Thể loại phim trống");
      return false;
    }
    if(!description){
      toast.error("Giới thiệu phim trống");
      return false;
    }
    if(!url_img  && !dataMovie.url_img){
      toast.error("Poster phim trống");
      return false;
    }
    if(!img_thumb  && !dataMovie.img_thumb){
      toast.error("Slide phim trống");
      return false;
    }
    if(!national){
      toast.error("Quốc gia  trống");
      return false;
    }
    return true;
  }
  /// handle submit
  const handleCreateMovie = async() =>{
    let check  = checkValue();
    if(check){
      let data = {
        name: name,
        slug: slug,
        description: description,
        type: type ?  type : "series",
        time: 0,
        status: "Đang cập nhật",
        national: national,
        view: view,
        ep_curent: ep_curent,
        ep_total: ep_total ? +ep_total : 0,
        url_img: url_img.name,
        actor: actor ? actor : "",
        year:year,
        img_thumb: img_thumb.name,
        categoryId: idCategory
      }
      let res = await createMovie(data);

      if(res.data && res.data.EC === 0){
        toast.success("Thêm mới thành công");
        handleClose();
        props.resfesh();
      }
      else if(res.data && res.data.EC !== 0){
        toast.error(res.data.EM);
    }
    }
  }
  // lấy danh mục theo id film
  const getCategoryByIdMovie = async()=>{
      if(actionModal === 'EDIT'){
        let res = await fetchCategoryByMovieId(dataMovie.id);
        if(res.data && res.data.EC=== 0){
            let arrId = res.data.DT.map((item,index)=>{
                return item.id
            })
            let arr = res.data.DT.map(item =>{
                return item.name
            })
            setListIdCateMovie([...arrId]);
            setInputCategory([...arr]);
        }
      }
  }
  // lấy category khi update
  const handleEditCategory = (event,item)=>{
    let arrId = [...listIdCateMovie];
    let arr = [...inputCategory];
      if(listIdCateMovie.includes(item.id)){
        event.target.checked = false;

          arrId = listIdCateMovie.filter((id)=>{
              return id!== item.id;
          })
          arr = inputCategory.filter((name)=>{
              return name !== item.name
          })
          setListIdCateMovie([...arrId]);
          setInputCategory([...arr]);
      }
      else{
        event.target.checked= true;
        setListIdCateMovie([...listIdCateMovie,item.id])
        setInputCategory([...inputCategory,item.name])
      }
  }
  // handle edit
  const handleEditMovie = async()=>{
    let check = checkValue();

    if(check){
        let data = {
          id: dataMovie.id,
          name: name,
          slug: slug,
          description: description,
          type: type ?  type : "series",
          time: 0,
          status: status,
          national: national,
          view: view,
          ep_curent: ep_curent,
          ep_total: ep_total ? +ep_total : 0,
          url_img: url_img.name ? url_img.name : dataMovie.url_img,
          actor: actor ? actor : "",
          year:year? year : "",
          img_thumb: img_thumb.name ? img_thumb.name : dataMovie.img_thumb,
          categoryId: listIdCateMovie
        }
        let res = await updateMovie(data);
    
        if(res.data && res.data.EC === 0){
          toast.success("Update thành công");
          handleClose();
          props.resfesh();
        }
        else if(res.data && res.data.EC !== 0){
          toast.error(res.data.EM);
        }
    }

  }
  return (
    <>
      <Modal show={show} onHide={handleClose} size='xl' backdrop ="static" className="modal-add-user">
        <Modal.Header closeButton>
          <Modal.Title>{actionModal === "CREATE" ? "Add new movie" : "Edit movie"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
        <div className="col-md-6">
            <label  className="form-label">Tên</label>
            <input type="text" className="form-control"    value={name} onChange={(event) => {setName(event.target.value)}}
           />
        </div>
        <div className="col-md-6">
            <label  className="form-label">Slug</label>
            <input type="text" className="form-control"   value={slug}  onChange={(event) => {setSlug(event.target.value)}}/>
        </div>
       
        <div className="col-md-6">
            <label  className="form-label">Loại phim</label>
            <select id="inputState" className="form-select" value={type} onChange={event => setType(event.target.value)}>
            <option  value="series"> Phim bộ </option>
            <option value="single">Phim lẻ</option>
            </select>
        </div>
        <div className="col-md-6">
            <label  className="form-label">Diễn viên</label>
            <input type="text" className="form-control"   value={actor}  onChange={(event) => {setActor(event.target.value)}}/>
        </div>
        <div className="col-md-6">
            <label  className="form-label">Quốc gia</label>
            <input type="text" className="form-control"   value={national}  onChange={(event) => {setNational(event.target.value)}}/>
        </div>
        <div className="col-md-6">
            <label  className="form-label">Thể loại phim</label>
            <input type='text' className='form-control'  value={inputCategory.toString()} onChange={()=>{}} onClick={()=>{setIsCategory(true)}}/> 
        </div>
         <div className="col-md-6 mt-4">
         { actionModal === "EDIT" &&
          <>
            <label  className="form-label">Trạng Thái</label>
            <select id="inputState" className="form-select" value={status} onChange={event => setStatus(event.target.value)}>
            <option  value="Đang cập nhật"> Đang câp nhật </option>
            <option value="Hoàn thành">Hoàn thành</option>
          </select>
          </>
            
         }
        </div>
        <div className=" check-category col-md-6 row">
        {
          isCategory && listCategory && listCategory.length > 0 && actionModal === "CREATE"&&
            listCategory.map((item,index)=>{
                return (
                  
                     <div  key={index} className="form-check col-md-4">
                      <input   className="form-check-input" type="checkbox" value={item.id} onChange={()=>{}} id={index} onClick={(event)=>{handleInputCategory(event,item)}}/>
                        <label className="form-check-label" htmlFor={index}>
                          {item.name}
                        </label>
                       </div>
                    
                )
            })
        }
        {
          isCategory && listCategory && listCategory.length > 0 && actionModal==="EDIT" &&
            listCategory.map((item,index)=>{
                return (
                    <>
                     <div  key={index} className="form-check col-md-4">
                      <input checked={listIdCateMovie.includes(item.id)}  className="form-check-input" type="checkbox" value={item.id} id={index} onClick={(event)=>{handleEditCategory(event,item)}}/>
                        <label className="form-check-label" htmlFor={index}>
                          {item.name}
                        </label>
                       </div>
                    </>
                )
            })
        }
         </div>
        <div className="col-md-12">
            <label  className="form-label">Description</label>
            <textarea id="form-label" name="w3review" className='form-control' rows="4" cols="50" value={description} onChange={(event)=>{setDescription(event.target.value)}}></textarea>
        </div>
        <div className='col-md-6'>
            <label className='form-lable lable-upload' htmlFor='lableUpload'> 
                <FcPlus/>
                 Upload poster image</label>
            <input id='lableUpload' type='file' hidden    onChange={event => handleImgUpload(event)} />
        </div>
        <div className='col-md-6'>
            <label className='form-lable lable-upload' htmlFor='lableUpload2'> 
                <FcPlus/>
                 Upload image thumb</label>
            <input id='lableUpload2' type='file' hidden    onChange={event => handleImgThumbUpload(event)} />
        </div>
        <div className='col-md-6 img-preview  '>
            {previewImg ? 
                <img src={previewImg} />
                :
                <span>Preview image</span>
            }
            
        </div>
        <div className='col-md-6 img-preview thumb-img'>
            {previewImg2 ? 
                <img src={previewImg2} />
                :
                <span>Preview image</span>
            }
            
        </div>
        <div className="col-md-3">
            <label  className="form-label">Số tập phim</label>
            <input type="number" className="form-control"   value={ep_total}  onChange={(event) => {setEpTotal(event.target.value)}}/>
        </div>
        <div className="col-md-3">
            <label  className="form-label">Năm phát hành</label>
            <input type="text" className="form-control"   value={year}  onChange={(event) => {setYear(event.target.value)}}/>
        </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={actionModal === "CREATE" ? handleCreateMovie : handleEditMovie}>
           {actionModal === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateMovie;