import React, { useState } from 'react';
import rectangle from '../Images/Rectangle.png';
import Group3 from '../Images/Group3.png';
import CloseIcon from '@mui/icons-material/Close';
import facebook from '../Images/facebook.webp';
import google from '../Images/google.png';
import axios from 'axios';
const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false); // State to track if in sign-in mode
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccountClick = () => {
    setShowPopup(true);
    setIsSignIn(false); // Ensure create account mode
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const Baseurl = import.meta.env.VITE_API_BASE_URL;
  const handleSignUp = async() => {

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please check and try again.');
      return;
    }
    try{
      const formdata = new FormData();
      formdata.append('name',`${firstName} ${lastName}`);
      formdata.append('email',email);
      formdata.append('password',password);
      console.log('formdata',formdata);
      const data = await axios.post(`${Baseurl}/signup`,formdata);
      console.log(data);
    }catch(err){
      console.log('err in signup frontend',err);
    }
    setShowPopup(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSignIn = () => {
    // Retrieve user details from localStorage
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    // Validation: Ensure email and password match stored user details
    if (storedUserDetails && storedUserDetails.email === email && storedUserDetails.password === password) {
      alert('Sign in successful');
      handleClosePopup();
    } else {
      alert('Invalid email or password. Please try again.');
    }

    // Reset form fields
    setEmail('');
    setPassword('');
  };
  const userDetails = localStorage.getItem('userDetails'); 
  return (
    <div className="relative">
      <img className="w-full" src={rectangle} alt="Background" />
      <div className="absolute inset-0 bg-black opacity-55"></div>
      <div className="absolute bottom-1 md:bottom-8 left-4 md:left-16 right-0 p-4 flex flex-col items-start space-y-1">
        <span className="font-bold text-white md:text-2xl lg:text-5xl">Computer Engineering</span>
        <span className="text-white md:text-xl lg:text-2xl">142,765 Computer Engineers follow this</span>
      </div>
      {userDetails===null?(<div className="absolute top-4 right-16 p-4 flex flex-col items-start space-y-1 md:hidden">
        <span className="cursor-pointer border p-2 rounded font-bold text-white md:text-2xl lg:text-5xl" onClick={handleCreateAccountClick}>Join Group</span>
      </div>):(<div className="absolute top-4 right-16 p-4 flex flex-col items-start space-y-1 md:hidden">
        <span className="cursor-pointer border p-2 rounded font-bold text-white md:text-2xl lg:text-5xl" onClick={()=>localStorage.removeItem('userDetails')}>Leave Group</span>
      </div>)}
      {showPopup && (
        <div className="p-12 z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-3xl">
            <div className="absolute top-2 right-2 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleClosePopup}>
              <CloseIcon />
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-bold text-lg">{isSignIn ? 'Sign In' : 'Create Account'}</span>
              <span>
                {isSignIn ? 'Don\'t have an account? ' : 'Already have an account? '}
                <span className="text-blue-500 cursor-pointer" onClick={() => setIsSignIn(!isSignIn)}>
                  {isSignIn ? 'Create one' : 'Sign in'}
                </span>
              </span>
            </div>
            <div className="flex item-center justify-center">
              {!isSignIn && (
                <div className="flex flex-col w-64 space-y-2">
                  <div className="md:flex space-y-2 md:space-y-0 md:space-x-2">
                    <input
                      className="border p-2 bg-gray-100 w-64"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      className="border p-2 bg-gray-100 w-64 z-50"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <input
                    className="border p-2 bg-gray-100 w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="border p-2 bg-gray-100 w-full"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="border p-2 bg-gray-100 w-full"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button className="mt-4 bg-blue-600 p-2 text-white rounded-full" onClick={handleSignUp}>Create Account</button>
                  <div className="mt-2 p-1 border bg-gray-100 rounded-full flex space-x-4 justify-center items-center cursor-pointer">
                    <img className="h-6 w-6" src={facebook} alt="Facebook" />
                    <span>Sign up with Facebook</span>
                  </div>
                  <div className="mt-2 p-1 border bg-gray-100 rounded-full flex space-x-4 justify-center items-center cursor-pointer">
                    <img className="h-6 w-6" src={google} alt="Google" />
                    <span>Sign up with Google</span>
                  </div>
                </div>
              )}
              {isSignIn && (
                <div className="flex flex-col w-64 space-y-2">
                  <input
                    className="border p-2 bg-gray-100 w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="border p-2 bg-gray-100 w-full"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="mt-4 bg-blue-600 p-2 text-white rounded-full" onClick={handleSignIn}>Sign In</button>
                  <div className="mt-2 p-1 border bg-gray-100 rounded-full flex space-x-4 justify-center items-center cursor-pointer">
                    <img className="h-6 w-6" src={facebook} alt="Facebook" />
                    <span>Sign in with Facebook</span>
                  </div>
                  <div className="mt-2 p-1 border bg-gray-100 rounded-full flex space-x-4 justify-center items-center cursor-pointer">
                    <img className="h-6 w-6" src={google} alt="Google" />
                    <span>Sign in with Google</span>
                  </div>
                </div>
              )}
              <div className="z-5 hidden md:flex items-center justify-center">
                <img src={Group3} alt="Graphic" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
