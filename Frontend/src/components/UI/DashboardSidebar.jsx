import React from 'react';
import img from '../../images/avatar.jpg';
import './DashboardSidebar.css';
import { Link, NavLink } from 'react-router-dom';
// import useAuthCheck from '../../redux/hooks/useAuthCheck';
import {
    FaTable,
    FaCalendarDay,
    FaUserInjured,
    FaHourglassStart,
    FaRegStar, FaUserCog, FaBlog,
    FaSignOutAlt,
    FaLock,
    FaHouseUser
} from "react-icons/fa";

const DashboardSidebar = () => {
    // const { data, role } = useAuthCheck();
      const data = {}; // Set default data or fetch data from other sources if needed
      const role = "doctor";

    return (
        <div className="profile-sidebar p-3 rounded">
            <div className="p-2 text-center border-bottom">
                {
                    role === 'doctor' ?
                        <div className="profile-info text-center">
                            <Link to={'/'}><img src={data?.img ? data?.img : img} alt="" /></Link>
                            <div className='profile-details'>
                                <h5 className='mb-0 '>{data?.firstName + " " + data?.lastName}</h5>
                                <div>
                                    <p className="mb-0">{data?.designation}</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="profile-info text-center">
                            <Link to={'/'}><img src={data?.img ? data?.img : img} alt="" /></Link>
                            <div className='profile-details'>
                                <h5 className='mb-0'>{data?.firstName + " " + data?.lastName}</h5>
                                <div className='mt-2 hard-details'>
                                    <p className=' form-text m-0'>09 september 2001, 22 Years</p>
                                    <p className=' form-text m-0'> Addis Ababa , Ethiopia</p>
                                    <p className=' form-text m-0'>{data?.email}</p>
                                </div>
                            </div>
                        </div>
                }

            </div>
            <nav className="dashboard-menu">
                {
                    role === 'patient' ?
                        <ul>
                            <li>
                                <NavLink to={'/dashboard'} activeClassName="active" end>
                                    <FaTable className="icon" />
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/favourite'} activeClassName="active">
                                    <FaHouseUser className="icon" />
                                    <span>Favourites</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/profile-setting'} activeClassName="active">
                                    <FaUserCog className="icon" />
                                    <span>Profile Settings</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/change-password'} activeClassName="active">
                                    <FaLock className="icon" />
                                    <span>Change Password</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/'}>
                                    <FaSignOutAlt className="icon" />
                                    <span>Logout</span>
                                </NavLink>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <NavLink to={'/dashboard'} activeClassName="active" end>
                                    <FaTable className="icon" />
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/appointments'} activeClassName="active" end >
                                    <FaCalendarDay className="icon" />
                                    <span>Appointments</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/my-patients'} activeClassName="active" end>
                                    <FaUserInjured className="icon" />
                                    <span>My Patients</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/prescription'} activeClassName="active" end>
                                    <FaUserInjured className="icon" />
                                    <span>Prescription</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/schedule'} activeClassName="active" end>
                                    <FaCalendarDay className="icon" />
                                    <span>Schedule Timings</span>
                                </NavLink>
                            </li>
                           

                           

                            <li>
                                <NavLink to={'/dashboard/profile-setting'} activeClassName="active" end>
                                    <FaUserCog className="icon" />
                                    <span>Profile Settings</span>
                                </NavLink>
                            </li>

                          

                            <li>
                                <NavLink to={'/dashboard/change-password'} activeClassName="active" end>
                                    <FaLock className="icon" />
                                    <span>Change Password</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/'}>
                                    <FaSignOutAlt className="icon" end />
                                    <span>Logout</span>
                                </NavLink>
                            </li>
                        </ul>
                }
            </nav>
        </div>
    )
}
export default DashboardSidebar;