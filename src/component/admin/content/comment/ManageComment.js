import { useEffect, useState } from 'react';
import {fetchAllComment,deleteComment} from '../../../../services/commentService';
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FcPlus } from "react-icons/fc";
import './ManageComment.scss';
import ReactPaginate from 'react-paginate';
import ModaConfirm from './ModalConfirm';
import { toast } from 'react-toastify';
const ManageComment = ()=>{

    const [listComment,setListComment] = useState([]);
    ////
      //pagnination
      const [currentPage,setCurrentPgae] = useState(1);
      const [limit,setCurrentLimit] = useState(6);
      const [totalPage,setTotalPage] = useState(0);
    ////
    const [dataDelete,setDataDelete] = useState({});
    const [modalConfirm,setModalConfirm] = useState(false)
    //
    useEffect(()=>{
        getComment();
    },[currentPage])
    ///
    const handlePageClick = async (event) => {
        setCurrentPgae(event.selected+1);
    };
    const getComment = async()=>{
        let res = await fetchAllComment(currentPage,limit);
        if(res.data && res.data.EC === 0){
            setListComment(res.data.DT.comment);
            setTotalPage(res.data.DT.toatalPage)
            if(res.data.DT.comment.length === 0){
                setCurrentPgae(+currentPage-1)
            }
            console.log(res.data.DT.comment)
        }
    }
/// delete
const handleDelete= (item)=>{
    setDataDelete(item);
    setModalConfirm(true)
}
const handleDeleteConfirm = async()=>{
    let res = await deleteComment(dataDelete);
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
    setDataDelete({})
    setModalConfirm(false)
}
const refresh = ()=>{
    getComment();
}
    return(
        <div className="manage-comment-container">
        <div className="title" > <h3>Quản lý bình luận</h3> </div>
        <div className="comment-content">
            <div className="table-comment-container">
            <div className="table-title"><h3>Danh sách bình luận</h3></div>
            <div className="actions">
             
            </div>
            </div>
            <div className="comment-list">
          <table className="table table-hover table-bordered">
              <thead>
                  <tr>
                      <th> STT </th>
                      <th scope="col">ID</th>
                      <th scope='col'>Tên người dùng</th>
                      <th scope="col">Tên phim</th>
                      <th scope='col'>Nội dung bình luận</th>
                      <th scope='col'>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {listComment && listComment.length > 0 ? 
                      <>
                          {listComment.map((item,index)=>{
                            console.log(item)
                              return (
                                  <tr key={`row-${index} `}>
                                      <td>{ index + 1}</td>
                                      <td>{item.id}</td>
                                      <td>{item.User.username}</td>
                                      <td>{item.Movie.name}</td>
                                      <td width={'40%'}>{item.content}</td>
                                      <td>
                                          <button className="btn btn-danger"  onClick={()=>handleDelete(item)} ><MdDelete/></button>
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
                        <div className='movie-pagnination'>
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
       
        <ModaConfirm show={modalConfirm} handleDeleteConfirm={handleDeleteConfirm} handleDeleteShowCloes={handleDeleteShowCloes} />
    </div>
    )
}

export default ManageComment;