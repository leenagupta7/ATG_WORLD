import React, { useState, useEffect } from 'react';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Elements from './Component/Elements';
import Article from './Component/Article';
import Event from './Component/Event';
import Job from './Component/Job';
import Education from './Component/Education';
import User from './Component/User';
import axios from 'axios';
const App = () => {
  const [array, setArray] = useState([]);
  const token = localStorage.getItem('usertoken');
  const Baseurl = import.meta.env.VITE_API_BASE_URL;
  const fetchData = async () => {
    try {
      const response = await axios.get(`${Baseurl}/getBlog`,
      )
     
      setArray(response.data);
    } catch (err) {
      console.log('err', err);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  const renderComponent = (item) => {
    switch (item.category) {
      case 'Article':
        return <Article item={item} handlelike={handlelike} handleunlike={handleunlike} handleDelete={handleDelete} handleUpdate={handleUpdate}/>;
      case 'education':
        return <Education item={item} handlelike={handlelike} handleunlike={handleunlike} handleDelete={handleDelete} handleUpdate={handleUpdate}/>;
      case 'event':
        return <Event item={item} handlelike={handlelike} handleunlike={handleunlike} handleDelete={handleDelete} handleUpdate={handleUpdate}/>;
      case 'job':
        return <Job item={item} handlelike={handlelike} handleunlike={handleunlike} handleDelete={handleDelete} handleUpdate={handleUpdate}/>;
      default:
        return null;
    }
  };
  const handlelike = async (_id) => {
    try {
      const response = await axios.put(`${Baseurl}/likeblog`, {
        _id: _id,
      },{
        headers:{
          'usertoken':token
        }
      });
      fetchData();
      console.log({ liked: response.data });
    } catch (err) {
      console.log("err in handlelike frontend side", err);
    }
  };
  const handleunlike = async (_id) => {
    try {
      const response = await axios.put(`${Baseurl}/unlikeblog`, {
        _id: _id,
      },{
        headers:{
          'usertoken':token
        }
      });
      fetchData();
      console.log({ liked: response.data });
    } catch (err) {
      console.log("err in handlelike frontend side", err);
    }
  };
  const handleDelete = async (_id) => {
   
        try {
          await axios.delete(`${Baseurl}/delete/${_id}`);
          fetchData(); 
        } catch (err) {
          console.error("Error deleting blog post:", err);
        }
  };
  const handleUpdate = async (category,title,description,file,_id,setShowPopup) => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    try {
      const response = await axios.put(`${Baseurl}/updateBlog/${_id}`, 
        formData,
      );
      setShowPopup(false);
      alert('Blog updated successfully');
      fetchData();
      console.log('Updated Blog:', response.data);
    } catch (err) {
      console.error('Error updating blog:', err);
    }
  };

  return (
    <div>
      <div className="hidden md:flex flex-col"> <Navbar /></div>
      <Home />
      <div className="px-8 py-12 xl:px-32 flex flex-col space-y-4">
        <Elements />
        <hr />
        <div className="flex space-x-8 lg:space-x-20">
          <div className="flex flex-col flex-4 space-y-4"> {/* Adjusted flex classes */}
            {array.length > 0 ? (
              array.map((item, index) => (
                <div key={index}>
                  {renderComponent(item)}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="hidden md:flex flex-1"> {/* Adjusted flex class */}
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
