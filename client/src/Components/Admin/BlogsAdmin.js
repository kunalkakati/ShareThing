import React, { useContext, useEffect } from 'react';
import BlogContext from '../../Context/blogs/BlogContext';
import LongText from '../LongText';


function AllBlogs() {
  const blogState = useContext(BlogContext);
  const { Blogs, getAllBlogs, AdminDelete } = blogState;
  useEffect(() => {
    getAllBlogs();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {Blogs.slice(0).reverse().map((item, index) => {
        return (
          
        <div class="blog-card">
                <div class="meta">
                    <div class="photo" style={{ "background-image": `url(${item.imageUrl})` }}></div>
                </div>
                <div class="description">
                    <h1>{item.title} </h1>
                    <h2>{item.author}, <em> Department of {item.department}</em></h2>
                    <p> <LongText content={item.description} limit={200} /></p>
                    <p>{new Date(item.date).toDateString()}</p>
                    <p class="read-more">
                        <button className="btn btn-danger" onClick={() => { AdminDelete(item._id) }}>Delete</button>
                    </p>
                </div>
            </div>
        )
      })}
    </div>
  )
}

export default AllBlogs

//  {/* <div key={index} className="card my-3">
//           <div className="card-header">
//             <h5 className="card-title">{item.title}</h5>
//             <p className="card-text"><em>Written by </em>{item.author} <p className="card-text"><em>Department of {item.department} </em></p></p>

//           </div>
//           <div className="card-body">
//             <p className="card-text"><LongText content={item.description} limit={300} /></p>
//             <button className="btn btn-danger" onClick={() => { AdminDelete(item._id) }}>Delete</button>
//           </div>
//         </div>  */}