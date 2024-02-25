import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Students from './pages/Students/Students';
import Analytic from './pages/Analytics/Analytic';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Office from './pages/Office/Office';
import DeveloperInfo from './components/Footer/DeveloperInfo';
import { FloorProvider } from './Context/FloorContext';
import { RoomProvider } from './Context/RoomContext';
import { StudentProvider } from './Context/StudentContext';
import Profile from './pages/Profile';
import StudentForm from './pages/StudentForm/StudentForm';
import PaymentForm from "./pages/PaymentForm";
import InfoEdit from "./pages/InfoEdit";
import Welcome from "./pages/Welcome";
import {MessProvider} from "./Context/MessContext";
import React from "react";
import Documentation from './components/Documentation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FloorProvider>
          <RoomProvider>
            <StudentProvider>
              <MessProvider>
                <Navbar/>
                <Routes>
                  <Route Component={Home} path='/'/>
                  <Route Component={Welcome} path='/welcome/' />
                  <Route Component={Students} path='/students'/>
                  <Route Component={Office} path='/office/'/>
                  <Route Component={PaymentForm} path='/make_payment/'/>
                  <Route Component={Profile} path='/profile/'/>
                  <Route Component={Login} path='/login'/>
                  <Route Component={SignUp} path='/signup'/>
                  <Route Component={StudentForm} path='/student_form/' />
                  <Route Component={InfoEdit} path='/edit/'/>
                  <Route Component={Documentation} path='/documentation/'/>
                </Routes>
                <DeveloperInfo/>
              </MessProvider>
            </StudentProvider>
          </RoomProvider>
        </FloorProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
