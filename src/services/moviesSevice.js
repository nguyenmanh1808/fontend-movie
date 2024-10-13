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
const getMovies = ()=>{
  return instance.get(`/movie/read`)
}
const createMovie = (data)=>{
  return (
    instance.post(`/movie/create`,{...data})
  )
}
const getMovieSearch =(data)=>{
  return instance.get(`/movie/read?q=${data}`)
}
const updateMovie = (data)=>{
  return (
    instance.put('/movie/update', {...data})
  )
}

const deleteMovie = (data)=>{
  return instance.delete('/movie/delete', {data:{id:data.id}})
}
// phim yêu thiichs
const movieLike = (data)=>{
  return instance.get(`/movie/like?data=${data}`)
}
const createMovieLike = (data)=>{
  return (
    instance.post(`/movie/createLike`,{...data})
  )
}
const deleteMovieLike = (data)=>{
  return instance.delete('/movie/deleteLike', {data:{data}})
}
/// lịch sử xem phim
const movieHistory = (data)=>{
  return instance.get(`/movie/history?data=${data}`)
}
const createMovieHistory = (data)=>{
  return (
    instance.post(`movie/create-history`,{...data})
  )
}
// type movie,movie national
const movieType = (data)=>{
  return instance.get(`/movie/type?data=${data}`)
}
const movieNational = (data)=>{
  return instance.get(`/movie/national?data=${data}`)
}
export {fetchAllMovies,fetchMovieById,getAllMovies,createMovie,updateMovie,deleteMovie,
  getMovies,getMovieSearch,
  movieLike,createMovieLike,deleteMovieLike,
  movieHistory,createMovieHistory,movieType,movieNational
}