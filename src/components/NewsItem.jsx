import React from 'react'
import image from '../assets/news.jpg'
export const NewsItem = ({title,description,src,url}) => {
  return (
    <>
        <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{maxWidth:"345px"}}>
        <img src={src?src:image} className="card-img-top" style={{height:"200px",width:"330px"}} alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={url} className="btn btn-primary">Read more</a>
        </div>
        </div>
    </>
  )
}

