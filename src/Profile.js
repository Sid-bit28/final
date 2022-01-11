import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Bookmark from "./bookmarks";
import { isEmpty } from "lodash";

const Profile = () => {
  let uid;
  const [user, setUser] = useState({});
  const [bookmark, setBookmark] = useState([]);

  // const [datum, setDatum] = useState([]);

  const history = useHistory();

  const userDetail = async () => {
    uid = JSON.parse(localStorage.getItem("MyUser"))._id;
    fetch("/user/" + uid, {
      // mode: 'no-cors',
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("useful->", data);

        setUser(data);
        setBookmark(data.bookmark);
        console.log("user->", user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userDetail();
  }, []);

  return (
    <div className="mainProf">
      <header className="navbar0">
        <h1>
          <Link to="/">
            <i>PG Finder</i>
          </Link>
        </h1>
        <Link to="./about">
          <h1>About Us</h1>{" "}
        </Link>
        <Link to="./services">
          <h1>Services</h1>
        </Link>
        <h1>Contact Us</h1>
        <button className="loginButton"
          onClick={() => {
            // history.push("/profile");
            localStorage.setItem("MyUser", JSON.stringify({})); //put the object back

            // history.push("/profile");
            history.push("/login");
            // updateUser({});
            // history.push("/login");
          }}
        >
          <h1>Logout</h1>
        </button>
      </header>

      <div className="profHead">
        <div className="profileName"> Name : {user.name}</div>
        <div className="emailName">Email : {user.email}</div>
      </div>

      {isEmpty(bookmark) ? (
        <div className="noBookmark">
          No Bookmarks. When you will bookmark a PG, you will see them here ...
        </div>
      ) : (
        <div className="allPgs">
          <h1 className="allPgh1">All Bookmarked PGs</h1>
          {bookmark.map((pg) => (
            <div className="hi">
              <Link to={`/PgDetail/${pg._id}`} target="_blank" className="noPM">
                <div className="pg-preview">
                  <div className="previewUp">
                    <h3 className="pgLabel">{pg.label}</h3>
                    <div className="pgAddress">{pg.address}</div>
                  </div>

                  <div className="previewDown">
                    <div className="pgDnLeft">
                      <img src={pg.photos[0]} width={310} height={180} />
                    </div>

                    <div className="pgDnRight">
                      <div className="security">
                        <div className="securityData">₹ {pg.security} </div>
                        <div className="securityName">Security Deposite</div>
                      </div>
                      <div className="rent">
                        <div className="rentData">₹ {pg.price}</div>
                        <div className="rentName">Rent/month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <button className="pci chat"
                onClick={() => {
                  let temp = user;
                  let temp_bm = temp.bookmark;
                  let final_bm = [];
                  for (let i = 0; i < temp_bm.length; i++) {
                    if (temp_bm[i]._id !== pg._id) final_bm.push(temp_bm[i]);
                  }

                  temp.bookmark = final_bm;
                  uid = JSON.parse(localStorage.getItem("MyUser"))._id;

                  fetch(`/bookmark/${uid}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(temp),
                  }).then((result) => {
                    result.json().then((resp) => {
                      console.log("ka ba", resp);
                      userDetail();
                    });
                  });
                }}
              >
                Remove from Bookmark
              </button>
            </div>
          ))}
        </div>
      )}

      {/* <div className="allPgs">
        <h1 className="allPgh1">All Bookmarked PGs</h1>
        {datum.map((pg) => (
          <Link to={`/PgDetail/${pg._id}`} target="_blank" className="noPM">
            <div className="pg-preview">
              <div className="previewUp">
                <h3 className="pgLabel">{pg.label}</h3>
                <div className="pgAddress">{pg.address}</div>
              </div>

              <div className="previewDown">
                <div className="pgDnLeft">
                  <img src={pg.photos[0]} width={310} height={180} />
                </div>

                <div className="pgDnRight">
                  <div className="security">
                    <div className="securityData">₹ {pg.security} </div>
                    <div className="securityName">Security Deposite</div>
                  </div>
                  <div className="rent">
                    <div className="rentData">₹ {pg.price}</div>
                    <div className="rentName">Rent/month</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default Profile;
