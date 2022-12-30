import React, { useContext, useEffect } from 'react';
import BlogContext from '../Context/blogs/BlogContext';
import LongText from './LongText';
import "./CSS/BlogPage.css";


function AllBlogs() {
    const blogState = useContext(BlogContext);
    const { Blogs, getAllBlogs } = blogState;
    useEffect(() => {
        getAllBlogs();
        // eslint-disable-next-line
    }, [])

    return (
        <div >
            {Blogs.slice(0).reverse().map((item, index) => {
                let date = new Date(item.date);
                return (
                    <div class="blog-card">
                        <div class="meta">
                            <div class="photo" style={{"background-image": `url(${item.imageUrl})`}}></div>
                        </div>
                        <div class="description">
                            <h1>{item.title} </h1>
                            <h2>{item.author}, <em> Department of {item.department}</em></h2>
                            <p> Tags: {item.tags}</p>
                            <p> <LongText content={item.description} limit={200} /></p>
                            <p class="read-more">
                                <p>{date.toDateString()}</p>
                            </p>
                        </div>
                    </div>
                )

            })}
        </div>
    )
}

export default AllBlogs


// {/* // return (<div key={index} className="card my-3">
// //                     <div className="card-header">
// //                         {/* <h5 className="card-subtitle mb-2 text-muted">{date.toLocaleDateString()}</h5> */}
// {/* //                         <h5 className="card-title">{item.title}</h5>
// //                         <img src={item.imageUrl} alt="kun" />
// //                         <p className="card-text"><em>Written by </em>{item.author} <p className="card-text"><em>Department of {item.department} </em></p></p>

// //                     </div> */}
// {/* //                     <div className="card-body">
// //                         <p className="card-text"><LongText content={item.description} limit={300} /></p>
// //                         <p className="card-text"><em>Tags: </em>{item.tags} <br /> <em>Date: </em>{date.toLocaleDateString()}</p>
// //                     </div>
// //                 </div>) */} 