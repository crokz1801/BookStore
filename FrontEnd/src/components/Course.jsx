import React, { useEffect , useState } from "react";
// import list from "../../public/list.json";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from 'axios'

function Course() {

  const[book,setBook]=useState([]);
  
  useEffect(()=>{
    const fetch = async()=>{
      try{
        const res=await axios.get("http://localhost:3000/book/");
        console.log(res.data);
        setBook(res.data);
      }catch(err){
          console.log(err);
      }
    }
    fetch();
  },[])
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We are delight to have you{" "}
            <span className="text-pink-500">Here ! :) </span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
            quibusdam culpa assumenda rerum dignissimos ex veniam rem illo
            dolores debitis aliquam nulla voluptate magnam voluptates
            perspiciatis quidem minima exercitationem non?
          </p>
          <Link to="/">
          <button className=" mt-6 btn btn-secondary hover:bg-pink-800 duration-1000">
            Back
          </button>
          </Link>
        
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

//1.22.29
export default Course;
