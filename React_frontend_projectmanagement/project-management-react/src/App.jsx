import './App.css'
import Home from '@/pages/Home/Home'
import Navbar from '@/pages/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Subscription from './pages/Subscription/Subscription';
import UpgradeSuccess  from './pages/Subscription/UpgradeSuccess';
import IssueDetails from './pages/IssueDetails/IssueDetails';
import Auth from './pages/Auth/Auth'
import { useDispatch,useSelector } from 'react-redux'
import {getUser} from './Redux/Auth/Action'
import {useEffect} from "react"
import {fetchProjects} from '@/Redux/Project/Action'
import AcceptInvitation from './pages/Project/AcceptInvitation';

function App() {
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store)
  useEffect(()=>{
    dispatch(getUser())
    dispatch(fetchProjects({}))
  },[auth.jwt])
  console.log(auth)
  return (
    <>
    
      {
        auth.user?
          <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/project/:id" element={<ProjectDetails/>}/>
            <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails/>}/>
            <Route path="/upgrade_plan" element={<Subscription/>}/>
            <Route path="/upgrade_plan/success" element={<UpgradeSuccess/>}/>
            <Route path="/accept_invitation" element={<AcceptInvitation/>}/>
          </Routes>
          </div> :
          <Auth/>
      }
    </>
  );
}


export default App
