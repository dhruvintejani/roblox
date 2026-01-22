import image_1 from "../../../assets/images/Notio/n-1.jpg";
import image_2 from "../../../assets/images/Notio/n-3.jpg";
import image_3 from "../../../assets/images/Notio/n-4.jpg";
import image_4 from "../../../assets/images/Notio/n-5.jpg";
import image_5 from "../../../assets/images/Notio/n-6.jpg";
import image_6 from "../../../assets/images/Notio/n-2.jpg";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Modal } from "@mui/material";
import type { ChatMessage } from "../interface/IHome";
import { aiOptions } from "../../../assets/data/dummydata/Notio";

const Products = () => {
  const [formData, setFormData] = useState({ message: "" });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const [selectedAI, setSelectedAI] = useState(aiOptions[0]);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [personalize, setPersonalize] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ message: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.message.trim() && selectedFiles.length === 0) return;

    setMessages((p) => [
      ...p,
      { text: formData.message, files: selectedFiles.length ? selectedFiles : undefined },
    ]);

    setFormData({ message: "" });
    setSelectedFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
    setSelectedFiles((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return (
    <div className="mx-[70px] overflow-hidden pt-6 bg-white dark:bg-neutral-950">
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

          <div className="w-[62%] bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-gray-200 dark:border-neutral-800 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                <Icon icon="fa-regular:comment" width={18} />
                <span>New AI chat</span>
              </div>

              <div className="flex items-center gap-5">
                <div
                  className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                  onClick={() => setPersonalize(!personalize)}
                >
                  <span>Personalize</span>
                  <div className={`w-10 h-5 rounded-full relative transition ${personalize ? "bg-blue-600" : "bg-gray-300 dark:bg-neutral-700"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition ${personalize ? "right-0.5" : "left-0.5"}`} />
                  </div>
                </div>

                <button onClick={() => setOpen(!open)}>
                  <Icon icon="material-symbols:close" className="text-gray-400 hover:text-black dark:hover:text-white" width={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 px-6 pt-4 pb-2 overflow-y-auto max-h-[420px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="mb-3 ml-auto w-fit max-w-[80%] px-4 py-3 rounded-xl shadow bg-blue-500 text-white space-y-2"
                >
                  {msg.text && <div className="text-md whitespace-pre-wrap">{msg.text}</div>}

                  {msg.files?.map((file, idx) => {
                    const url = URL.createObjectURL(file);

                    if (file.type.startsWith("image/")) {
                      return (
                        <div
                          key={idx}
                          className="flex justify-end cursor-pointer rounded-xl transition"
                          onClick={() => setPreviewImage(url)}
                        >
                          <img src={url} className="max-h-[200px] w-auto hover:opacity-90 object-cover" />
                        </div>
                      );
                    }

                    return (
                      <div key={idx} className="flex items-center justify-end gap-3 px-3 py-2 rounded-lg text-sm transition">
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon icon="material-symbols:description" width={20} />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <a href={url} download={file.name}>
                          <Icon icon="material-symbols:download" width={18} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="px-4 py-3 max-h-[200px]">
              <div className="rounded-2xl bg-white dark:bg-neutral-900 p-3 transition border border-blue-200 dark:border-blue-500/40 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]">
                {showContext && (
                  <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-xl px-3 py-2 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon icon="material-symbols:arrow-back-rounded" width={18} />
                      <span>enhance user confidence in AI-driven responses</span>
                    </div>
                    <Icon icon="material-symbols:close-rounded" width={18} className="cursor-pointer" onClick={() => setShowContext(false)} />
                  </div>
                )}

                {selectedFiles.length > 0 && (
                  <div className="mb-2 space-y-2">
                    {selectedFiles.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-100 dark:bg-neutral-800 rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-gray-100">
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon icon={file.type.startsWith("image/") ? "material-symbols:image" : "material-symbols:description"} width={18} />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <Icon icon="material-symbols:close-rounded" width={18} className="cursor-pointer" onClick={() => removeFile(i)} />
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Ask AI anything"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full text-sm outline-none mb-3 bg-transparent text-gray-900 dark:text-gray-100"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer hover:text-blue-500 transition text-gray-700 dark:text-gray-300">
                      <Icon icon="material-symbols:attach-file-rounded" width={20} />
                      <input type="file" multiple hidden onChange={handleFileChange} />
                    </label>

                    <div className="flex items-center gap-2 text-sm font-medium text-green-500 bg-green-100 dark:bg-green-900/30 py-[6px] px-4 rounded-xl">
                      <img src={selectedAI.img} className="w-4 h-4 rounded" />
                      {selectedAI.name}
                    </div>

                    <Icon icon="material-symbols:language" width={20} className="cursor-pointer hover:text-blue-500 transition text-gray-700 dark:text-gray-300" />
                    <Icon icon="material-symbols:more-horiz" width={20} className="cursor-pointer hover:text-blue-500 transition text-gray-700 dark:text-gray-300" onClick={() => setAiModalOpen(true)} />
                  </div>

                  <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <Icon icon="material-symbols:arrow-upward-rounded" width={20} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={`flex justify-center mb-6 ${open ? 'mt-6' : 'mt-[175px]'}`}>
        <button onClick={() => setOpen(!open)} className="px-10 py-3 rounded-full bg-gray-500 dark:bg-neutral-700 text-white hover:bg-black dark:hover:bg-neutral-900 transition">
          {open ? "SHOW LESS" : "SHOW MORE"}
        </button>
      </div>

      <Modal open={!!previewImage} onClose={() => setPreviewImage(null)}>
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="relative">
            {previewImage && <img src={previewImage} className="max-h-[90vh] max-w-[90vw] rounded-lg" />}
            <div className="absolute top-4 right-4 flex gap-3">
              <a href={previewImage ?? ""} download>
                <Icon icon="material-symbols:download" width={26} className="text-white cursor-pointer" />
              </a>
              <Icon icon="material-symbols:close" width={26} className="text-white cursor-pointer" onClick={() => setPreviewImage(null)} />
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={aiModalOpen} onClose={() => setAiModalOpen(false)}>
        <div
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-4 w-[260px]"
          style={{ position: "absolute", bottom: "65px", left: "51%", transform: "translateX(-50%)" }}
        >
          {aiOptions.map((ai) => (
            <div
              key={ai.name}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-800 dark:text-gray-100"
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
