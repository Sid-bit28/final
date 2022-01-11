import Bgi from "./images/HomePageBG.jpeg";
import { Link, useHistory } from "react-router-dom";
import  {useState,useEffect} from "react"
import { isEmpty, isNull, set } from "lodash";
// import { useHistory } from "react-router-dom";
const Home = () => {
 

  // const updateUser = (user0) => {
  //   localStorage.setItem("MyUser", JSON.stringify(user0));
  //   setLoginUser(user0);

  // };

  const [user0, setLoginUser] = useState(null);
  
  useEffect(()=> {

    setLoginUser(JSON.parse(localStorage.getItem("MyUser")));
 },[]);

  const history = useHistory();

  return (
    <div className="home">
         <header className="navbar">
        <h1>
          <Link to="/">
            <i>PG Finder</i>
          </Link>
        </h1>
        <Link to="/about">
          <h1>About Us</h1>{" "}
        </Link>
        <Link to="/services">
          <h1>Services</h1>
        </Link>

        <a href = "https://www.linkedin.com/in/siddarth-banerjee-163101202"  >
        <h1>Contact Us</h1>
        </a>
        {/* <button
          onClick={() => {
            // updateUser({});
            history.push("/profile");
            // history.push("/login");
          }}
        >
          <h1> {JSON.parse(localStorage.getItem("MyUser")).name}</h1>
        </button> */}
      
      
     
      { (user0 && user0._id) ?
 <Link to= "/profile" className="profileButton"> {user0.name}  </Link> 
:
<Link className="loginButton"  to= "/login"> Login/Signup </Link>  
 }

      
      

      </header>

      <div className="searchPg">
        <div className="textPart">
          <div>
            Let's Find
            <br />
            Your Dream PG
            <br />
          </div>
          <input disabled type="text"    id="" name=""  />
         <Link to="/allPg"> <button> SEARCH   </button></Link>
        </div>
      </div>
    
    </div>
  );
};

export default Home;
