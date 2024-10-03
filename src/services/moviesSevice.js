import instance from "../until/axiosCustomize"

const fetchAllMovies = (data)=>{
    return instance.get(`/movie/read?category=${data}`)
  }

const fetchMovieById = (id)=>{
  return instance.get(`/movie/read?id=${id}`)
}

const getAllMovies = (page,limit)=>{
    return instance.get(`/movie/read?page=${page}&limit=${limit}`)
}

const createMovie = (data)=>{
  return (
    instance.post(`/movie/create`,{...data})
  )
}

const updateMovie = (data)=>{
  return (
    instance.put('/movie/update', {...data})
  )
}

const deleteMovie = (data)=>{
  return instance.delete('/movie/delete', {data:{id:data.id}})
}
export {fetchAllMovies,fetchMovieById,getAllMovies,createMovie,updateMovie,deleteMovie}