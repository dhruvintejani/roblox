import image_1 from "../../assets/Notio/n-1.jpg";
import image_2 from "../../assets/Notio/n-3.jpg";
import image_3 from "../../assets/Notio/n-4.jpg";
import image_4 from "../../assets/Notio/n-5.jpg";
import image_5 from "../../assets/Notio/n-6.jpg";
import image_6 from "../../assets/Notio/n-2.jpg";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Modal } from "@mui/material";

const aiOptions = [
  {
    name: "Gemini 3 Pro",
    img: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
  },
  {
    name: "GPT-4",
    img: "https://cdn-icons-png.flaticon.com/512/12222/12222560.png",
  },
  {
    name: "Claude",
    img: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  },
  {
    name: "Custom AI",
    img: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
  },
];

const Products = () => {
  const [formData, setFormData] = useState({ message: "" });
  const [messages, setMessages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const [selectedAI, setSelectedAI] = useState(aiOptions[0]);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  console.log("🚀 ~ Products ~ selectedFile:", selectedFile)
  const [personalize, setPersonalize] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ message: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setMessages((p) => [...p, formData.message]);
    setFormData({ message: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="mx-[70px] overflow-hidden pt-6">
      <div className="flex items-center animate-slide gap-[10px] w-[300px]">
        <img src={image_1} />
        <img src={image_2} />
        <img src={image_3} />
        <img src={image_4} />
        <img src={image_5} />
      </div>

      {open && (
        <div className="mt-[70px] flex justify-center gap-10 animate-slideDown">
          <img src={image_6} className="h-[600px] rounded-lg shadow-lg" />

          <div className="w-[62%] bg-white rounded-3xl shadow-xl border flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon icon="fa-regular:comment" width={18} />
                <span>New AI chat</span>
                {/* <Icon
                  icon="material-symbols:keyboard-arrow-down-rounded"
                  width={18}
                /> */}
              </div>

              <div className="flex items-center gap-5">
                <div
                  className="flex items-center gap-2 text-sm cursor-pointer"
                  onClick={() => setPersonalize(!personalize)}
                >
                  <span>Personalize</span>
                  <div
                    className={`w-10 h-5 rounded-full relative transition ${
                      personalize ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition ${
                        personalize ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </div>
                </div>
                {/* <div className="flex items-center gap-3 text-gray-500">
                  <Icon icon="material-symbols:edit-outline" width={18} />
                  <Icon icon="material-symbols:autorenew" width={18} />
                  <Icon icon="material-symbols:crop-free" width={18} />
                  <Icon icon="material-symbols:open-in-full" width={18} />
                  <Icon icon="material-symbols:more-horiz" width={18} />
                </div> */}

                <button onClick={() => setOpen(!open)}>
                  <Icon
                    icon="material-symbols:close"
                    className="text-gray-400 cursor-pointer hover:text-black"
                    width={24}
                  />
                </button>
              </div>
            </div>

            <div className="flex-1 px-6 pt-4 pb-2 overflow-y-auto max-h-[420px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="mb-3 ml-auto w-fit max-w-[80%] tracking-wider break-words whitespace-pre-wrap text-md px-4 py-2 rounded-xl shadow bg-blue-500 text-white"
                >
                  {msg}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="px-4 py-3">
              <div className="rounded-2xl bg-white p-3 transition border border-blue-200 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]">
                {showContext && (
                  <div className="flex items-center justify-between bg-blue-50 text-blue-600 rounded-xl px-3 py-2 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="material-symbols:arrow-back-rounded"
                        width={18}
                      />
                      <span>
                        enhance user confidence in AI-driven responses
                      </span>
                    </div>
                    <Icon
                      icon="material-symbols:close-rounded"
                      width={18}
                      className="cursor-pointer"
                      onClick={() => setShowContext(false)}
                    />
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Ask AI anything"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full text-sm outline-none mb-3"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer hover:text-blue-500 transition">
                      <Icon
                        icon="material-symbols:attach-file-rounded"
                        width={20}
                      />
                      <input type="file" hidden onChange={handleFileChange} />
                    </label>

                    <div className="flex items-center gap-2 text-sm font-medium text-green-500 bg-green-100 py-[6px] px-4 rounded-xl">
                      <img src={selectedAI.img} className="w-4 h-4 rounded" />
                      {selectedAI.name}
                    </div>

                    <Icon
                      icon="material-symbols:language"
                      width={20}
                      className="cursor-pointer hover:text-blue-500 transition"
                    />

                    <Icon
                      icon="material-symbols:more-horiz"
                      width={20}
                      className="cursor-pointer hover:text-blue-500 transition"
                      onClick={() => setAiModalOpen(true)}
                    />
                  </div>

                  <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <Icon
                      icon="material-symbols:arrow-upward-rounded"
                      width={20}
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-center my-6">
        <button
          onClick={() => setOpen(!open)}
          className="px-10 py-3 rounded-full bg-gray-500 text-white hover:bg-black transition"
        >
          {open ? "SHOW LESS" : "SHOW MORE"}
        </button>
      </div>

      <Modal open={aiModalOpen} onClose={() => setAiModalOpen(false)}>
        <div
          className="bg-white rounded-2xl shadow-xl p-4 w-[260px]"
          style={{
            position: "absolute",
            bottom: "65px",
            left: "51%",
            transform: "translateX(-50%)",
          }}
        >
          {aiOptions.map((ai) => (
            <div
              key={ai.name}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedAI(ai);
                setAiModalOpen(false);
              }}
            >
              <img src={ai.img} className="w-5 h-5 rounded" />
              <span className="text-sm">{ai.name}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Products;
