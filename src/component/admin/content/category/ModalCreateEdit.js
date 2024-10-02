import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {createCategory,updateCategory} from '../../../../services/categoryService'
import { toast } from 'react-toastify';
const ModalCreateEdit = (props) => {

  const [name,setName] = useState();
  const {action,setAction} = props;
  const {category,setCategory} = props;

// use effect
  useEffect(()=>{
    if(action=== "EDIT"){
      setName(category.name);
    }
  },[category])
  const handleClose= ()=>{
    props.setShow(false);
    setName("");
    setAction("CREATE");
    setCategory("")
  }
  const createCate = async () =>{
    
     let res = await createCategory(name)
     if(res.data && res.data.EC === 0 ){
          handleClose();
          toast.success(res.data.EM);
          props.refresh();
     }
     else{
      toast.error(res.data.EM)
     }
  }

  const handleEditUser = async()=>{
    let data = {
      id: category.id,
      name: name
    }
    let res = await updateCategory(data);
    if(res.data && res.data.EC===0){
        
        toast.success("Cập nhật thành công");
        props.refresh();
        handleClose();
    }
  }
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.show} onHide={handleClose} backdrop centered >
        <Modal.Header closeButton>
          <Modal.Title>{action === "CREATE" ? "Thêm mới thể loại" : "Sửa thể loại"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-md-6">
            <label  className="form-label">Tên thể loại</label>
            <input type="text" className="form-control" id="inputCity" value={name} onChange={(event)=>{setName(event.target.value)}}/>
        </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{handleClose()}} >Quay lại</Button>
          <Button variant="primary" onClick={()=>{action === "CREATE" ? createCate():handleEditUser()}} >{action === "CREATE"?"Lưu" :"Cập nhật"} </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCreateEdit;