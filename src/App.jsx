import React from 'react';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Elements from './Component/Elements';
import Article from './Component/Article';
import Event from './Component/Event';
import Job from './Component/Job';
import Education from './Component/Education';
import User from './Component/User';

const App = () => {
  return (
    <div>
     <div className="hidden md:flex flex-col"> <Navbar /></div>
      <Home />
      <div className="px-8 py-12 xl:px-32 flex flex-col space-y-4">
        <Elements />
        <hr />
        <div className="flex space-x-8 lg:space-x-20">
          <div className="flex flex-col flex-4 space-y-4"> {/* Adjusted flex classes */}
            <Article />
            <Education />
            <Event />
            <Job />
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
