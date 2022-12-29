import React, { useContext, useEffect } from 'react';
import BlogContext from '../Context/blogs/BlogContext';
import LongText from './LongText';


function AllBlogs() {
    const blogState = useContext(BlogContext);
    const { Blogs, getAllBlogs } = blogState;
    useEffect(() => {
     getAllBlogs();
     // eslint-disable-next-line
    }, [])
    
    return (
        <div>
            {Blogs.slice(0).reverse().map((item, index) => {
                let date = new Date(item.date);
                return (<div key={index} className="card my-3">
                    <div className="card-header">
                        {/* <h5 className="card-subtitle mb-2 text-muted">{date.toLocaleDateString()}</h5> */}
                        <h5 className="card-title">{item.title}</h5>
                        <img src={item.imageUrl} alt="kun" />
                        <p className="card-text"><em>Written by </em>{item.author} <p className="card-text"><em>Department of {item.department} </em></p></p>
                        
                    </div>
                    <div className="card-body">
                        <p className="card-text"><LongText content={item.description} limit={300} /></p>
                        <p className="card-text"><em>Tags: </em>{item.tags} <br /> <em>Date: </em>{date.toLocaleDateString()}</p>
                    </div>
                </div>)
            })}
        </div>
    )
}

export default AllBlogs