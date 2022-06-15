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
                  <Nav.Link href="">All Snippets</Nav.Link>
                  <Nav.Link href="">My Snippets</Nav.Link>
                  <Nav.Link href="">My Favorites</Nav.Link>
                  <Nav.Link href="">Add Snippet</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={handleLogOut}>LogOut</Nav.Link>
                </Nav>
              </>
            ) : (
              <>
                <Nav className="me-auto">
                  <Nav.Link href="">All Snippets</Nav.Link>
                </Nav>
                <Nav>
                 
                    <Link to={"./login"}>LogIn</Link>
                  
                  
                    <Link to={"./signup"}>SignUp</Link>
                 
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
