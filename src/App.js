import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./app.css"
import Posts from './componant/posts';
import UpdatePost from './componant/updatePost';



const App = () => {


  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/updatePost/:id' element={<UpdatePost />} />

        </Routes>
      </BrowserRouter>


    </Fragment>
  );
};

export default App;
