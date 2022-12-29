import React, { useContext } from 'react';
import AlertContex from '../Context/blogs/AlertContext';
import blogContext from '../Context/blogs/BlogContext';



function BlogItem({ blog, OpenModal }) {
    const blogState = useContext(blogContext);
    const alertState = useContext(AlertContex);
    const {giveAlert} = alertState;
    // eslint-disable-next-line
    const { deleteBlog } = blogState;
    const date = new Date(blog.date);
    return (
        <>
            <div className="card my-3">
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
            </div>
            </>
    )
}

export default BlogItem