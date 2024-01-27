import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/dashboard';
import { RecoilRoot } from 'recoil';

function App() {

  return (
   <Router>
   <Routes>
  <Route exact path='/signup' element = {<RecoilRoot><Signup/></RecoilRoot>}/>
  <Route exact path='/signin' element = {<RecoilRoot><Signin/></RecoilRoot>}/>
  <Route exact path='/dashboard' element = {<RecoilRoot><Dashboard/></RecoilRoot>}/>
   </Routes>
   </Router>
  )
}

export default App
