import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import SignInForm from "./components/Login/SignInForm";
import DoctorBooking from "./components/Booking/DoctorBooking/DoctorBooking";
import BookingSuccess from "./components/Booking/BookingSuccess";

import DoctorProfile from "./components/Doctor/DoctorProfile/DoctorProfile";
import Appointments from "./components/Doctor/Appointments/Appointments";
import MyPatients from "./components/Doctor/MyPatients/MyPatients";

import Schedule from "./components/Doctor/Schedule/Schedule";
import ProfileSetting from "./components/Doctor/ProfileSetting/ProfileSetting";
import ChangePassword from "./components/Doctor/ChangePassword/ChangePassword";
import AdminDashboard from "./components/Admin/Dashboard/Dashboard";
import AdminAppointments from "./components/Admin/Appointments/Appointments";
import Doctors from "./components/Admin/Doctors/Doctors";
import Patients from "./components/Admin/Patients/Patients";
import Profile from "./components/Admin/Profile/Profile";

import Specialites from "./components/Admin/Specialites/Specialites";

import PatientFavouriteDoctor from "./components/Doctor/PatientFavourite/PatientFavourite";

import SearchDoctor from "./components/Doctor/SearchDoctor/SearchDoctor";
import Stations from "./components/Stations/Stations";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Service from "./components/Service/Service";
import AppointmentPage from "./components/Appointment/AppointmentPage";

import Treatment from "./components/Doctor/Treatment/Treatment";
import Prescription from "./components/Doctor/Prescription/Prescription";
import PrescriptionView from "./components/Doctor/Prescription/PrescriptionView";
import TreatmentEdit from "./components/Doctor/Treatment/TreatmentEdit";
import ViewAppointment from "./components/Doctor/Appointments/ViewAppointment";
import ForgotPassword from "./components/Login/ForgotPassword";
import Dashboard from "./components/Doctor/Dashboard/Dashboard";

import NotFound from "./components/UI/NotFound";
import PatientProfileSetting from "./components/Doctor/ProfileSetting/PatientProfileSetting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/stations" element={<Stations />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/my-patients" element={<MyPatients />} />
      
        <Route path="/dashboard/schedule" element={<Schedule />} />
        <Route path="/dashboard/appointments" element={<Appointments />} />
        <Route
          path="/dashboard/appointments/:id"
          element={<ViewAppointment />}
        />
        <Route path="/dashboard/prescription" element={<Prescription />} />
        <Route
          path="/dashboard/prescription/:id"
          element={<PrescriptionView />}
        />
        <Route
          path="/dashboard/appointment/treatment/:id"
          element={<Treatment />}
        />
        <Route
          path="/dashboard/appointment/treatment/edit/:id"
          element={<TreatmentEdit />}
        />
        <Route path="/dashboard/change-password" element={<ChangePassword />} />
        <Route path="/dashboard/profile-setting" element={<ProfileSetting />} />
        <Route
          path="/dashboard/favourite"
          element={<PatientFavouriteDoctor />}
        />
       
        <Route path="/login" element={<SignInForm />} />
        <Route path="/" element={<Home />} />
      
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route
          path="/reset-password/:userId/:uniqueString"
          element={<ForgotPassword />}
        />
        <Route path="/appointment" element={<AppointmentPage />} />
       
        <Route path="/doctors" element={<SearchDoctor />} />
        <Route path="/doctors/profile/:id" element={<DoctorProfile />} />
      
        <Route path="/booking/:doctorId" element={<DoctorBooking />} />
        <Route path="/booking/success/:id" element={<BookingSuccess />} />
       
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/doctors" element={<Doctors />} />
        <Route path="/admin/patients" element={<Patients />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/addpatient" element={<PatientProfileSetting />} />
       
        <Route path="/admin/specialites" element={<Specialites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
