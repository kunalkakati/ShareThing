import React from 'react'
import Team from './Team'
import "./CSS/About.css";


function About() {

  return (
    <div>
      <div className="about">
        <img src="https://images.unsplash.com/photo-1616442751986-fe0df84ad730?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="..." />
        <div className='about_container'>
        <h1>ABOUT SHARETHING <br/> <p className='line'></p></h1>
        
          <p>Our main purpose is to provide a hasslefree accessing of the posted blogs, entries, topics etc. It also used for posting the blogs, editing the blogs, deleting the posted blogs etc. It is also used for viewing and posting the others ones blogs/posts. Every organization, whether big or small, has challenges to overcome and managing the information of Idea, Blogs, Entries, Content, Views. Every Online Blogging System has different Blogs needs therefore we design exclusive employee manageme nt systems that are adapted to your managerial requirements. This is designed to assist in strategic planning, and will help you ensure that your organization is equipped with will allow you to manage your workforce anytime, at all times. These systems wil ultimately allow you to better manage resources. </p>
        </div>
      </div>
      <Team />
      <div className='footer'>
        <div className='footer-container'>
          <h4>ShareThing</h4>
          <a href='https://sharething.netlify.app' target='_blank' rel="noreferrer" className='host_link'>Sharething.netlify.app</a>
        </div>
      </div>
    </div>
  )
}

export default About