import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Bookmark = () => {
  const [uid,setUid] = useState(JSON.parse(localStorage.getItem("MyUser"))._id);
  const [bookmark,setBookmark] = useState([]);

    const [datum, setDatum] = useState([]);
    // const [mdatum, setMdatum] = useState([]);
  
    const history = useHistory();
    let user ;

    const userDetail = async () => {

      // let uid = user0._id;
    
      fetch("/user/"+uid)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
        // console.log("useful->",data );
          setBookmark(data.bookmark);
          console.log("bma->",bookmark)
    
         })
        .catch((err) => console.log(err));
    };

    
 
  
    let temp = [];
    const getMyDatum = async () => {
      fetch("/allPg")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
  
          let temp = [];
          for (let i = 0; i < data.length; i++) {
            if (bookmark.includes(data[i]._id)) {
              temp.push(data[i]);
            }
          }
  
          setDatum(temp);
   
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {

      userDetail();

      getMyDatum();
  
 
    }, []);
  
  

    return (  

      <>
      </>
    );
}
 
export default Bookmark;