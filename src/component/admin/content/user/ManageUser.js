import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { FaRedoAlt,FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchAllUser,deleteUser } from "../../../../services/userService";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModaConfirm from "./ModalConfirm";

const  ManageUser = () =>{
    // modal create
    const [showModal,setShowModal] = useState(false);

    const[listUser,setListUser] = useState([]);
    const [currentPage,setCurrentPgae] = useState(1);
    const [limit,setCurrentLimit] = useState(6);
    const [totalPage,setTotalPage] = useState(0);

    const [showModalConfirm,setShowModalConfirm] = useState(false);
    //
    const [dataDelete,setDataDelete]= useState({});

    // action modal update
    const [actionModalUser,setActionModalUser] = useState("CREATE");
    // data user edit
    const [dataUser,setDataUser] = useState({});
    useEffect(()=>{
        fetchUser();
       
    },[currentPage])

    const fetchUser = async()=>{
       let respone =  await fetchAllUser(currentPage,limit);
       if(respone && respone.data && +respone.data.EC === 0){
            setTotalPage(respone.data.DT.toatalPage)
            setListUser(respone.data.DT.user)
            if(respone.data.DT.user.length === 0){
                setCurrentPgae(+currentPage-1)
            }
       }
    }
    
    const handelDeleteUser= (user)=>{
        setDataDelete(user)
        setShowModalConfirm(true)
            

    }
    const handleDeleteShowCloes =()=>{
            setShowModalConfirm(false);
            setDataDelete({})
    }

    const handlePageClick = async (event) => {
        setCurrentPgae(event.selected+1);
      };
      // xác nhận xóa
    const handleDeleteConfirm = async()=>{
        let respone = await deleteUser(dataDelete);
            if(respone.data && respone.data.EC=== 0){
                toast.success(respone.data.EM);
                await fetchUser();
                setShowModalConfirm(false);
            }
            else{
                toast.error(respone.data.EM)
                setShowModalConfirm(false);
            }
    }
    //xurlys sửa ng dùng
    const handleEditUser = (user)=>{
        setDataUser(user);
        setActionModalUser("EDIT");
        setShowModal(true);
      
    }
    // resfesh khi thêm mới ng dg
    const resfesh= async ()=>{
       await fetchUser();
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Quản lý người dùng
            </div>
            <div className="user-content">
                
                <div className="table-users-container">
                    <div className="table-title"><h3>Danh sách người dùng</h3></div>
                    <div className="actions">
                        <button className="btn btn-success" onClick={()=> resfesh()}>  <FaRedoAlt />Refesh</button>
                        <button className="btn btn-primary" onClick={()=>setShowModal(true)}> <FcPlus/> Add new user</button>

                    </div>
                </div>
                <div className="user-list">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th> STT </th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Age</th>
                                <th scope="col">Sex</th>
                                <th scope="col">Group</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 ? 
                                <>
                                    {listUser.map((item,index)=>{
                                        return (
                                            <tr key={`row-${index} `}>
                                                <td>{(currentPage-1)*limit + index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.age ? item.age : ""}</td>
                                                <td>{item.sex ? item.sex : ""}</td>
                                                <td>{item.Group ? item.Group.name : ""}</td>
                                                <td>
                                                    <button className="btn btn-warning me-3" onClick={()=>handleEditUser(item)}><FaPencilAlt/></button>
                                                    <button className="btn btn-danger" onClick={()=>handelDeleteUser(item)}><MdDelete/></button>
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
                
               {+totalPage > 0  && 
                    <div className="user-panination">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={limit}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
               }
                
            </div>
            <ModalCreateUser dataUser={dataUser} setDataUser={setDataUser} show={showModal} 
            setShow={setShowModal} 
            resfesh={resfesh} action={actionModalUser}  setAction={setActionModalUser} />

            <ModaConfirm show={showModalConfirm} handleDeleteShowCloes={handleDeleteShowCloes} 
                handleDeleteConfirm= {handleDeleteConfirm}
            />
        </div>
    )
}

export default ManageUser;