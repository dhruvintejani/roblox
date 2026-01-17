import { useState } from "react";
import image_1 from "../../assets/Notio/n-1.jpg";
import image_2 from "../../assets/Notio/n-2.jpg";
import image_3 from "../../assets/Notio/n-3.jpg";
import image_4 from "../../assets/Notio/n-4.jpg";
import image_5 from "../../assets/Notio/n-5.jpg";
import image_6 from "../../assets/Notio/n-6.jpg";
import image_7 from "../../assets/Notio/n-7.jpg";
import image_8 from "../../assets/Notio/n-8.jpg";
import image_9 from "../../assets/Notio/n-9.jpg";
import image_10 from "../../assets/Notio/n-10.jpg";
import { Link } from "react-router-dom";

const images = [
  { src: image_1, title: "Button Badge", category: "Branding" },
  { src: image_5, title: "Bicycle", category: "Illustration" },
  { src: image_8, title: "Creative", category: "Design" },
  { src: image_2, title: "Beer Bottle", height: "200px", category: "Mockup" },
  { src: image_9, title: "Character Art", category: "Artwork" },
  { src: image_3, title: "Wooden Pencils", category: "Stationery" },
  { src: image_6, title: "Free Lancelot", category: "Web" },
  { src: image_10, title: "Packaging", category: "Mockup" },
  { src: image_4, title: "Mountain Logo", category: "Branding" },
  {
    src: image_7,
    title: "Minimal Design",
    height: "200px",
    category: "Branding",
  },
];

const Home = () => {
  const [mode, setMode] = useState(false);

  return (
    <div className="w-full px-[75px]">
      <div>
        {mode && (
          <div
            className={`flex fixed z-50 w-[90.5%] justify-center gap-6 p-4 bg-black text-white font-semibold animate-slideDown`}
          >
            <div
              className="flex gap-6 cursor-pointer"
              onClick={() => setMode(false)}
            >
              <p className="hover:text-green-400 text-green-400">ALL</p>
              <p className="hover:text-green-400">SIMULATION</p>
              <p className="hover:text-green-400">SAATCHI</p>
              <p className="hover:text-green-400">SPECIOUS</p>
              <p className="hover:text-green-400">SPIEKERMANN</p>
              <p className="hover:text-green-400">STEPH</p>
            </div>
          </div>
        )}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
          {!mode && (
            <p
              className="flex justify-between bg-black bg-opacity-40 p-4 hover:bg-opacity-100 cursor-pointer fixed text-white font-bold z-30"
              onClick={() => setMode(true)}
            >
              FILTERS
            </p>
          )}

          {images.map((item, index) => (
            <div key={index} className="relative pb-6 group cursor-pointer">
              <Link to={"/products"}>
                <img
                  src={item.src}
                  alt=""
                  className={`w-full object-cover ${
                    item.height ? "h-[715px]" : ""
                  }`}
                />
                <div className="absolute inset-0 hover:animate-slideDown animate-slideUp bg-gray-400/20 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end text-black text-center">
                  <div className="bg-gray-400/40 w-full">
                    <h1 className="text-[35px] font-bold tracking-wide">
                      {item.title}
                    </h1>
                    <p className="text-md uppercase pb-2 tracking-widest opacity-80">
                      {item.category}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex text-gray-400 hover:text-black justify-center p-8 bg-gray-100 mb-5">
        <h3 className="font-bold">LOAD MORE</h3>
      </div>
    </div>
  );
};

export default Home;
