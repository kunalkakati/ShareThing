import React, { useContext, useEffect, useState } from 'react';
import BlogContext from '../Context/blogs/BlogContext';
import LongText from './LongText';
import "./CSS/BlogPage.css";
import Progress from './Progress';



function Blogs() {
    const blogState = useContext(BlogContext);
    const { Blogs, getAllBlogs } = blogState;
    const [progress, setProgress] = useState(false);
    useEffect(() => {
        setProgress(true);
        getAllBlogs();
        setProgress(false);
        // eslint-disable-next-line
    }, [])

    return (
        <>
        <Progress state={progress} />
        <div >
            {Blogs.slice(0).reverse().map((item, index) => {
                let date = new Date(item.date);
                return (
                    <div className="blog-card" key={index}>
                        <div className="meta">
                            <div className="photo" style={{"backgroundImage": `url(${item.imageUrl})`}}></div>
                        </div>
                        <div className="description">
                            <h1>{item.title} </h1>
                            <h2>By {item.author} from {item.department} department</h2>
                            <p> Tags: {item.tags}</p>
                            <p><LongText content={item.description} limit={200} /></p>
                            <p className="read-more">
                                {date.toDateString()}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default Blogs


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