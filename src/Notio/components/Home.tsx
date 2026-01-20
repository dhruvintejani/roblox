import { useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets/data/Notio/dummydata";

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
              className="flex mt-2 justify-between bg-black bg-opacity-40 p-4 hover:bg-opacity-100 cursor-pointer fixed text-white font-bold z-30"
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
