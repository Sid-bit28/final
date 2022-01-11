import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Slider from "./slider";

const PgDetail = () => {
  const [bookmark,setBookmark] = useState([]);
  const [uid,setUid] = useState(JSON.parse(localStorage.getItem("MyUser"))._id);
  const { id } = useParams();

  // const [local,setLocal] = useState({});
  //  setLocal(JSON.parse(localStorage.getItem("MyUser")));

  const history = useHistory();

    const [arr, setArr] = useState([]);
const[bval,setBval] = useState("Bookmark");
  const [pg, setPg] = useState({});
  let imgArr = [];
  const [useful,setUseful] = useState({});

  const [user0, setLoginUser] = useState({});
  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")));
    console.log("user0",user0);
  


 }, []);

 
 const userDetail = async () => {

  // let uid = user0._id;

  fetch("/user/"+uid)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setUseful(data);

      console.log("useful->",data );
      setBookmark(data.bookmark);
      console.log("bma->",bookmark)

     })
    .catch((err) => console.log(err));
};


  const getMyDatum = async () => {
    fetch(`/PgDetail/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setPg(data);

        setArr(data.photos);

 
  
    // let bv = false;
    // let bm = local.bookmark;

 
    // for(let i=0;i<bm.length;i++ ) {
    //   if(bm[i]._id ===id) {
    
    //     bv=true;
    //     break;
  
    //     }
    // }
    
    // if(bv) {
    //   setBval("Bookmarked");
    // } else setBval("Bookmark");

 
      
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userDetail();
 }, []);

  useEffect(() => {
    getMyDatum();
  }, []);

  // useEffect(()=> {
  //   let bv = false;
  //   let bm = local.bookmark;

 
  //   for(let i=0;i<bm.length;i++ ) {
  //     if(bm[i]._id === pg._id) {
    
  //       bv=true;
  //       break;
  
  //       }
  //   }
    
  //   if(bv) {
  //     setBval("Bookmarked");
  //   } else setBval("Bookmark");
  // },[])

 



  
  imgArr = arr;

  return (
    <div className="pgDetail">
      <header className="navbar0">
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
        <h1>Contact Us</h1>
        { (user0 && user0._id) ?
 <Link to= "/profile" className="profileButton"> {user0.name}  </Link> 
:
<Link className="loginButton"  to= "/login"> Login/Signup </Link>  
 }
      </header>

      <div className="mainPgDetail">
        <div className="pgCard">
          <div className="pgCardUp">
            <div className="addAndLabel">
              <br />
              <strong>{pg.label}</strong>
              <br />
              {pg.address}
            </div>

            <div className="rentAndSecurity">
              <div className="indiRent">
                Rs. {pg.price}
                <br />
                Rent/Month
              </div>

              <div className="indiSecurity">
                Rs. {pg.security}
                <br />
                Security Deposit
              </div>
            </div>
          </div>

          <div className="pgCardDn">
             <Slider imgArr={imgArr} />

            <div className="pgCardInfo">
              <div className="pci">
                <div className="pcd pcr">For {pg.gender} </div>

                <div className="pcd"> {pg.meal} </div>
              </div>
              <div className="pci">
                <div className="pcd pcr"> Furnishing {pg.furnishing} </div>

                <div className="pcd"> {pg.capacity} </div>
              </div>
              <div className="pci">
                <div className="pcd pcr"> Parking {pg.parking}  </div>

                <div className="pcd"> Gate closed 9 PM </div>
              </div>
         
  
        <button className="pci chat"   onClick={(e)=> {
// Bookmark a pg

let bm = bookmark;

for(let i=0;i<bm.length;i++ ) {
  if(bm[i]._id === pg._id) {
    e.target.innerText="Bookmarked";

    alert("Already Bookmarked")
    return;}
} 

let updUser = useful;
e.target.innerText="Bookmarked";





console.log("updUser",updUser)
  updUser.bookmark.push(pg)

  // localStorage.setItem("MyUser", JSON.stringify(updUser));

          fetch((`/bookmark/${uid}`) , {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(


              updUser


            )
          }).then((result) => {
      
    
            result.json().then((resp) => {
             console.log("uodated",  resp);
             userDetail();

            });
          });







        }}>{bval}</button> 
        
        
         
              </div>
          </div>

          <div className="commodity" > <strong>Nearby Commodity</strong>  - {pg.landmark}</div>
        </div>
      </div>
    </div>
  );
};

export default PgDetail;
 