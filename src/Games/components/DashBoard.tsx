import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
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
import Facebook_img from "..//assets/Group (6).png";
import TIktok_img from "..//assets/Group (7).png";
import Youtube_img from "..//assets/Group (8).png";
import Twitter_img from "..//assets/Group (9).png";
import Game_Video from "..//assets/preview.mp4";
import { useEffect, useState } from "react";
import Dark_img from "..//assets/light-mode-78.png";
import Light_img from "..//assets/light-mode-79.png";

const dummydata = [
  {
    id: "1",
    img: Subway_Surfer_img,
    title: "Subway Surfer",
  },
  {
    id: "2",
    img: Snake_img,
    title: "Snake",
  },
  {
    id: "3",
    img: Temple_Run_img,
    title: "Temple Run",
  },
  {
    id: "4",
    img: Angry_Birds_img,
    title: "Angry Birds",
  },
  {
    id: "5",
    img: Hill_Climb_Racing_img,
    title: "Hill Climb Racing",
  },
  {
    id: "6",
    img: Car_racing_img,
    title: "Car racing",
  },
  {
    id: "7",
    img: Ludo_img,
    title: "Ludo",
  },
  {
    id: "8",
    img: Fruit_Ninja_img,
    title: "Fruit_Ninja",
  },
  {
    id: "9",
    img: Temple_Run_2_img,
    title: "Temple Run 2",
  },
  {
    id: "10",
    img: Minecraft_img,
    title: "Minecraft",
  },
  {
    id: "11",
    img: Angry_Birds_2_img,
    title: "Angry Birds 2",
  },
  {
    id: "12",
    img: Moto_3x_img,
    title: "Moto 3x",
  },
];

const DashBoard = () => {
  const user = JSON.parse(localStorage.getItem("userData") as string);
  const navigate = useNavigate();
  const [mode, setMode] = useState<"dark" | "light">("light");

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

  const handleNavigate = (id: string) => {
    navigate(`/games/${id}`);
  };

  return (
    <div className={mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}>
      <header className="flex justify-between items-center px-8 py-4 bg-black bg-opacity-70 backdrop-blur-md fixed top-0 left-0 w-full text-white font-bold z-30">
        <div className="font-bold text-2xl">ACENDA</div>
        <nav className="space-x-8 flex items-center text-md font-medium">
          <button className="hover:underline">Home</button>
          <button className="hover:underline">Games</button>
          <button className="hover:underline">Web Games</button>
          <button className="hover:underline">Contact</button>
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

      <div>
        <div className="text-[40px] pt-[80px] pb-[10px] px-[160px] font-bold flex justify-center">Games</div>
        <div className="grid grid-cols-4 gap-8 px-[160px]">
          {dummydata.map((item) => (
            <div key={item.id} className="mb-4 transition-transform duration-500 hover:scale-110">
              <div className="cursor-pointer relative w-[225px] h-[225px]" onClick={() => handleNavigate(item.id)}>
                <img className="w-full h-full rounded-[36px] mt-6 object-cover hover:opacity-0 transition-opacity duration-300" src={item.img} alt="" />
                <video
                  src={Game_Video}
                  muted
                  loop
                  playsInline
                  className="absolute top-0 left-0 w-full h-full rounded-xl object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
                <div className="w-[225px] flex justify-center mt-2 font-bold">
                  <p>{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black text-white p-10 mt-[100px]">
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

export default DashBoard;
