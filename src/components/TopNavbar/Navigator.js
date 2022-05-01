import { useContext, useState, useEffect } from "react"
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"
import { isAutheticated } from "../auth/authhelper";
import { API } from "../../API";


const Navigator = () => {

  const [userData, setUserData] = useState(null);
  const [toggle, setToggle] = useState(false)
  const { token } = isAutheticated();

  let navigate = useNavigate();



  useEffect(() => {
    const getUser = async () => {
      // let existanceData = JSON.parse(localStorage.getItem("userData"));
      // if (existanceData) {
      //   // console.log(existanceData.userData)
      //   setUserData(JSON.parse(localStorage.getItem("userData")).userData);
      if (!token) {
        setUserData(false)
        return;
      } else {
        try {
          console.log("requesting user data from server");
          const response = await axios.get(`${API}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(response.data)

          //setUserData(response.data.data);
          // localStorage.setItem(
          //   "userData",
          //   JSON.stringify({
          //     userData: response.data.data
          //   })
          // );
          setUserData(response.data.data);
        } catch (err) {
          console.log(err);
          setUserData(false)
        }
      }
    };
    getUser();
  }, [token]);




  return (
    <div >
      <Navbar className="outerNavbar" bg="light" expand="sm" fixed="top" collapseOnSelect>
        <Container style={{ display: "flex" }}>
          <Navbar.Brand className="mr-4" href="/">
            <img
              src="/download.webp"
              width="150"
              height="30"
              style={{ "marginRight": "10px" }}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle style={{ backgroundColor: "" }} aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link
              href="/history" >
              Booking History
            </Nav.Link>
          </Nav>

          {(userData) && (
            <>
              <Nav>
                <li className="" style={{ float: "left", paddingRight: "5px" }}>
                  <Nav.Link href="#" onClick={() => {
                    window.localStorage.clear();
                    navigate("/")
                    window.location.reload();
                  }}>Logout</Nav.Link>
                </li>
                <Nav.Link className="">
                  <li className="text-center" >
                    <span className="p-2 avatar avatar-32 rounded bg-danger">{userData.firstName} {userData.lastName}
                    </span>
                  </li>
                </Nav.Link>
              </Nav>
            </>
          )}

          {/* </Navbar.Collapse> */}
        </Container >
      </Navbar >
    </div>
  )
}

export default Navigator
