import instance from "../until/axiosCustomize"


const fetchAllCategory = ()=>{
    return  instance.get(`/category/read`)
}

const fetchCategoryByMovieId = (id)=>{
  return instance.get(`/category/read?movieid=${id}`)
}
const fetchCategoryByid= (id)=>{
  return instance.get(`/category/read?id=${id}`)
}
const createCategory = (data)=>{
  return instance.post(`/category/create`,{data})
}
const updateCategory = (data)=>{
  return instance.put(`/category/update`,{...data})
}
const deleteCategory = (category)=>{
  return instance.delete('/category/delete', {data:{id:category.id}})
}
export {fetchCategoryByMovieId,fetchAllCategory,fetchCategoryByid,createCategory,updateCategory,deleteCategory}