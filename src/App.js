//import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './login/Login';
import Entry from './entry/Entry';
import Layout from './layout/Layout';
import Receptionist from './receptionist/Receptionist';
import Physician from './physician/Physician';
import StoreKeeper from './storeKeeper/StoreKeeper';
import Administrator from './administrator/Administrator';
import AddPatient from './addPatient/AddPatient';
import AddStaff from './addStaff/AddStaff';
import AddStock from './addStock/AddStock';
import AddSupplier from './addSupplier/AddSupplier';
import PatientRecord from './patientRecord/PatientRecord';
import BookAppointment from './bookAppointment/BookAppointment';
import FindStaff from './findStaff/FindStaff';
import FindSupplier from './findSupplier/FindSupplier';
import CreateStock from './createStock/CreateStock';
import SetSupplier from './setSupplier/SetSupplier';
import ReqItems from './reqItems/ReqItems';
import StaffRecord from './staffRecord/StaffRecord';
import SupplierRecord from './supplierRecord/SupplierRecord';
import LandingPage from './landingPage/LandingPage';
import Reload from './reload/Reload';
import ReportForm from './reportForm/ReportForm';
import ViewMedicalRecord from './viewMedicalRecord/ViewMedicalRecord';
import { useMemo, useState } from 'react';
import { UserContext } from './userContext';


function App() {
  const [appState, setAppState] = useState({ loggedIn: false, username: '' })


  const userContextValue = useMemo(() => ({ appState, setAppState }), [appState])

  return (
    <BrowserRouter>
      <UserContext.Provider value={userContextValue}>

        <Routes>

          <Route path='/' element={<Layout />} >

            <Route index element={<LandingPage />} />
            <Route path='login' element={<Login />} />
            <Route path='landing' element={<LandingPage />} />
            <Route path='reload' element={<Entry />} />
            <Route path='home' element={<Reload />} />
            <Route path='storeKeeper' element={<StoreKeeper />} />
            <Route path='administrator' element={<Administrator />} />
            <Route path='physician' element={<Physician />} />
            <Route path='receptionist' element={<Receptionist />} />
            <Route path='patientRecord' element={<PatientRecord />} />
            <Route path='bookAppointment' element={<BookAppointment />} />
            <Route path='addPatient' element={<AddPatient />} />
            <Route path='addStaff' element={<AddStaff />} />
            <Route path='addSupplier' element={<AddSupplier />} />
            <Route path='addStock' element={<AddStock />} />
            <Route path='findStaff' element={<FindStaff />} />
            <Route path='findSupplier' element={<FindSupplier />} />
            <Route path='createStock' element={<CreateStock />} />
            <Route path='setSupplier' element={<SetSupplier />} />
            <Route path='reportform' element={<ReportForm />} />
            <Route path='reqItems' element={<ReqItems reqItems />} />
            <Route path='staffRecord' element={<StaffRecord record />} />
            <Route path='supplierRecord' element={<SupplierRecord record />} />
            <Route path='viewmedicalrecord' element={<ViewMedicalRecord record />} />

          </Route>

        </Routes>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;