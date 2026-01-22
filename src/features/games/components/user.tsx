import User_img from "..//assets/User.jpg";
import Tooltip from "@mui/material/Tooltip";


const dummydata = [
  {
    id: "1",
    img: User_img,
    title: "Alice",
  },
  {
    id: "2",
    img: User_img,
    title: "Bob",
  },
  {
    id: "3",
    img: User_img,
    title: "Charlie",
  },
  {
    id: "4",
    img: User_img,
    title: "Diana",
  },
  {
    id: "5",
    img: User_img,
    title: "Ethan",
  },
  {
    id: "6",
    img: User_img,
    title: "Fiona",
  },
  {
    id: "7",
    img: User_img,
    title: "George",
  },
  {
    id: "8",
    img: User_img,
    title: "Hannah",
  },
  {
    id: "9",
    img: User_img,
    title: "Ian",
  },
  {
    id: "10",
    img: User_img,
    title: "Jasmine",
  },
  {
    id: "11",
    img: User_img,
    title: "Kyle",
  },
  {
    id: "12",
    img: User_img,
    title: "Lily",
  },
];

const Users = () => {
  return (
    <div>
        <header className="flex justify-between items-center px-8 py-4 bg-black bg-opacity-70 backdrop-blur-md fixed top-0 left-0 w-full text-white font-bold z-30">
        <div className="font-bold text-2xl">ACENDA</div>
        <nav className="space-x-8 flex items-center text-md font-medium">
          <button className="hover:underline">Home</button>
          <button className="hover:underline">Profile</button>
          <button className="hover:underline">Web Games</button>
          <button className="hover:underline">Contact</button>
        </nav>
      </header>
      <div className="text-[40px] pt-[100px] pb-[10px] px-[160px] font-bold flex justify-center">
        Profiles
      </div>
      <div className="grid grid-cols-4 gap-8 px-[160px]">
        {dummydata.map((item) => (
          <div
            key={item.id}
            className="mb-4 transition-transform duration-500 hover:scale-110"
          >
            <div className="cursor-pointer relative w-[225px] h-[225px]">
              <img
                className="w-full h-full rounded-xl object-cover "
                src={item.img}
                alt=""
              />

              <div className="w-[225px] flex justify-center mt-2 font-bold">
                <p>{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

        <div className="bg-black pb-6">
      <div className="flex py-10 justify-between">
        <div className="pl-[200px]">
          <h4 className="text-white font-bold text-[20px] mb-5">Support</h4>
          <div className="text-[#BFBFBF]">
            <p className="mb-2">Help Center</p>
            <p className="mb-2">Safety information</p>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-5">Company</h4>
          <div className="text-[#BFBFBF] mb-2">
            <p className="mb-2">
              <a
                href="#explore"
                className="hover:underline text-[16px] text-white"
              >
                Destinations
              </a>
            </p>
            <p className="mb-2">
              <a href="#Blog" className="hover:underline text-white">
                Top_Book
              </a>
            </p>
            <p className="mb-2">
              <a href="#feature" className="hover:underline text-white">
                feature_News
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-5">Contact</h4>
          <div className="text-[#BFBFBF] mb-2">
            <p className="mb-2">
              <a href="#contact" className="hover:underline mb-2 text-white">
                Get in touch
              </a>
            </p>
            <p className="mb-2">
              <a href="#whychooseus" className="hover:underline text-white">
                Why_Choose_Us
              </a>
            </p>
          </div>
        </div>

        <div className="pr-[200px]">
          <h4 className="text-white font-bold mb-5">Social</h4>
          {/* <div className="flex gap-4">
            <Tooltip title="FaceBook">
              <img src={Facbook_img} alt="" />
            </Tooltip>
            <Tooltip title="Twitter">
              <img src={Twiter_img} alt="" />
            </Tooltip>
            <Tooltip title="TikTok">
              <img src={Tiktok_img} alt="" />
            </Tooltip>
            <Tooltip title="YouTube">
              <img src={Youtube_img} alt="" />
            </Tooltip>
          </div> */}

          <div className="flex justify-center pt-[50px]">
            {/* <Tooltip title="Chatbox">
              <Icon
                className="text-white"
                onClick={() => setOpen(true)}
                icon="heroicons:chat-bubble-left-right"
                width="34"
              />
            </Tooltip> */}
          </div>
        </div>
      </div>

      <div className="px-[200px] mt-6 flex justify-between">
        <p className="font-[12px] text-[#8B8B8B]">© Copyright Acenda 2024</p>
        {/* <img src={Footer_imgs} alt="" /> */}
      </div>

     
    </div>
    </div>
  );
};

export default Users;
