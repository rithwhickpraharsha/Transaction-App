import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/dashboard';
import { RecoilRoot } from 'recoil';
import Payment from './components/Payment';
import { Suspense, useEffect,useState } from 'react';
import axios from 'axios';
import Update from './components/Update';
function App() {

  return (
   <Router>
   <Routes>
  <Route exact path='/signup' element = {<RecoilRoot><Signup/></RecoilRoot>}/>
  <Route exact path='/' element = {<RecoilRoot><Signin/></RecoilRoot>}/>
  <Route exact path='/dashboard' element = {<RecoilRoot><Dashboard/></RecoilRoot>}/>
  <Route exact path ='/payment' element= {<RecoilRoot><Payment/></RecoilRoot> } />
  <Route exact path ='/update' element= {<RecoilRoot><Update/></RecoilRoot> } />
   </Routes>
   </Router>
  )

  
 
}

export default App
