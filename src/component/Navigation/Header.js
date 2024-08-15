import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.scss'
import { Outlet, Link,NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci"
import { IconContext } from "react-icons";
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">TVWatch</Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink to="/phim-moi" className="nav-link">Phim mới</NavLink>
            <NavLink to="/phim-le" className="nav-link">Phim lẻ</NavLink>
            <NavLink to="/phim-bo" className="nav-link">Phim bộ</NavLink>
            <NavDropdown title="Thể loại" >
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Cổ trang</Link></NavDropdown.Item>
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Kinh dị</Link></NavDropdown.Item>
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Viễn tưởng</Link></NavDropdown.Item>
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Hoạt hình</Link></NavDropdown.Item>
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Phim hài</Link></NavDropdown.Item>
            </NavDropdown>
              <NavDropdown title="Quốc gia">
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Việt Nam</Link></NavDropdown.Item>
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Trung Quốc</Link></NavDropdown.Item>
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Hàn Quốc</Link></NavDropdown.Item>
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Thái Lan</Link></NavDropdown.Item>
              <NavDropdown.Item > <Link to="/#" className='dropdown-item'>Mỹ</Link></NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          <Nav>
          <IconContext.Provider value={{  className: "search-icon" }}>    
            <CiSearch  />
          </IconContext.Provider>
           
            <input type='text' placeholder='Tìm kiếm' className='nav-search'/>
            <button className='btn btn-login'><Link to="/login" >Log in</Link></button>
            <button className='btn btn-signup btn-primary'>Sign up</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;