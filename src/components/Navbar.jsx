import React from 'react'
import { NewsBoard } from './NewsBoard'
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


export const Navbar = () => {
  const[category,setcategory]=useState("General");
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "", 
    name: "",
    feedback:""
  });

  const Navigate=useNavigate();
  const location = useLocation();
  const { loguser } = location.state || {}; 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/getuser?email=${encodeURIComponent(loguser.email)}`);
        setuser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []); 


  const HandleFeedback = (e) => {
    setuser({ ...user, feedback: e.target.value });
  };

  const HandleLogout = () =>{
    const confirm =window.confirm("Are you sure you want to logout?");
    if(!confirm) return;
    Navigate("/login");
  }


  const HandleView = async() =>{
    try{
      
      // const response = await axios.get(`http://localhost:2000/getuser?email=${encodeURIComponent(loguser.email)}`);
      // setuser(response.data);
      console.log(user);
      alert("Name : "+user.name+'\n'+"Username : "+user.username+'\n'+"Email : "+user.email);
      
    }catch (error) {
      console.error("Error deleting account:", error);
      alert("There was a problem deleting your account.");
    }
  };
  const HandleUpdate = async() =>{
    try{
      
      // const response = await axios.get(`http://localhost:2000/getuser?email=${encodeURIComponent(loguser.email)}`);
      // setuser(response.data);
      // console.log(user);
      const response = await axios.put(`http://localhost:2000/updateuser/${user.id}/${user.feedback}`)
      alert("Submitted");
      // alert("Name : "+user.name+'\n'+"Username : "+user.username+'\n'+"Email : "+user.email);
      
    }catch (error) {
      console.error("Error deleting account:", error);
      alert("There was a problem deleting your account.");
    }
  };


  const HandleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return; 
    
    try {
      const response = await axios.delete('http://localhost:2000/deleteuser', {
        data: { email: loguser.email } 
      });
    console.log(response)
      alert("Your account has been deleted. You are logged out.");
  
      Navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("There was a problem deleting your account.");
    }
  };


  return (
    <div>
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><span class="badge bg-light text-dark fs-4">Welcome {user.name}</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav" style={{cursor:"pointer"}}>
                    
                    <li className="nav-item">
                    <div className="nav-link" onClick={()=>setcategory("Technology")}>Technology</div>
                    </li>
                    <li className="nav-item">
                    <div className="nav-link" onClick={()=>setcategory("Sports")}>Sports</div>
                    </li>
                    <li className="nav-item">
                    <div className="nav-link" onClick={()=>setcategory("Health")}>Health</div>
                    </li>
                    <li className="nav-item">
                    <div className="nav-link" onClick={()=>setcategory("Science")}>Science</div>
                    </li>
                    <li className="nav-item">
                    <div className="nav-link" onClick={()=>setcategory("Entertainment")}>Entertainment</div>
                    </li>
                    <li className="nav-item">
                    <div className="nav-link" onClick={()=>setcategory("business")}>Business</div>
                    </li>
                    
                    
                </ul>
                </div>
            </div>
            <div class="dropdown">
          {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}

          {/* </button> */}
          <div class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <AccountCircleOutlinedIcon style={{ fontSize: 40,color:'white' }}  />

          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button class="dropdown-item" type="button" onClick={HandleView}>View Account</button>
            <button class="dropdown-item" type="button" onClick={HandleDelete}>Delete Account</button>
            <button class="dropdown-item" type="button" onClick={HandleLogout}>Logout</button>
          </div>
        </div>
        </nav>
        <NewsBoard category={category}/>
        <div className='feedback'>
          <h1>Drop us a Feedback</h1>
          <textarea name="feedback" id="feedback" placeholder='Drop your Feedback here..'  onChange={HandleFeedback} cols="40" rows="5"></textarea>
          <button className="feed btn btn-secondary" onClick={HandleUpdate}>Submit</button>
        </div>
</div>
  )
}
