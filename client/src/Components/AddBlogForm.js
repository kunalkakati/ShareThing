import React, { useContext, useState } from 'react'
import BlogContext from '../Context/blogs/BlogContext';
import AlertContex from '../Context/blogs/AlertContext';
import "./CSS/Add_blog_form.css";
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';


function AddBlogForm() {
    const blogState = useContext(BlogContext);
    const { addBlog } = blogState;
    const [blog, setBlog] = useState({ title: '', description: '', tags: '', file:'' });
    const alertState = useContext(AlertContex);
    const {giveAlert} = alertState;
    // eslint-disable-next-line

    const onChange = (e) => {
        if(e.target.name === 'file'){
            setBlog({...blog, [e.target.name]: e.target.files[0]})
        }else{
            setBlog({ ...blog, [e.target.name]: e.target.value });
        }
    }

    const SubmitFrom = (e) => {
        e.preventDefault();
        // console.log(blog);
        addBlog(blog) && giveAlert('success', "Successfully updoaded.");
        setBlog({ title: '', description: '', tags: '' });
    }

    return (
        <>
            <form onSubmit={SubmitFrom} encType="multipart/form-data">
                <div className='add-blog'>
                    <h1>Write your blog</h1>
                    <div className="mb-3">
                        <label htmlFor="title" className="lable form-label fs-2">Title</label>
                        <input type="text" className="inp form-control" id="title" name='title' value={blog.title} placeholder='Your blog title.' onChange={onChange} autoComplete="on" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="lable form-label fs-2">Description</label>
                        <textarea className="inp form-control" id="description" name='description' value={blog.description} rows="3" onChange={onChange} placeholder='Description must contain at least 30 characters'></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="file" className="lable form-label fs-2">Image</label>
                        <input type="file" className="inp form-control" id="file" name='file' onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tags" className="lable form-label fs-2">Tags</label>
                        <input type="text" className="inp form-control" id="tags" name='tags' value={blog.tags} placeholder='example fun, knowlage..' onChange={onChange} autoComplete="on" />
                    </div>
                    <div className="from-button">
                        <Button type="submit" startIcon={<FileUploadIcon />} variant="contained" color='success' disabled={blog.description.length < 30 ? true : false}>Submit</Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddBlogForm;