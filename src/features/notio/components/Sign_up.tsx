import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData") as string);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.name) errors.name = "Name is required";
      if (!values.age) errors.age = "Age is required";
      if (!values.gender) errors.gender = "Gender is required";

      if (!values.email) errors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(values.email))
        errors.email = "Invalid email";

      if (!values.phone) errors.phone = "Phone number is required";
      else if (values.phone.length !== 10)
        errors.phone = "Must be 10 digits";

      if (!values.password) errors.password = "Password is required";
      else if (values.password.length < 8)
        errors.password = "Minimum 8 characters required";

      return errors;
    },
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
      navigate("/");
    },
  });

  return (
    <div className="dark:bg-black">
      <div className="flex items-center pt-7 min-h-screen justify-center bg-gradient-to-br px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white dark:bg-neutral-900 w-full max-w-md p-8 rounded-2xl shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {user ? "Log in" : "Sign Up"}
        </h2>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-neutral-800
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-neutral-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={formik.handleChange}
            value={formik.values.age}
            className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-neutral-800
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-neutral-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.age && formik.errors.age && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.age}</p>
          )}
        </div>

        <div>
          <select
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
            className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-neutral-800
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-neutral-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.gender}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-neutral-800
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-neutral-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            maxLength={10}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                formik.handleChange(e);
              }
            }}
            value={formik.values.phone}
            className="w-full px-4 py-3 border rounded-xl bg-white dark:bg-neutral-800
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-neutral-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full px-4 py-3 border rounded-xl pr-12
              bg-white dark:bg-neutral-800
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-neutral-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2
              text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl
            bg-gradient-to-r from-blue-500 to-purple-600
            text-white font-semibold hover:opacity-90 transition"
        >
          {user ? "Log in" : "Sign Up"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
