import React, { useState } from 'react';
import whole from '../Images/whole.png';
import Group3 from '../Images/Group3.png';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import google from '../Images/google.png';
import facebook from '../Images/facebook.webp';
import axios from 'axios';

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleCreateAccountClick = () => {
    setShowPopup(true);
    setIsSignIn(false); // Ensure create account mode
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowResetPassword(false);
  };
  const Baseurl = import.meta.env.VITE_API_BASE_URL;
  const handleSignUp = async () => {
    // Validation: Ensure passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please check and try again.');
      return;
    }

    try {
      const response = await axios.post(`${Baseurl}/signup`, { name: `${firstName} ${lastName}`, email: email, password: password });

      localStorage.clear();
      console.log(response);
      localStorage.setItem('userDetail', response.data.data.user.id);
      localStorage.setItem('usertoken', response.data.token);
      alert('signup succesfully');
    } catch (error) {
      alert('error');
      console.error('Error:', error);
    }
    // Close popup and reset form fields
    setShowPopup(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };
  const handleForgetPassword = () => {
    setShowResetPassword(true);
  };
  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please check and try again.');
      return;
    }

    try {
      const token = localStorage.getItem('usertoken');
      await axios.put(`${Baseurl}/updatePassword`, { password }, {
        headers: {
          'usertoken': token
        }
      });
      alert('Password updated successfully');
      handleClosePopup();
    } catch (err) {
      alert('error');
      console.error('Error updating password:', err);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${Baseurl}/login`, { email: email, password: password });
      localStorage.clear();
      localStorage.setItem('userDetail', response.data.data.user.id);
      localStorage.setItem('usertoken', response.data.token);
      alert('signIN sucessfully')
    } catch (err) {
      alert('error');
      console.log('error', err);
    }
    setShowPopup(false);
  }
  return (
    <div className="relative">
      <div className="h-16 flex flex-col justify-center border">
        <div className="flex justify-around items-center">
          <div>
            <img src={whole} alt="Logo" />
          </div>
          <div className="flex bg-gray-100 p-2 rounded-full space-x-4">
            <SearchIcon style={{ color: 'gray', transform: 'rotate(90deg)' }} />
            <input className="bg-gray-100" placeholder="Search for your favorite groups in ATG" />
          </div>
          <div className="flex cursor-pointer" onClick={handleCreateAccountClick}>
            <span>Create account. <span className="text-blue-500">It's free</span></span>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="p-12 z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-3xl">
            <div className="absolute top-2 right-2 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleClosePopup}>
              <CloseIcon />
            </div>

            <div className="flex justify-between mb-4">
              <span className="font-bold text-lg">
                {showResetPassword ? 'Reset Password' : isSignIn ? 'Sign In' : 'Create Account'}</span>
              <span>
                {isSignIn ? 'Don\'t have an account? ' : 'Already have an account? '}
                <span className="text-blue-500 cursor-pointer" onClick={() => {
                  setIsSignIn(!isSignIn);
                  setShowResetPassword(false); 
                }}
                >
                  {isSignIn ? 'Create one' : 'Sign in'}
                </span>
              </span>
            </div>
            <div className="flex item-center justify-center">
              {showResetPassword ? (
                <div className="flex flex-col w-64 space-y-2">
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
                  <button onClick={handleUpdatePassword} className="mt-4 bg-blue-600 p-2 text-white rounded-full">Reset Password</button>
                  <div className="mt-2 p-1 border bg-gray-100 rounded-full flex space-x-4 justify-center items-center cursor-pointer">
                    <img className="h-6 w-6" src={facebook} alt="Facebook" />
                    <span onClick={() => { setShowResetPassword }}>Sign in with Facebook</span>
                  </div>
                  <div className="mt-2 p-1 border bg-gray-100 rounded-full flex space-x-4 justify-center items-center cursor-pointer">
                    <img className="h-6 w-6" src={google} alt="Google" />
                    <span>Sign in with Google</span>
                  </div>
                </div>
              ) : (<div>
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
                        className="border p-2 bg-gray-100 w-64"
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
                    <span onClick={handleForgetPassword} className="cursor-pointer text-red-500">Forget Password?</span>
                    <button onClick={handleSignIn} className="mt-4 bg-blue-600 p-2 text-white rounded-full">Sign In</button>
                    <div className="mt-2 p-1 border bg-gray-100 rounded-full flex space-x-4 justify-center items-center cursor-pointer">
                      <img className="h-6 w-6" src={facebook} alt="Facebook" />
                      <span onClick={() => { setShowResetPassword }}>Sign in with Facebook</span>
                    </div>
                    <div className="mt-2 p-1 border bg-gray-100 rounded-full flex space-x-4 justify-center items-center cursor-pointer">
                      <img className="h-6 w-6" src={google} alt="Google" />
                      <span>Sign in with Google</span>
                    </div>
                  </div>
                )}
              </div>)}

              <div className="hidden md:flex flex items-center justify-center mt-6">
                <img src={Group3} alt="Graphic" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
