import { useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets/data/Notio/dummydata";

const Home = () => {
  const [mode, setMode] = useState(false);

  return (
    <div className="w-full px-[75px] bg-white dark:bg-neutral-950">
      <div>
        {mode && (
          <div
            className="flex fixed z-50 w-[90.5%] justify-center gap-6 p-4
                       bg-black dark:bg-neutral-900
                       text-white font-semibold animate-slideDown"
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
              className="flex mt-2 justify-between fixed z-30 p-4 cursor-pointer
                         bg-black/40 dark:bg-neutral-800/70
                         hover:bg-black dark:hover:bg-neutral-800
                         text-white font-bold"
              onClick={() => setMode(true)}
            >
              FILTERS
            </p>
          )}

          {images.map((item, index) => (
            <div key={index} className="relative pb-6 group cursor-pointer">
              <Link to="/products">
                <img
                  src={item.src}
                  alt=""
                  className={`w-full object-cover ${
                    item.height ? "h-[715px]" : ""
                  }`}
                />

                <div
                  className="absolute inset-0 mb-6 opacity-0 group-hover:opacity-100
                             transition-opacity duration-300
                             hover:animate-slideDown animate-slideUp
                             bg-gray-400/20 dark:bg-black/40
                             flex flex-col items-center justify-end
                             text-black dark:text-white text-center"
                >
                  <div className="bg-gray-400/40 dark:bg-black/60 w-full">
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

      <div
        className="flex justify-center p-8 mb-5 font-bold cursor-pointer
                   bg-gray-100 dark:bg-neutral-900
                   text-gray-500 dark:text-gray-400
                   hover:text-black dark:hover:text-white"
      >
        LOAD MORE
      </div>
    </div>
  );
};

export default Home;
