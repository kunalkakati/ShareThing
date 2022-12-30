import { Button, createTheme, ThemeProvider } from '@mui/material';
import React, { useContext } from 'react';
import AlertContex from '../Context/blogs/AlertContext';
import blogContext from '../Context/blogs/BlogContext';
import LongText from './LongText';
import ClearIcon from '@mui/icons-material/Clear';
import UpgradeIcon from '@mui/icons-material/Upgrade';


const theme = createTheme({
    palette: {
        primary: {
          main: '#35D0BA',
        //   main: '#0dcaf0',
        },
        secondary: {
          main: '#EB455F',
        },
      },
})



function BlogItem({ blog, OpenModal }) {
    const blogState = useContext(blogContext);
    const alertState = useContext(AlertContex);
    const { giveAlert } = alertState;
    // eslint-disable-next-line
    const { deleteBlog } = blogState;
    const date = new Date(blog.date);
    return (
        <>
            <div class="blog-card">
                <div class="meta">
                    <div class="photo" style={{ "background-image": `url(${blog.imageUrl})` }}></div>
                </div>
                <div class="description">
                    <h1>{blog.title} </h1>
                    <h2>{blog.author}, <em> department of {blog.department}</em></h2>
                    <p>Tags: {blog.tags}</p>
                    <p> <LongText content={blog.description} limit={200} /></p>
                    <p>{date.toDateString()}</p>
                    <ThemeProvider theme={theme}>
                    <p class="read-more">
                        <Button color='primary' variant="contained" startIcon={<UpgradeIcon />} onClick={() => { OpenModal(blog) }}>Update</Button>
                        <Button className='mx-3' color='secondary' variant="contained" startIcon={<ClearIcon />} onClick={() => { deleteBlog(blog._id) && giveAlert('success', "Successfully deleted.") }}>Delete</Button>
                    </p>
                    </ThemeProvider>
                </div>
            </div>
        </>
    )
}

export default BlogItem