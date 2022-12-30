import React, { useContext } from 'react';
import AlertContex from '../Context/blogs/AlertContext';
import blogContext from '../Context/blogs/BlogContext';
import LongText from './LongText';




function BlogItem({ blog, OpenModal }) {
    const blogState = useContext(blogContext);
    const alertState = useContext(AlertContex);
    const { giveAlert } = alertState;
    // eslint-disable-next-line
    const { deleteBlog } = blogState;
    const date = new Date(blog.date);
    return (
        <>
            {/* <div className="card my-3">
                <div className="card-header">
                    <h4 className="card-title">{blog.title}</h4>
                    <p className="card-text"><em>Date: </em>{date.toLocaleDateString()}</p>
                </div>
                <div className="card-body">
                    <p className="card-text">{blog.description}</p>
                    <p className="card-text"><em>Tags: </em>{blog.tags} </p>
                    <button className="btn btn-info" onClick={() => { OpenModal(blog) }}>Update</button>
                    <button className="btn btn-danger mx-3" onClick={() => { deleteBlog(blog._id) && giveAlert('success',"Successfully deleted.") }}>Delete</button>
                </div>
            </div> */}
            <div class="blog-card">
                <div class="meta">
                    <div class="photo" style={{ "background-image": `url(${blog.imageUrl})` }}></div>
                    {/* <ul class="details">
                                <li class="date">{date.toDateString()}</li>
                                <li class="date"> Tags: {item.tags}</li>
                            </ul> */}
                </div>
                <div class="description">
                    <h1>{blog.title} </h1>
                    <h2>{blog.author}, <em> Department of {blog.department}</em></h2>
                    <p>Tags: {blog.tags}</p>
                    <p> <LongText content={blog.description} limit={200} /></p>
                    <p>{date.toDateString()}</p>
                    <p class="read-more">
                        <button className="btn btn-info" onClick={() => { OpenModal(blog) }}>Update</button>
                        <button className="btn btn-danger mx-3" onClick={() => { deleteBlog(blog._id) && giveAlert('success', "Successfully deleted.") }}>Delete</button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default BlogItem