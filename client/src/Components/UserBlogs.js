import React, { useContext, useEffect, useRef, useState } from 'react';
import BlogItem from './UserBlog';
import BlogContext from '../Context/blogs/BlogContext';
import AlertContex from '../Context/blogs/AlertContext';
import { Button } from '@mui/material';

function UserBlogs() {
    const blogState = useContext(BlogContext);
    const alertState = useContext(AlertContex);
    // eslint-disable-next-line
    const { Blogs, getBlogs, updateBlog } = blogState;
    const { giveAlert } = alertState;
    useEffect(() => {
        // eslint-disable-next-line
        // console.log(window.localStorage.getItem('Token'));
        if (window.localStorage.getItem('Token')) {
            getBlogs();
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [blog, setBlog] = useState({ _id: '', e_title: '', e_description: '', e_tags: '' });

    const EditNote = () => {
        refClose.current.click();
        updateBlog(blog._id, blog.e_title, blog.e_description, blog.e_tags) && giveAlert('success', 'Successfully Updated.');
    }

    const onChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    }

    const OpenModal = (crrent_note) => {
        ref.current.click();
        setBlog({ _id: crrent_note._id, e_title: crrent_note.title, e_description: crrent_note.description, e_tags: crrent_note.tags });
    }

    return (
        <>
            <div className='row my-3'>
                {/* <h4 className="my3 ">Blogs: </h4> */}
                {/* Update modal */}
                <button type="button" ref={ref} style={{ display: 'none' }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update: </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="e_title" className="form-label fs-3">Title</label>
                                    <input type="text" value={blog.e_title} className="form-control" id="e_title" name='e_title' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_description" className="form-label fs-3">Desription</label>
                                    <textarea className="form-control" value={blog.e_description} id="e_description" name='e_description' rows="3" onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_tags" className="form-label fs-3">Tags</label>
                                    <input type="text" value={blog.e_tags} className="form-control" id="e_tags" name='e_tags' onChange={onChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button type="button" variant="outlined" color='error' ref={refClose} className="mx-3" data-bs-dismiss="modal">Close</Button>
                                <Button type="button" variant="contained" color='success' disabled={blog.e_description.length < 3 ? true : false} onClick={EditNote} className="">Save changes</Button>
                            </div>
                        </div>
                    </div>
                </div>
                {Blogs.slice(0).reverse().map((item, index) => {
                    return <BlogItem key={index} blog={item} OpenModal={OpenModal} />;
                })}
            </div>
        </>
    )
}

export default UserBlogs