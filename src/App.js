import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
// import './Design.css'
// import './Admin components/constantcolors.css'
import Login from './verification/Login';
import Adminregister from './verification/Adminregister';
import Userregister from './verification/Userregister';
import Forgotpassword from './verification/Forgotpassword';
import Changepassword from './verification/Changepassword';
import Admin from './Admin components/Admin';
import Add_dishes from './Admin components/Add_dishes';
// import './Modals/Allmodal'

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Welcome/>}>
      <Route path="/" element={<Login/>}/>
      <Route path="/forgotpassword" element={<Forgotpassword/>}/>
      <Route path="/changepassword" element={<Changepassword/>}/>
      <Route path="/admin_register" element={<Adminregister/>}/>
      <Route path="/user_register" element={<Userregister/>}/>

    </Route>
    <Route path='/admin_dashboard' element={<Admin/>}/>
    <Route path='/admin_add_dishes' element={<Add_dishes/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
