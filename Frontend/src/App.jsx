import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import SignInForm from "./components/Login/SignInForm";
import DoctorProfile from "./components/Doctor/DoctorProfile/DoctorProfile";
import Appointments from "./components/Doctor/Appointments/Appointments";
import MyPatients from "./components/Doctor/MyPatients/MyPatients";
import Calendly from "./components/Calendly/Calendly";
import Schedule from "./components/Doctor/Schedule/Schedule";
import ProfileSetting from "./components/Doctor/ProfileSetting/ProfileSetting";
import ChangePassword from "./components/Doctor/ChangePassword/ChangePassword";
import AdminDashboard from "./components/Admin/Dashboard/Dashboard";
import AdminAppointments from "./components/Admin/Appointments/Appointments";
import Patients from "./components/Admin/Patients/Patients";
import Profile from "./components/Admin/Profile/Profile";
import Specialites from "./components/Admin/Specialites/Specialites";
import SearchDoctor from "./components/Doctor/SearchDoctor/SearchDoctor";
import Stations from "./components/Stations/Stations";
import StationAdmin from "./components/StationAdminDashboard/StationAdmin";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Service from "./components/Service/Service";
import AppointmentPage from "./components/Appointment/AppointmentPage";
import Prescription from "./components/Doctor/Prescription/Prescription";
import PrescriptionView from "./components/Doctor/Prescription/PrescriptionView";
import ViewAppointment from "./components/Doctor/Appointments/ViewAppointment";
import ForgotPassword from "./components/Login/ForgotPassword";
import Dashboard from "./components/Doctor/Dashboard/Dashboard";
import NotFound from "./components/UI/NotFound";
import PatientProfileSetting from "./components/Doctor/ProfileSetting/PatientProfileSetting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Scan from "./components/ImageUploader/Scan";
import Tecnician from "./components/StationAdminDashboard/Tecnician";
import ViewDetails from "./components/ViewDetail/ViewDetails";
import UnAuthorized from "./UnAuthorized/UnAuthrized";
import PrivateAuthRoute from "./components/Auth/PrivateAuthRoute";

import Physician from "./components/Physician/Physician";

function App() {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/stations" element={<Stations />} />

        <Route path="/login" element={<SignInForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route
          path="/reset-password/:userId/:uniqueString"
          element={<ForgotPassword />}
        />
        <Route path="/doctors" element={<SearchDoctor />} />
        <Route path="/calendly" element={<Calendly />} />
        <Route path="/doctors/profile/:id" element={<DoctorProfile />} />
        <Route path="/technician" element={<Tecnician />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
        {/* Protected Routes for different roles */}

        <Route
          path="/appointment"
          element={
            // <PrivateAuthRoute roes={["HO"]}>
            <AppointmentPage />
            // </PrivateAuthRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <Dashboard />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/dashboard/my-patients"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <MyPatients />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/dashboard/schedule"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <Schedule />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/dashboard/appointments"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <Appointments />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/dashboard/appointments/:id"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <ViewDetails />
            </PrivateAuthRoute>
          }
        />
        {/* <Route
          path="/dashboard/appointments/:id"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <ViewAppointment />
            </PrivateAuthRoute>
          }
        /> */}
        <Route
          path="/dashboard/prescription"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <Prescription />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/dashboard/prescription/:id"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <PrescriptionView />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/dashboard/change-password"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <ChangePassword />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/dashboard/profile-setting"
          element={
            <PrivateAuthRoute roles={["SD"]}>
              <ProfileSetting />
            </PrivateAuthRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAuthRoute roles={["HO"]}>
              <AdminDashboard />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/addpatient"
          element={
            <PrivateAuthRoute roles={["HO"]}>
              {<PatientProfileSetting />}
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/physician"
          element={
            <PrivateAuthRoute roles={["HO"]}>{<Physician />}</PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <PrivateAuthRoute roles={["HO"]}>
              <AdminAppointments />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <PrivateAuthRoute roles={["HO"]}>
              <Patients />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <PrivateAuthRoute roles={["HO"]}>
              <Profile />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/specialites"
          element={
            <PrivateAuthRoute roles={["HO"]}>
              <Specialites />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/station-admin"
          element={
            <PrivateAuthRoute roles={["SA"]}>
              <StationAdmin />
            </PrivateAuthRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
