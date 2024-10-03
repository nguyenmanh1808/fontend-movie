import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FcPlus } from "react-icons/fc";
import { fetchAllCategory } from "../../../../services/categoryService"; 
import './ManageCategory.scss'
import ModalCreateEdit from "./ModalCreateEdit";
import ModaConfirm from "./ModalConfirm";
import {deleteCategory} from '../../../../services/categoryService'
import { toast } from "react-toastify";
const ManageCategory = ()=>{

    const [listCategory,setListCategory] = useState([]);
    const  [show,setShow] = useState(false);
    const [action,setAction] = useState("CREATE");
    const [category,setCategory] = useState();
    const [categoryDelete,setCategoryDelete] = useState({});
    const [modalConfirm,setModalConfirm] = useState(false)
     // use effect
    useEffect(()=>{
        getCategory();
    },[])
    const getCategory = async()=>{
        let res = await fetchAllCategory();
        if(res.data && res.data.EC === 0){
            setListCategory(res.data.DT);
        }
    }
    const handleEdits = (item)=>{
        setAction("EDIT");
        setCategory(item);
        setShow(true)

    }
    /// delete
    const handleDelete= (item)=>{
        setCategoryDelete(item);
        setModalConfirm(true)
    }
    const handleDeleteConfirm = async()=>{
        let res = await deleteCategory(categoryDelete);
        if(res.data && res.data.EC === 0){
            toast.success("Xóa thành công");
            refresh();
            setModalConfirm(false);
            
        }
        else{
            toast.error(res.data.EM)
        }
    }
    const handleDeleteShowCloes = ()=>{
       setCategoryDelete({})
        setModalConfirm(false)
    }
    const refresh = ()=>{
        getCategory();
    }

    return (
        
            <div className="manage-category-container">
                <div className="title" > <h3>Quản lý thể loại phim</h3> </div>
                <div className="category-content">
                    <div className="table-category-container">
                    <div className="table-title"><h3>Danh sách thể loại</h3></div>
                    <div className="actions" onClick={()=>{setShow(true)}}>
                      <button className="btn btn-primary"> <FcPlus/> Add new category</button>
                    </div>
                    </div>
                    <div className="category-list">
                  <table className="table table-hover table-bordered">
                      <thead>
                          <tr>
                              <th> STT </th>
                              <th scope="col">ID</th>
                              <th scope="col">Tên</th>
                              
                          </tr>
                      </thead>
                      <tbody>
                          {listCategory && listCategory.length > 0 ? 
                              <>
                                  {listCategory.map((item,index)=>{
                                      return (
                                          <tr key={`row-${index} `}>
                                              <td>{ index + 1}</td>
                                              <td>{item.id}</td>
                                              <td>{item.name}</td>
                                              <td>
                                                  <button className="btn btn-warning me-3" onClick={()=>{handleEdits(item)}} ><FaPencilAlt/></button>
                                                  <button className="btn btn-danger" onClick={()=>{handleDelete(item)}} ><MdDelete/></button>
                                              </td>
                                          </tr>

                                      )
                                  })}
                              </>
                                  :
                              <>
                              </>
                          }
                      </tbody>    
                  </table>
                  </div>
                </div>
                <ModalCreateEdit show={show} setShow={setShow} refresh={refresh} action={action} setAction={setAction}
                 category={category}  setCategory={setCategory} />
                 <ModaConfirm show={modalConfirm} handleDeleteShowCloes={handleDeleteShowCloes} 
                    handleDeleteConfirm={handleDeleteConfirm}
                 />
            </div>
        
    )
}

export default ManageCategory;