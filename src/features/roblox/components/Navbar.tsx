import { Icon } from "@iconify/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import image from "../../assets/images/Roblox/Logo.png";
import { Modal } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { dummyCategories, topics } from "../../../assets/data/dummydata/Roblox";

const SALES_TYPES = ["All", "Limited"] as const;
type SalesType = (typeof SALES_TYPES)[number];

export default function Navbar() {
  const [open, setOpen] = useState(null);
  const [category, setCategory] = useState("All");
  const [creatorMode, setCreatorMode] = useState("All Creators");
  const [creatorName, setCreatorName] = useState("");
  const [priceMode, setPriceMode] = useState("Any Price");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("Relevance");
  const [unavailable, setUnavailable] = useState("Hide");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [tempCategory, setTempCategory] = useState(category);
  const [tempSubcategory, setTempSubcategory] = useState<string | null>(
    selectedSubcategory
  );
  const [tempCreatorMode, setTempCreatorMode] = useState(creatorMode);
  const [tempCreatorName, setTempCreatorName] = useState(creatorName);
  const [tempPriceMode, setTempPriceMode] = useState(priceMode);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempSortBy, setTempSortBy] = useState(sortBy);
  const [salesType, setSalesType] = useState<SalesType>("All");
  const [tempSalesType, setTempSalesType] = useState<SalesType>("All");

  const [tempUnavailable, setTempUnavailable] = useState(unavailable);
  const [cartOpen, setCartOpen] = useState(false);
  const isCategoryActive = category !== "All";
  const isCreatorActive =
    creatorMode === "Creator Name" && creatorName.trim() !== "";
  const isPriceActive =
    priceMode === "Custom" && (minPrice !== "" || maxPrice !== "");
  const isSortActive = sortBy !== "Relevance";
  const isSalesActive = salesType !== "All";
  const isUnavailableActive = unavailable !== "Hide";
  const { cart, removeFromCart } = useCart();
  const salesLabel = salesType === "Limited" ? "Limited" : "Sales Type";

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.string().required("age is required"),
    address: Yup.string().required("address is required"),
    gender: Yup.string().required("gender is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Too short")
      .max(10, "Too long")
      .required("Phone number is required"),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log("Form Data:", values);
    localStorage.setItem("Form Data", JSON.stringify(values));
    setOpen(null);
  };

  const toggle = (key: any) => {
    if (key === "sales" && open !== "sales") {
      setTempSalesType(salesType);
    }
    setOpen(open === key ? null : key);
  };

  return (
    <div className="">
      <div className="bg-white fixed z-10 text-gray-900">
        <nav className="h-[50px] border-b flex bg-gray-100 items-center px-4 gap-6">
          <div className="font-bold">
            <img className="w-[38px]" src={image} alt="" />
          </div>

          <div className="flex items-center gap-[60px] text-[20px]">
            <span className="font-semibold hover:underline pl-3">Charts</span>
            <span className="font-semibold hover:underline">Marketplace</span>
            <span className="font-semibold hover:underline">Create</span>
            <span className="font-semibold hover:underline">Robux</span>

            <div className="relative">
              <input
                className="w-[400px] bg-gray-200 border-2 border-gray-300 rounded-md pl-10 px-3 py-2 text-sm focus:outline-gray-400"
                placeholder="Search"
              />
              <span className="absolute left-2 top-2 text-gray-400">
                <Icon icon="material-symbols:search" width="24" height="24" />
              </span>
            </div>
          </div>

          <div className="ml-[340px] flex text-[18px] gap-3">
            <button className="inline-flex justify-center text-white rounded-xl px-3 py-1 bg-blue-600 font-medium hover:bg-blue-700">
              Sign Up
            </button>

            <button className="border border-gray-700 text-gray-700 px-3 py-1 rounded-xl hover:text-black">
              Log In
            </button>
          </div>
        </nav>

        <div className="pt-7 pb-4">
          <div className="flex items-center gap-4 mb-2">
            <p className="text-[40px] font-bold px-6">Marketplace</p>
            <div className="ml-[400px] flex gap-5">
              <div className="relative">
                <input
                  className="w-96 bg-gray-100 border-2 pl-[40px] h-[48px] border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-gray-400"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-2 top-3 text-gray-400">
                  <Icon icon="material-symbols:search" width="24" height="24" />
                </span>
              </div>

              <div className="relative w-[250px]">
                <div
                  onClick={() => toggle("topCategory")}
                  className={`border-2 border-gray-400 rounded-xl px-3 py-3 text-sm flex justify-between items-center cursor-pointer bg-white ${
                    open === "topCategory" ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <span>{category}</span>
                  <Icon icon="mdi:chevron-down" className="text-xl" />
                </div>

                <Modal
                  open={open === "topCategory"}
                  onClose={() => setOpen(null)}
                  BackdropProps={{ invisible: true }}
                >
                  <div
                    className="fixed inset-0 z-50"
                    onClick={() => setOpen(null)}
                  >
                    <div
                      className="absolute mt-2 w-[250px] bg-white rounded-xl shadow-lg border"
                      style={{
                        top: 120,
                        left: "76.6%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div
                        className={`${
                          dummyCategories.length > 5
                            ? "max-h-[250px] overflow-y-auto"
                            : ""
                        }`}
                      >
                        {dummyCategories.map((item) => (
                          <div
                            key={item.categoryId}
                            onClick={() => {
                              setCategory(item.category);
                              setOpen(null);
                            }}
                            className="px-4 py-3 cursor-pointer hover:rounded-xl hover:bg-gray-100"
                          >
                            <span className="text-lg text-gray-500 font-medium">
                              {item.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>

              <button
                className="bg-blue-600 h-11 text-white px-4 rounded-xl text-[18px] font-medium hover:bg-blue-700"
                onClick={() => toggle("buyRobux")}
              >
                Buy Robux
              </button>
              <Modal
                open={open === "buyRobux"}
                onClose={() => setOpen(null)}
                closeAfterTransition
                BackdropProps={{
                  style: { backgroundColor: "rgba(0,0,0,0.5)" },
                }}
              >
                <div
                  className="fixed inset-0 flex items-center justify-center z-50"
                  onClick={() => setOpen(null)}
                >
                  <div
                    className="bg-white rounded-2xl shadow-2xl w-[90%] px-9 py-[50px] max-w-md flex flex-col gap-4 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-2xl font-bold text-center mb-1">
                      Buy Robux
                    </h2>
                    <p className="text-center text-gray-500 font-semibold mb-3">
                      Fill in your details to complete the purchase
                    </p>

                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1">
                            <Field
                              as="input"
                              type="text"
                              name="name"
                              placeholder="Full Name"
                              className={`border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                touched.name && errors.name
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <Field
                              as="input"
                              type="email"
                              name="email"
                              placeholder="Email Address"
                              className={`border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                touched.email && errors.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <Field
                              as="input"
                              type="age"
                              name="age"
                              placeholder="Age"
                              className={`border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                touched.age && errors.age
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name="age"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <Field
                              as="select"
                              name="gender"
                              className={`border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                touched.gender && errors.gender
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </Field>

                            <ErrorMessage
                              name="gender"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <Field
                              as="input"
                              type="number"
                              name="phone"
                              placeholder="Phone Number"
                              className={`border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                touched.phone && errors.phone
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <Field
                              as="textarea"
                              name="address"
                              placeholder="Address"
                              rows="2"
                              className={`border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                touched.address && errors.address
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col gap-1 mt-3">
                            <button
                              type="submit"
                              className="bg-blue-600 text-white py-2 text-[16px] rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                              Submit
                            </button>

                            <button
                              onClick={() => setOpen(null)}
                              className="mt-2 self-center text-white py-2 text-[16px] bg-red-500 hover:bg-red-600 font-medium w-full px-4 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </Modal>

              <div className="flex items-center text-gray-600 hover:text-black p-2">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setCartOpen(true)}
                >
                  <Icon icon="mdi:cart-outline" width="34" />
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Modal
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            BackdropProps={{ invisible: true }}
          >
            <div
              className="fixed inset-0 flex justify-end pt-[130px] pr-6"
              onClick={() => setCartOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[450px] h-[590px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col"
              >
                <h2 className="text-2xl font-bold mb-3">
                  Shopping cart ({cart.length})
                </h2>

                <hr className="mb-4 border border-gray-300" />

                <div className="flex-1 overflow-y-auto space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        className="w-16 h-16 bg-gray-100 rounded-lg object-contain"
                        alt={item.title}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-600">🪙 {item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 font-bold hover:text-red-800"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold mb-3">
                      Total: {cart.length} items
                    </p>

                    <p className="text-lg font-semibold mb-3">
                      Total: 🪙{" "}
                      {cart.reduce((total, item) => total + item.price, 0)}
                    </p>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700">
                    Buy
                  </button>

                  <p className="text-md text-gray-500 mt-2">
                    Your balance after this transaction will be 🪙 0.
                  </p>
                </div>
              </div>
            </div>
          </Modal>

          <div className="flex gap-2 text-sm px-3 font-medium text-gray-600 relative">
            <div className="relative">
              <div
                onClick={() => {
                  if (category !== "All" || selectedSubcategory) {
                    setCategory("All");
                    setSelectedSubcategory(null);
                  } else {
                    toggle("category");
                  }
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-[100px] cursor-pointer ${
                  isCategoryActive || open === "category" || selectedSubcategory
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 hover:text-black"
                }`}
              >
                {category !== "All" || selectedSubcategory ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategory("All");
                      setSelectedSubcategory(null);
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[20px] font-medium">
                      {selectedSubcategory
                        ? `${selectedSubcategory}`
                        : category}
                    </span>
                    <span className="text-2xl">✕</span>
                  </span>
                ) : (
                  <>
                    <span className="text-[20px] font-medium">
                      {selectedSubcategory
                        ? `${selectedSubcategory}`
                        : category}
                    </span>
                    <Icon icon="mdi:chevron-down" className="text-3xl" />
                  </>
                )}
              </div>

              {open === "category" && (
                <div className="absolute top-[60px] left-0 w-[260px] bg-white rounded-xl shadow-lg border z-50">
                  <div className="flex justify-between items-center px-4 py-3 border-b">
                    <p className="font-bold text-xl text-black">Category</p>
                    <span
                      onClick={() => setOpen(null)}
                      className="cursor-pointer text-xl"
                    >
                      ✕
                    </span>
                  </div>

                  <div className="max-h-[240px] overflow-y-auto">
                    {dummyCategories.map((item) => (
                      <div key={item.categoryId}>
                        <div
                          onClick={() => {
                            setTempCategory(item.category);
                            setTempSubcategory(null);
                          }}
                          className="flex justify-between px-4 py-3 cursor-pointer hover:bg-gray-100"
                        >
                          <span
                            className={`text-lg font-medium ${
                              tempCategory === item.category
                                ? "text-black"
                                : "text-gray-500"
                            }`}
                          >
                            {item.category}
                          </span>
                          <span
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              tempCategory === item.category
                                ? "border-blue-600"
                                : "border-gray-300"
                            }`}
                          >
                            {tempCategory === item.category && (
                              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                            )}
                          </span>
                        </div>

                        {tempCategory === item.category &&
                          item.subcategories.length > 0 && (
                            <div className="ml-4 border-l border-gray-200 pl-2">
                              {item.subcategories.map((subcat) => (
                                <div
                                  key={subcat.subcategoryId || subcat.name}
                                  onClick={() => {
                                    setTempSubcategory(subcat.name);
                                  }}
                                  className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                  <span
                                    className={`text-lg ${
                                      tempSubcategory === subcat.name
                                        ? "text-black font-medium"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {subcat.name}
                                  </span>
                                  <span
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                      tempSubcategory === subcat.name
                                        ? "border-blue-600"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {tempSubcategory === subcat.name && (
                                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (tempCategory) setCategory(tempCategory);
                      if (tempSubcategory)
                        setSelectedSubcategory(tempSubcategory);
                      setOpen(null);
                    }}
                    className="w-[90%] mx-auto my-3 block py-3 rounded-lg font-semibold bg-blue-600 text-white"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => {
                  if (isCreatorActive) {
                    setCreatorMode("All Creators");
                    setCreatorName("");
                  } else {
                    toggle("creator");
                  }
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-[100px] cursor-pointer ${
                  isCreatorActive || open === "creator"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 hover:text-black"
                }`}
              >
                {isCreatorActive ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setCreatorMode("All Creators");
                      setCreatorName("");
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[20px]">
                      By {creatorName || creatorMode}
                    </span>
                    <span className="text-2xl">✕</span>
                  </span>
                ) : (
                  <>
                    <span className="text-[20px]">{creatorMode}</span>
                    <Icon icon="mdi:chevron-down" className="text-3xl" />
                  </>
                )}
              </div>

              {open === "creator" && (
                <div className="absolute top-[60px] w-[380px] bg-white rounded-xl shadow-lg z-50">
                  <div className="flex justify-between px-6 py-6">
                    <p className="text-2xl font-bold text-black">Creator</p>
                    <span
                      onClick={() => setOpen(null)}
                      className="cursor-pointer text-xl"
                    >
                      ✕
                    </span>
                  </div>

                  <div className="py-4 px-6 space-y-4">
                    <div
                      onClick={() => setTempCreatorMode("All Creators")}
                      className="flex justify-between cursor-pointer"
                    >
                      <p className="text-lg">All Creators</p>
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          tempCreatorMode === "All Creators"
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {tempCreatorMode === "All Creators" && (
                          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        value={tempCreatorName}
                        onChange={(e) => setTempCreatorName(e.target.value)}
                        placeholder="Creator Name"
                        className="border rounded-md px-3 py-2 w-full"
                        onFocus={() => setTempCreatorMode("Creator Name")}
                      />
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          tempCreatorMode === "Creator Name"
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {tempCreatorMode === "Creator Name" && (
                          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCreatorMode(tempCreatorMode);
                      setCreatorName(tempCreatorName);
                      setOpen(null);
                    }}
                    className="w-[90%] mx-auto mb-8 mt-3 block py-3 rounded-lg bg-blue-600 text-white"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => {
                  if (isPriceActive) {
                    setPriceMode("Any Price");
                    setMinPrice("");
                    setMaxPrice("");
                  } else {
                    toggle("price");
                  }
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-[100px] cursor-pointer ${
                  isPriceActive || open === "price"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 hover:text-black"
                }`}
              >
                {isPriceActive ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setPriceMode("Any Price");
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[20px]">
                      {minPrice || maxPrice
                        ? `🪙${minPrice} - 🪙${maxPrice}`
                        : priceMode}
                    </span>
                    <span className="text-2xl">✕</span>
                  </span>
                ) : (
                  <>
                    <span className="text-[20px]">
                      {minPrice || maxPrice
                        ? `🪙${minPrice} - 🪙${maxPrice}`
                        : priceMode}
                    </span>
                    <Icon icon="mdi:chevron-down" className="text-3xl" />
                  </>
                )}
              </div>

              {open === "price" && (
                <div className="absolute top-[60px] w-[450px] bg-white rounded-xl shadow-lg border z-50">
                  <div className="flex justify-between px-4 py-3 border-b">
                    <p className="font-bold text-xl text-black">Price</p>
                    <span
                      onClick={() => setOpen(null)}
                      className="cursor-pointer text-xl"
                    >
                      ✕
                    </span>
                  </div>

                  <div className="p-4 space-y-4">
                    <div
                      onClick={() => setTempPriceMode("Any Price")}
                      className="flex justify-between cursor-pointer"
                    >
                      <p className="text-lg">Any Price</p>
                      <span
                        className={`w-5 h-5 rounded-full border-2 mt-2 flex items-center justify-center ${
                          tempPriceMode === "Any Price"
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {tempPriceMode === "Any Price" && (
                          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                        )}
                      </span>
                    </div>

                    <div className="flex gap-3 mt-2">
                      <input
                        placeholder="Min"
                        value={tempMinPrice}
                        onChange={(e) => setTempMinPrice(e.target.value)}
                        onClick={() => setTempPriceMode("Custom")}
                        className="border rounded-md px-3 py-2 w-[200px]"
                      />
                      <input
                        placeholder="Max"
                        value={tempMaxPrice}
                        onChange={(e) => setTempMaxPrice(e.target.value)}
                        onClick={() => setTempPriceMode("Custom")}
                        className="border rounded-md px-3 py-2 w-[175px]"
                      />
                      <span
                        className={`w-5 h-5 rounded-full mt-2 border-2 flex items-center justify-center ${
                          tempPriceMode === "Custom"
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {tempPriceMode === "Custom" && (
                          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPriceMode(tempPriceMode);
                      setMinPrice(tempMinPrice);
                      setMaxPrice(tempMaxPrice);
                      setOpen(null);
                    }}
                    className="w-[90%] mx-auto mb-6 mt-3 block py-3 rounded-lg bg-blue-600 text-white"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => {
                  if (isSortActive) {
                    setSortBy("Relevance");
                  } else {
                    toggle("sort");
                  }
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-[100px] cursor-pointer ${
                  isSortActive || open === "sort"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 hover:text-black"
                }`}
              >
                {isSortActive ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortBy("Relevance");
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[20px]">Sort by {sortBy}</span>
                    <span className="text-2xl">✕</span>
                  </span>
                ) : (
                  <>
                    <span className="text-[20px]">Sort by {sortBy}</span>
                    <Icon icon="mdi:chevron-down" className="text-3xl" />
                  </>
                )}
              </div>

              {open === "sort" && (
                <div className="absolute top-[60px] w-[320px] bg-white rounded-xl shadow-lg border z-50">
                  <div className="flex justify-between px-4 py-3 border-b">
                    <p className="font-bold text-xl text-black">Sort By</p>
                    <span
                      onClick={() => setOpen(null)}
                      className="cursor-pointer text-xl"
                    >
                      ✕
                    </span>
                  </div>

                  {[
                    "Relevance",
                    "Most Favorited",
                    "Bestselling",
                    "Recently Published",
                    "Price (High to Low)",
                    "Price (Low to High)",
                  ].map((item) => (
                    <div
                      key={item}
                      onClick={() => setTempSortBy(item)}
                      className="flex justify-between px-4 py-3 cursor-pointer hover:bg-gray-100"
                    >
                      <p
                        className={`text-lg font-medium ${
                          tempSortBy === item ? "text-black" : "text-gray-500"
                        }`}
                      >
                        {item}
                      </p>
                      <span
                        className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                          tempSortBy === item
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {tempSortBy === item && (
                          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                        )}
                      </span>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setSortBy(tempSortBy);
                      setOpen(null);
                    }}
                    className="w-[90%] mx-auto my-3 block py-3 rounded-lg bg-blue-600 text-white"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => {
                  if (isSalesActive) {
                    setSalesType("All");
                  } else {
                    toggle("sales");
                  }
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-[100px] cursor-pointer ${
                  isSalesActive || open === "sales"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 hover:text-black"
                }`}
              >
                {isSalesActive ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSalesType("All");
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[20px]">{salesLabel}</span>
                    <span className="text-2xl">✕</span>
                  </span>
                ) : (
                  <>
                    <span className="text-[20px]">{salesLabel}</span>
                    <Icon icon="mdi:chevron-down" className="text-3xl" />
                  </>
                )}
              </div>

              {open === "sales" && (
                <div className="absolute top-[60px] w-[230px] bg-white rounded-xl shadow-lg border z-50">
                  <div className="flex justify-between px-6 py-6">
                    <p className="font-bold text-xl text-black">Sales Type</p>
                    <span
                      onClick={() => setOpen(null)}
                      className="cursor-pointer text-xl"
                    >
                      ✕
                    </span>
                  </div>

                  {SALES_TYPES.map((item) => (
                    <div
                      key={item}
                      onClick={() => setTempSalesType(item)}
                      className="flex justify-between px-6 py-4 cursor-pointer hover:bg-gray-100"
                    >
                      <p
                        className={`text-lg font-medium ${
                          tempSalesType === item
                            ? "text-black"
                            : "text-gray-500"
                        }`}
                      >
                        {item}
                      </p>
                      <span
                        className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                          tempSalesType === item
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {tempSalesType === item && (
                          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                        )}
                      </span>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setSalesType(tempSalesType);
                      setOpen(null);
                    }}
                    className="w-[90%] mx-auto mt-3 mb-6 block py-3 rounded-lg bg-blue-600 text-white"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => {
                  if (isUnavailableActive) {
                    setUnavailable("Hide");
                  } else {
                    toggle("unavailable");
                  }
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-[100px] cursor-pointer ${
                  isUnavailableActive || open === "unavailable"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 hover:text-black"
                }`}
              >
                {isUnavailableActive ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setUnavailable("Hide");
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[20px]">
                      {unavailable === "Hide"
                        ? "Unavailable Items"
                        : `${unavailable} Unavailable Items`}
                    </span>
                    <span className="text-2xl">✕</span>
                  </span>
                ) : (
                  <>
                    <span className="text-[20px]">
                      {unavailable === "Hide"
                        ? "Unavailable Items"
                        : `${unavailable} Unavailable Items`}
                    </span>
                    <Icon icon="mdi:chevron-down" className="text-3xl" />
                  </>
                )}
              </div>

              {open === "unavailable" && (
                <div className="absolute top-[60px] w-[310px] bg-white rounded-xl shadow-lg border z-50">
                  <div className="flex justify-between px-6 py-3">
                    <p className="font-bold text-xl text-black">
                      Unavailable Items
                    </p>
                    <span
                      onClick={() => setOpen(null)}
                      className="cursor-pointer text-xl"
                    >
                      ✕
                    </span>
                  </div>

                  {["Hide", "Show"].map((item) => (
                    <div
                      key={item}
                      onClick={() => setTempUnavailable(item)}
                      className="flex justify-between items-center px-6 py-3 cursor-pointer hover:bg-gray-100"
                    >
                      <p
                        className={`text-lg font-medium ${
                          tempUnavailable === item
                            ? "text-black"
                            : "text-gray-500"
                        }`}
                      >
                        {item}
                      </p>

                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          tempUnavailable === item
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {tempUnavailable === item && (
                          <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                        )}
                      </span>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setUnavailable(tempUnavailable);
                      setOpen(null);
                    }}
                    className="w-[90%] mx-auto mt-3 mb-6 block py-3 rounded-lg bg-blue-600 text-white"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6">
          <div className="relative w-full" style={{ maxWidth: "100vw" }}>
            <div
              className="flex gap-2 overflow-x-scroll mb-4 mr-[70px]"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {topics
                .filter((topic) => selectedTopics.includes(topic.displayName))
                .map((topic, index) => (
                  <span
                    key={topic.displayName + index}
                    onClick={() => toggleTopic(topic.displayName)}
                    className="inline-block flex-shrink-0 text-center px-5 py-2 rounded-full text-lg cursor-pointer bg-black text-white"
                    style={{ minWidth: "110px" }}
                  >
                    {topic.displayName} &nbsp; ✕
                  </span>
                ))}

              {topics
                .filter((topic) => !selectedTopics.includes(topic.displayName))
                .map((topic, index) => (
                  <span
                    key={topic.displayName + index}
                    onClick={() => toggleTopic(topic.displayName)}
                    className="inline-block flex-shrink-0 text-center px-5 py-2 rounded-full text-lg cursor-pointer bg-gray-200 text-black"
                    style={{ minWidth: "110px" }}
                  >
                    {topic.displayName}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[280px]">
        <Outlet context={{ category, selectedTopics, searchQuery }} />
      </div>

      <div className="mt-[80px]">
        <div className="flex justify-center gap-7 p-[50px] font-md text-[21px]">
          <p className="text-gray-600 hover:text-black cursor-pointer">
            About Us
          </p>
          <p className="text-gray-600 hover:text-black cursor-pointer">Blog</p>
          <p className="text-gray-600 hover:text-black cursor-pointer">Jobs</p>
          <p className="text-gray-600 hover:text-black cursor-pointer">
            Parents
          </p>
          <p className="text-gray-600 hover:text-black cursor-pointer">
            Buy Gift Cards
          </p>
          <p className="text-gray-600 hover:text-black cursor-pointer">Help</p>
          <p className="text-gray-600 hover:text-black cursor-pointer">Terms</p>
          <p className="text-gray-600 hover:text-black cursor-pointer">
            Accessbility
          </p>
          <p className="text-gray-600 hover:text-black cursor-pointer">
            Privacy
          </p>
          <p className="text-gray-600 hover:text-black cursor-pointer">
            Your Privacy Choices
          </p>
          <p className="text-gray-600 hover:text-black cursor-pointer">
            Sitemap
          </p>
        </div>

        <hr className="w-[85%] mx-auto mb-4 h-[2px] bg-gray-300 " />

        <p className="pt-3 p-4 flex justify-center text-[13px] font-semibold text-gray-600">
          ©2026 Roblox Corporation. Roblox, the Roblox logo and Powering
          Imagination are among our registered and unregistered trademarks in
          the U.S. and other countries.
        </p>
      </div>
    </div>
  );
}
