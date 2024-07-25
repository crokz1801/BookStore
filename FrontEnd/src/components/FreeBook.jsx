import React,{useState,useEffect} from "react";
// import list from "../../public/list.json";
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";


function FreeBook() {
  

  const[book,setBook]=useState([]);
  
  useEffect(()=>{
    const fetch = async()=>{
      try{
        const res=await axios.get("http://localhost:3000/book/");
        console.log(res.data);
        setBook(res.data.filter((data) => data.category === "Free"));
      }catch(err){
          console.log(err);
      }
    }
    fetch();
  },[])
  // const filerData = book.filter((data) => data.category === "Free");
  //   console.log(filerData);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        <div>
          <h1 className="font-semibold text-xl pd-2 ">Free Offered Books</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
            dolor, debitis ducimus, tempora quo excepturi atque dignissimos,
            dolorum incidunt sequi explicabo laudantium mollitia illo iste.
          </p>
        </div>

        <div>
          <div className="slider-container">
            <Slider {...settings}>
              {book.map((item) => (
                <Cards item={item} key={item.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

export default FreeBook;
