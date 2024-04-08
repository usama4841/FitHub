import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/user/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import Bmicalculator from './components/user/Bmicalculator';
import Usersettings from './components/user/Usersettings';
import Profile from './components/user/Profile';
import Yourpack from './components/user/Yourpack';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminSettings from './components/admin/AdminSettings';
import TotalUsers from './components/admin/TotalUsers';
import TotalGyms from './components/admin/TotalGyms';
import BwUser from './components/admin/BwUser';
import BwGym from './components/admin/BwGym';
import BwPackage from './components/admin/BwPackage';
import AdminAbout from './components/admin/AdminAbout';
import AdminContact from './components/admin/AdminContact';
import GymSignup from './components/gym/GymSignup';
import GymLogin from './components/gym/GymLogin';
import GymDashboard from './components/gym/GymDashboard';
import TotalMembers from './components/gym/TotalMembers';
import AddTrainer from './components/gym/AddTrainer';
import TotalTrainers from './components/gym/TotalTrainers';
import AddPackage from './components/gym/AddPackage';
import TotalPackages from './components/gym/TotalPackages';
import GymAbout from './components/gym/GymAbout';
import GymContact from './components/gym/GymContact';
import GymSettings from './components/gym/GymSettings';
import GymProfile from './components/gym/GymProfile';
import Workouts from './components/user/Workouts';
import Dietplans from './components/user/Dietplans';
import Userabout from './components/user/Userabout';
import Usercontact from './components/user/Usercontact';

function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route exact path='*' element = {<Home/>}/>
        <Route exact path='/about' element = {<About/>}/>
        <Route exact path='/contact' element = {<Contact/>}/>
        <Route exact path='/user/signup' element = {<Signup/>}/>
        <Route exact path='/user/login' element = {<Login/>}/>
        <Route exact path='/user/dashboard' element = {<Dashboard/>}/>
        <Route exact path='/user/exercises' element = {<Workouts/>}/>
        <Route exact path='/user/dietplans' element = {<Dietplans/>}/>
        <Route exact path='/user/Bmicalculator' element = {<Bmicalculator/>}/>
        <Route exact path='/user/usersettings' element = {<Usersettings/>}/>
        <Route exact path='/user/profile' element = {<Profile/>}/>
        <Route exact path='/user/Yourpack' element = {<Yourpack/>}/>
        <Route exact path='/user/userabout' element = {<Userabout/>}/>
        <Route exact path='/user/usercontact' element = {<Usercontact/>}/>
        <Route exact path='/admin/login' element = {<AdminLogin/>}/>
        <Route exact path='/admin/dashboard' element = {<AdminDashboard/>}/>
        <Route exact path='/admin/adminsettings' element = {<AdminSettings/>}/>
        <Route exact path='/admin/totalusers' element = {<TotalUsers/>}/>
        <Route exact path='/admin/totalgyms' element = {<TotalGyms/>}/>
        <Route exact path='/admin/bwusers' element = {<BwUser/>}/>
        <Route exact path='/admin/bwgyms' element = {<BwGym/>}/>
        <Route exact path='/admin/bwpackages' element = {<BwPackage/>}/>
        <Route exact path='/admin/about' element = {<AdminAbout/>}/>
        <Route exact path='/admin/contact' element = {<AdminContact/>}/>
        <Route exact path='/gym/gymsignup' element = {<GymSignup/>}/>
        <Route exact path='/gym/gymlogin' element = {<GymLogin/>}/>
        <Route exact path='/gym/gymsettings' element = {<GymSettings/>}/>
        <Route exact path='/gym/GymProfile' element = {<GymProfile/>}/>
        <Route exact path='/gym/gymdashboard' element = {<GymDashboard/>}/>
        <Route exact path='/gym/totalmembers' element = {<TotalMembers/>}/>
        <Route exact path='/gym/addtrainer' element = {<AddTrainer/>}/>
        <Route exact path='/gym/totaltrainers' element = {<TotalTrainers/>}/>
        <Route exact path='/gym/addpackage' element = {<AddPackage/>}/>
        <Route exact path='/gym/totalpackages' element = {<TotalPackages/>}/>
        <Route exact path='/gym/gymabout' element = {<GymAbout/>}/>
        <Route exact path='/gym/gymcontact' element = {<GymContact/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
