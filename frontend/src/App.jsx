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
import Create_group from './components/Create_group';
import Display_group from './components/Display_group';
import Splitwise_manual from './components/Splitwise_manual';
import Request_pay from './components/Request_pay';
function App() {

  return (
   <Router>
   <Routes>
  <Route  path='/signup' element = {<RecoilRoot><Signup/></RecoilRoot>}/>
  <Route  path='/' element = {<RecoilRoot><Signin/></RecoilRoot>}/>
  <Route  path='/dashboard' element = {<RecoilRoot><Dashboard/></RecoilRoot>}/>
  <Route  path ='/payment' element= {<RecoilRoot><Payment/></RecoilRoot> } />
  <Route  path ='/update' element= {<RecoilRoot><Update/></RecoilRoot> } />
  <Route  path = '/group/create' element = {<RecoilRoot><Create_group /></RecoilRoot>} />
  <Route path='/group/show' element = {<RecoilRoot><Display_group /></RecoilRoot>} />
  <Route path= '/payManual' element ={<RecoilRoot><Splitwise_manual /></RecoilRoot>} />
  <Route path = '/Requestpay' element = {<RecoilRoot><Request_pay /></RecoilRoot>} />
   </Routes>
   </Router>
  )


 
}

export default App
