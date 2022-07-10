import { Nav, Navbar as TopNav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { logOut } from "../../utilities/users-service";
import { Link } from "react-router-dom";
import './Navbar.css'
function Navbar({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <>
      <TopNav collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <div>
        <img
        src="./logo-left.png"
        width="15"
        height="51"
        className="d-inline-block align-top animate-flicker-left"
        alt="Code-Room logo"/>
                <img
        src="./slash.png"
        width="15"
        height="51"
        className="d-inline-block align-top animate-flicker-slash"
        alt="Code-Room logo"/>
                <img
        src="./logo-right.png"
        width="15"
        height="51"
        className="d-inline-block align-top animate-flicker-right"
        alt="Code-Room logo"/>
        </div>
          <TopNav.Brand href="" className='topnav-brand' style={{userSelect: 'none',marginLeft:'15px'}}>Code Room</TopNav.Brand>
          <TopNav.Toggle aria-controls="responsive-navbar-nav" />
          <TopNav.Collapse id="responsive-navbar-nav">
            {user ? (
              <>
                <Nav className="me-auto">
                  <Link to={"/allposts"} style={{marginLeft: '15px', color: 'aqua'}}>All Posts</Link>
                  <Link to={"/myposts"} style={{marginLeft: '15px',color: 'aqua'}}>My Posts</Link>
                  <Link to={"/favorites"} style={{marginLeft: '15px', color: 'aqua'}}>My Favorites</Link>
                  <Link to={"/create"} style={{marginLeft: '15px', color: 'aqua'}}>Add Post</Link>
                </Nav>
                <Nav>
                  <div>
                  <p className='welcome-name' >Welcome {user.name}</p>
                  <Link style={{ color: 'aqua'}} to={'./login'} onClick={handleLogOut}>LogOut</Link>
                  </div>
                </Nav>
              </>
            ) : (
              <>
                <Nav>
                  <Link to={"./login"} style={{marginLeft: '15px', color: 'aqua'}}>LogIn</Link>
                  <Link to={"./signup"} style={{marginLeft: '15px', color: 'aqua'}}>SignUp</Link>
                </Nav>
              </>
            )}
          </TopNav.Collapse>
        </Container>
      </TopNav>
    </>
  );
}

export default Navbar;
