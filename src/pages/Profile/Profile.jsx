import { useState, useEffect } from 'react';
import * as usersAPI from '../../utilities/users-api';
import { MDBCardTitle, MDBBtn, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

export default function Profile({user}) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      const info = await usersAPI.getUserInfo();
      setUserInfo(info);
    }
    getUserInfo();
  }, []);
console.log(userInfo)
  return (
    <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={user.avatar}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{user.name}</MDBCardTitle>
                    <MDBCardText>Senior Developer</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Snippets</p>
                        <p className="mb-0">{userInfo.totalPosts}</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Comments</p>
                        <p className="mb-0">{userInfo.totalComments}</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Likes</p>
                        <p className="mb-0">{userInfo.totalLikes}</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      {/* <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn> */}
                      <MDBBtn className="flex-grow-1">See All Snippets</MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}