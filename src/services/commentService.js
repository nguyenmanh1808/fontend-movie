import instance from "../until/axiosCustomize"

const fetchAllComment = (page,limit)=>{
    return  instance.get(`/comment/read?page=${page}&limit=${limit}`)
}
const fetchMovieComment = (movieId)=>{
    return  instance.get(`/comment/read?movieId=${movieId}`)
}
const deleteComment = (data)=>{
    return instance.delete('/comment/delete', {data:{id:data.id}})
}
const createComment = (data)=>{
    return instance.post(`/comment/create`,{...data})
}
export {fetchAllComment,deleteComment,fetchMovieComment,createComment}