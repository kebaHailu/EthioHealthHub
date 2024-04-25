import React from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import PatientProfileSetting from './PatientProfileSetting';
import DoctorProfileSetting from './DoctorProfileSetting';
// import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const ProfileSetting = () => {
    const role = 'doctor'; // Set default data or fetch data from other sources if needed
    return (
        <DashboardLayout>
            {role === 'doctor' ? <DoctorProfileSetting />: <PatientProfileSetting/>}
        </DashboardLayout>
    )
}
export default ProfileSetting;