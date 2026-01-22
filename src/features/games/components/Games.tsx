import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Fruit_Ninja_img from "..//assets/Fruit_Ninja.jpg";
import Snake_img from "..//assets/Snake.jpg";
import Car_racing_img from "..//assets/Car_racing.jpg";
import Hill_Climb_Racing_img from "..//assets/Hill_Climb_Racing.jpg";
import Minecraft_img from "..//assets/Minecraft.jpg";
import Temple_Run_img from "..//assets/Temple_Run.jpg";
import Ludo_img from "..//assets/Ludo.jpg";
import Subway_Surfer_img from "..//assets/Subway_Surfer.jpg";
import Temple_Run_2_img from "..//assets/Temple_Run_2.jpg";
import Angry_Birds_img from "..//assets/Angry_Birds.jpg";
import Angry_Birds_2_img from "..//assets/Angry_Birds_2.jpg";
import Moto_3x_img from "..//assets/moto_3x.jpg";
import { Icon } from "@iconify/react";
import Facebook_img from "..//assets/Group (6).png";
import TIktok_img from "..//assets/Group (7).png";
import Youtube_img from "..//assets/Group (8).png";
import Twitter_img from "..//assets/Group (9).png";
import Games_Video from "..//assets/preview.mp4";
import Dark_img from "..//assets/light-mode-78.png";
import Light_img from "..//assets/light-mode-79.png";
import { useEffect, useState } from "react";

const dummydata = [
  {
    id: "1",
    img: Subway_Surfer_img,
    title: "Subway Surfer",
    description: "Run through subways, dodge trains, and collect coins.",
  },
  {
    id: "2",
    img: Snake_img,
    title: "Snake",
    description: "Control the snake, eat food, and grow without hitting walls.",
  },
  {
    id: "3",
    img: Temple_Run_img,
    title: "Temple Run",
    description: "Endless runner game with obstacles and fast-paced action.",
  },
  {
    id: "4",
    img: Angry_Birds_img,
    title: "Angry Birds",
    description: "Run through subways, dodge trains, and collect coins.",
  },
  {
    id: "5",
    img: Hill_Climb_Racing_img,
    title: "Hill Climb Racing",
    description: "Drive through hills and rough terrains without crashing.",
  },
  {
    id: "6",
    img: Car_racing_img,
    title: "Car racing",
    description: "High-speed racing game with multiple tracks and cars.",
  },
  {
    id: "7",
    img: Ludo_img,
    title: "Ludo",
    description: "Classic board game to play with friends and family.",
  },
  {
    id: "8",
    img: Fruit_Ninja_img,
    title: "Fruit_Ninja",
    description: "Slice fruits with fast swipes and avoid bombs to score high.",
  },
  {
    id: "9",
    img: Temple_Run_2_img,
    title: "Temple Run 2",
    description: "Run through subways, dodge trains, and collect coins.",
  },
  {
    id: "10",
    img: Minecraft_img,
    title: "Minecraft",
    description: "Endless runner game with obstacles and fast-paced action.",
  },
  {
    id: "11",
    img: Angry_Birds_2_img,
    title: "Angry Birds 2",
    description: "Run through subways, dodge trains, and collect coins.",
  },
  {
    id: "12",
    img: Moto_3x_img,
    title: "Moto 3x",
    description: "Run through subways, dodge trains, and collect coins.",
  },
];
const Games = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("userData") as string);
  const [mode, setMode] = useState<"dark" | "light">('light');

  const games = dummydata.find((item) => item.id == id);

  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem("mode") as string);
    if (savedMode) {
      setMode(savedMode);
    }
  }, []); 

    const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", JSON.stringify(newMode));
  };

  return (
    <div
      className={
        mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }
    >
      <header className="flex justify-between items-center px-8 py-5 bg-black bg-opacity-70 backdrop-blur-md fixed top-0 left-0 w-full text-white font-bold z-30">
        <div className="font-bold text-2xl">ACENDA</div>
        <nav className="space-x-8 flex items-center text-md font-medium">
          <Link to="/dashboard" className="hover:underline">
            Home
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Games
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Web Games
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Contact
          </Link>
          {user && (
            <button className="flex">
              <Icon icon="mdi:account" width={34} color="gray" />
            </button>
          )}

          <button onClick={toggleMode} className="w-[43px]">
            {mode === "dark" ? (
              <img src={Light_img} alt="" />
            ) : (
              <img src={Dark_img} alt="" />
            )}
          </button>
        </nav>
      </header>
      <div className="flex flex-col items-center pt-[130px] mb-[80px]">
        <div className="relative w-[1000px] h-[500px]">
          <video
            src={Games_Video}
            loop
            playsInline
            autoPlay
            controls
            className="w-full h-full rounded-2xl"
          />
        </div>

        <h1 className="text-3xl font-bold mt-4">{games?.title}</h1>
        <p className="mt-3 font-semibold text-center max-w-xl">
          {games?.description}
        </p>
      </div>

      <div className="bg-black text-white p-10 mt-11">
        <div className="flex justify-center font-bold gap-11">
          <span className="hover:underline">Publishing</span>
          <span className="hover:underline">Our Story</span>
          <span className="hover:underline">Games</span>
          <span className="hover:underline">Web Games</span>
          <span className="hover:underline">Support</span>
        </div>

        <div className="flex justify-center gap-11 p-[70px]">
          <img src={Facebook_img} alt="" />
          <img src={Twitter_img} alt="" />
          <img src={TIktok_img} alt="" />
          <img src={Youtube_img} alt="" />
        </div>

        <div className="flex justify-center gap-8">
          <span className="hover:underline">Terms and Conditions</span>
          <span className="hover:underline">Privacy Policy</span>
          <span className="hover:underline">Privacy Policy for Developers</span>
          <span className="hover:underline">Policy Settings</span>
        </div>

        <div className="flex justify-center py-4">
          <p>Play Games @ Minigames 2000-2026 Minigames</p>
        </div>
      </div>
    </div>
  );
};

export default Games;
