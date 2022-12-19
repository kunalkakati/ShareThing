import React from 'react'
import Team from './Team'
import "./CSS/About.css";


function About() {
  
  return (
    <div>
    <div className='about_container'>
      <h1>ShareThing</h1>
      <p>Our main purpose is to provide a hasslefree accessing of the posted blogs, entries, topics etc. It also used for posting the blogs, editing the blogs, deleting the posted blogs etc. It is also used for viewing and posting the others ones blogs/posts. Every organization, whether big or small, has challenges to overcome and managing the information of Idea, Blogs, Entries, Content, Views. Every Online Blogging System has different Blogs needs therefore we design exclusive employee manageme nt systems that are adapted to your managerial requirements. This is designed to assist in strategic planning, and will help you ensure that your organization is equipped with will allow you to manage your workforce anytime, at all times. These systems wil ultimately allow you to better manage resources. l </p>
    </div>
      <Team />
      <div className='footer'>
        <div className='footer-container'>
        <h4>ShareThing</h4>
        <p>Sharething.io</p>
        </div>
      </div>
    </div>
  )
}

export default About