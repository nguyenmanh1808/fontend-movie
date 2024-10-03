import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTv } from "react-icons/fa";
import {DiReact} from 'react-icons/di';
import {MdDashboard,MdMovie } from 'react-icons/md';

import { FaTachometerAlt, FaGem, FaList, FaGithub, FaClipboardList ,FaUser,FaCommentDots } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { Link } from 'react-router-dom';


const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            height: '100%',
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            
                        }}
                    >
                    <Link to="/"   target='_blank' className='sidebar-header-link'>
                         <FaTv  size={'2.5em'} color='#00bfff' />
                        <span className='ms-1'>TVWatch</span></Link>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            Dashboard
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu >
                        <MenuItem icon={<FaUser/>}> Quản lý người dùng   
                                <Link to="/admin/manage-user" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdMovie />}
                        >
                            Quản lý phim
                            <Link to="/admin/manage-movie" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaClipboardList />}
                        >
                            Quản lý thể loại phim
                            <Link to="/admin/manage-category" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaCommentDots />}
                        >
                            Quản lý bình luận
                            <Link to="/admin/manage-comment" />
                        </MenuItem>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <Link to="/"  target='_blank' className="sidebar-btn"  rel="noopener noreferrer">
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                TVWatch
                            </span>
                            </Link>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;