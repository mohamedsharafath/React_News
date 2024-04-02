import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { NewsItem } from './NewsItem';

export const NewsBoard = ({category}) => {
  const[articles,setarticles]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
    const API_KEY="217d0916763641f2b74ee9ec9e3d5ce6"

    useEffect(()=>{
      const fetchData = async() => {
        try{
          setIsLoading(true);
          let url=`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`
          const response = await fetch(url);
          const data = await response.json();
          setarticles(data.articles)
          setIsLoading(false);
        }
        catch(error)
        {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
      fetchData()
    },[category])

   
    return (
      <>
      {/* <Navbar/> */}
      <div className='text-center'>
        <h2 className='text-center text-light'>Latest <span className='badge bg-danger'>{category} News</span></h2>
        {isLoading ? (
            <div class="d-flex justify-content-center my-5 text-light" >
            <div class="spinner-border"  role="status">
              <span class="visually-hidden " >Loading...</span>
            </div>
          </div>
        ) 
        :
        ( 
        <div>
            {articles.map((article,ind)=>{
            return <NewsItem key={ind} title={article.title} description={article.description} src={article.urlToImage} url={article.url}/>
            })}
        </div>
        )
        }
       
    </div>
    </>
  )
}
