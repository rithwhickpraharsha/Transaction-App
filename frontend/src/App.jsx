import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/dashboard';
import { RecoilRoot } from 'recoil';
import Payment from './components/Payment';
import { Suspense, useEffect,useState } from 'react';
import axios from 'axios';
import Update from './components/Update';
import Sidebar_Sample from './components/ui_components/Sidebar_Sample';
function App() {

  return (
   <Router>
   <Routes>
  <Route  path='/signup' element = {<RecoilRoot><Signup/></RecoilRoot>}/>
  <Route  path='/' element = {<RecoilRoot><Signin/></RecoilRoot>}/>
  <Route  path='/dashboard' element = {<RecoilRoot><Dashboard/></RecoilRoot>}/>
  <Route  path ='/payment' element= {<RecoilRoot><Payment/></RecoilRoot> } />
  <Route  path ='/update' element= {<RecoilRoot><Update/></RecoilRoot> } />
   </Routes>
   </Router>
  )


 
}

export default App
