import { useState } from "react";
import BlogContext from "./BlogContext";

const Blogstate = (props) => {
  // const host = "http://localhost:5000";

  const [Blogs, setBlogs] = useState([{
    "title": '',
    "description": '',
    "tags": '',  
    "imageUrl": ''
  }]);

  

  //! get all Blogs
  const getBlogs = async () => {
    //Fatch APi
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/blog/fatch_all_blogs`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': window.localStorage.getItem('Token')
      },

    })
    const data = await response.json();
    setBlogs(data);
  }

  const getAllBlogs = async ()=>{
    const responce = await fetch(`${process.env.REACT_APP_HOST}/api/blog/all_blog`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await responce.json();
    setBlogs(data);
  }

  //!ADD new blog
  const addBlog = async(nwBlog) => {
    const { title, description, tags,file } = nwBlog;
    const data = new FormData();
    data.append('title',title);
    data.append('description',description);
    data.append('tags',tags);
    data.append('file',file);
    const responce = await fetch(`${process.env.REACT_APP_HOST}/api/blog/add_blogs`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data;',
        'auth-token': window.localStorage.getItem('Token')
      },
      body: data
      // body: JSON.stringify({ title, description, tags }),file
    })
    let json = await responce.json();
    // console.log(json.error);
    // if(json.error !== undefined){
    //   return false;
    // }
    setBlogs(Blogs.concat(json));
    return true;
  }
 
  //!update a blog
  const updateBlog = async(id,title,description,tags) => {
    
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/blog/update_blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': window.localStorage.getItem('Token'),
      },
      body: JSON.stringify({title,description,tags}),
    })

    const json = await response.json();
    console.log(json);

    let n_Blogs = JSON.parse(JSON.stringify(Blogs));
    for (let i = 0; i < n_Blogs.length; i++) {
      let element = n_Blogs[i];
      if (element._id === id) {
        n_Blogs[i].title = title;
        n_Blogs[i].description = description;
        n_Blogs[i].tags = tags;
        break;
      }
    }
    setBlogs(n_Blogs);
    return true;
    // getBlogs();
  }

  //! delete a blog
  const deleteBlog = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/blog/delete_blog/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': window.localStorage.getItem('Token')
      },
    })
    const data = await response.json();
    // setBlogs(data);
    console.log(data);
    const nwnote = Blogs.filter((note) => { return note._id !== id });
    setBlogs(nwnote);
    return true
  }

  const AdminDelete = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/blog/delete/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    // setBlogs(data);
    console.log(data);
    const nwnote = Blogs.filter((note) => { return note._id !== id });
    setBlogs(nwnote);
  }

  return (
    <BlogContext.Provider value={{ Blogs, getBlogs,getAllBlogs, addBlog, updateBlog, deleteBlog, AdminDelete }} >
      {props.children}
    </BlogContext.Provider>
  )
}

export default Blogstate;