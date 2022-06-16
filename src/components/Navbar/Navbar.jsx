import { Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { logOut } from "../../utilities/users-service";
import { Link } from "react-router-dom";

function Navibar({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Code Room</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {user ? (
              <>
                <Nav className="me-auto">
                  <Link to={"/allposts"} style={{marginLeft: '15px'}}>All Posts</Link>
                  <Link to={"/myposts"} style={{marginLeft: '15px'}}>My Posts</Link>
                  <Link to={"/favorites"} style={{marginLeft: '15px'}}>My Favorites</Link>
                  <Link to={"/create"} style={{marginLeft: '15px'}}>Add Post</Link>
                </Nav>
                <Nav>
                  <Link to={'./login'} onClick={handleLogOut}>LogOut</Link>
                </Nav>
              </>
            ) : (
              <>
                <Nav>
                  <Link to={"./login"} style={{marginLeft: '15px'}}>LogIn</Link>
                  <Link to={"./signup"} style={{marginLeft: '15px'}}>SignUp</Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navibar;
