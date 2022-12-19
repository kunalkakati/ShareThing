
import './Components/CSS/App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Navbar from './Components/Navbar';
import BlogState from './Context/blogs/BlogState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Register from './Components/Register';
import { useContext } from 'react';
import AlertContex from './Context/blogs/AlertContext';
import AddBlogForm from './Components/AddBlogForm';
import Blogs from './Components/Blogs';
import AdminDashboard from './Components/Admin/Dashboard';
import BlogsAdmin from './Components/Admin/BlogsAdmin';
import ErrorPage from './Components/ErrorPage';
import AdminLogin from './Components/Admin/Login';
import AdminRegistration from './Components/Admin/Registration';
import Profile from './Components/Profile';
import UserState from './Context/user/UserState';
import DeleteAccount from './Components/DeleteAccount';


function App() {
  const alert_state = useContext(AlertContex);
  const { alert } = alert_state;

  return (
    <div className='app'>
      <BlogState>
        <UserState>
          <Navbar />
          <Alert alrt={alert} />
          <div className="container">
            <Routes>
              <Route path='*' element={<ErrorPage type='404' typeString='Page not found' msg='path does not exist' path='/' />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/share-thing/intro" element={<Introduction />} /> */}
              <Route path="/compose" element={<AddBlogForm />} />
              <Route path="/myblogs" element={<Blogs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/delete20%account" element={<DeleteAccount />} />
              <Route path="/admin/dashboard/new_registration" element={<Register />} />
              <Route path="/admin/dashboard/blogs" element={<BlogsAdmin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/new_admin_registration" element={<AdminRegistration />} />
            </Routes>
          </div>
        </UserState>
      </BlogState>
    </div>
  );
}

export default App;
