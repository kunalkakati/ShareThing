import React, { useContext, useState } from 'react'
import BlogContext from '../Context/blogs/BlogContext';
import AlertContex from '../Context/blogs/AlertContext';
import "./CSS/Add_blog_form.css";

function AddBlogForm() {
    const blogState = useContext(BlogContext);
    const { addBlog } = blogState;
    const [blog, setBlog] = useState({ title: '', description: '', tags: '' });
    const alertState = useContext(AlertContex);
    const {giveAlert} = alertState;
    // eslint-disable-next-line

    const onChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    }

    const SubmitFrom = (e) => {
        e.preventDefault();
        addBlog(blog) && giveAlert('success', "Successfully updoaded.");
        setBlog({ title: '', description: '', tags: '' });
    }

    return (
        <>
            <form onSubmit={SubmitFrom}>
                <div className='add-blog'>
                    <h1>Enter your Blog</h1>
                    <div className="mb-3">
                        <label htmlFor="title" className="lable form-label fs-2">Title</label>
                        <input type="text" className="inp form-control" id="title" name='title' value={blog.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="lable form-label fs-2">Description</label>
                        <textarea className="inp form-control" id="description" name='description' value={blog.description} rows="3" onChange={onChange}></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tags" className="lable form-label fs-2">Tags</label>
                        <input type="text" className="inp form-control" id="tags" name='tags' value={blog.tags} onChange={onChange} />
                    </div>
                    <div className="from-button">
                        <button type="submit" disabled={blog.description.length < 3 ? true : false} className="btn btn-dark my-3">Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddBlogForm;