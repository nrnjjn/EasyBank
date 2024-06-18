import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './Navbar';
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import Usernav from './User/Usernav';
import Userhome from './User/Userhome';
import Adminnav from './Admin/Adminnav';
import Adminhome from './Admin/Adminhome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Navbar/>}>
        <Route index element={<Landing/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>



      <Route path='/usernav' element={<Usernav/>}>
        <Route index element={<Userhome/>}/>
        
      </Route>


      <Route path='/adminnav' element={<Adminnav/>}>
        <Route index element={<Adminhome/>}/>
      </Route>
      

    </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
