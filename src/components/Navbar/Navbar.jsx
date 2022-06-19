import { Nav, Navbar as TopNav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { logOut } from "../../utilities/users-service";
import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <>
      <TopNav collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <TopNav.Brand href="#home">Code Room</TopNav.Brand>
          <TopNav.Toggle aria-controls="responsive-navbar-nav" />
          <TopNav.Collapse id="responsive-navbar-nav">
            {user ? (
              <>
                <Nav className="me-auto">
                  <Link to={"/allposts"} style={{marginLeft: '15px', color: '#fffd7e'}}>All Posts</Link>
                  <Link to={"/myposts"} style={{marginLeft: '15px',color: '#fffd7e'}}>My Posts</Link>
                  <Link to={"/favorites"} style={{marginLeft: '15px', color: '#fffd7e'}}>My Favorites</Link>
                  <Link to={"/create"} style={{marginLeft: '15px', color: '#fffd7e'}}>Add Post</Link>
                </Nav>
                <Nav>
                  <Link style={{ color: '#fffd7e'}} to={'./login'} onClick={handleLogOut}>LogOut</Link>
                </Nav>
              </>
            ) : (
              <>
                <Nav>
                  <Link to={"./login"} style={{marginLeft: '15px', color: '#fffd7e'}}>LogIn</Link>
                  <Link to={"./signup"} style={{marginLeft: '15px', color: '#fffd7e'}}>SignUp</Link>
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
