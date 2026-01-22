import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Facebook_img from "../../assets/images/Group (6).png";
import TIktok_img from "../../assets/images/Group (7).png";
import Youtube_img from "../../assets/images/Group (8).png";
import Twitter_img from "../../assets/images/Group (9).png";
import { Icon } from "@iconify/react";
import { useState } from "react";
import image from "../../assets/images/User.jpg";
import { Popover, IconButton } from "@mui/material";
import { useThemeStore } from "../store/UseThemeStore";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [openModal, setOpenModal] = useState<HTMLElement | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();

  const hideFooterRoutes = ["/my_chatbox", "/shorts", "/videocall"];
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setOpenModal(null);
    navigate("/signup");
  };

  const handleOpenProfile = (e: React.MouseEvent<HTMLElement>) => {
    setOpenModal(e.currentTarget);
  };

  const open = Boolean(openModal);

  const activeClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-green-600"
      : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-600";

  return (
    <div className="bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-neutral-900 shadow dark:shadow-black/40">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 py-4 md:py-6">
          <p className="text-lg sm:text-xl md:text-2xl tracking-wider font-semibold">
            NOTIO
          </p>

          <nav className="hidden md:flex items-center gap-6 lg:gap-10 font-semibold">
            <NavLink to="/" className={activeClass}>HOME</NavLink>
            <NavLink to="/shorts" className={activeClass}>SHORTS</NavLink>

            {user && (
              <NavLink to="/my_chatbox" className={activeClass}>
                My Chatbox
              </NavLink>
            )}

            <NavLink to="/subscription" className={activeClass}>
              SUBSCRIPTION
            </NavLink>

            <NavLink to="/videocall" className={activeClass}>
              VIDEO CALL
            </NavLink>

            <NavLink to="/products" className={activeClass}>
              PRODUCTS
            </NavLink>

            {user ? (
              <IconButton
                onClick={handleOpenProfile}
                className="hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                <Icon
                  icon="mdi:account"
                  width={30}
                  className="text-gray-600 dark:text-gray-300"
                />
              </IconButton>
            ) : (
              <NavLink to="/signup" className={activeClass}>
                SIGN UP
              </NavLink>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              <Icon
                icon={theme === "dark" ? "mdi:weather-sunny" : "mdi:weather-night"}
                width={22}
                className="text-gray-700 dark:text-gray-200"
              />
            </button>

            <Icon
              icon="mdi:search"
              width={28}
              className="text-gray-700 dark:text-gray-300"
            />
          </nav>

          <div className="flex md:hidden items-center gap-3">
            {user && (
              <IconButton
                onClick={handleOpenProfile}
                className="hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                <Icon
                  icon="mdi:account"
                  width={26}
                  className="text-gray-600 dark:text-gray-300"
                />
              </IconButton>
            )}

            <IconButton
              onClick={() => setMobileMenu(true)}
              className="hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              <Icon
                icon="mdi:menu"
                width={28}
                className="text-gray-700 dark:text-gray-300"
              />
            </IconButton>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden fixed inset-0 bg-black/40 z-50">
            <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-neutral-900 p-6 flex flex-col gap-6 font-semibold">
              <button
                className="self-end text-gray-700 dark:text-gray-300"
                onClick={() => setMobileMenu(false)}
              >
                <Icon icon="mdi:close" width={24} />
              </button>

              <NavLink to="/" onClick={() => setMobileMenu(false)} className={activeClass}>HOME</NavLink>

              {user && (
                <NavLink to="/my_chatbox" onClick={() => setMobileMenu(false)} className={activeClass}>
                  My Chatbox
                </NavLink>
              )}

              <NavLink to="/subscription" onClick={() => setMobileMenu(false)} className={activeClass}>
                Subscription
              </NavLink>

              <NavLink to="/videocall" onClick={() => setMobileMenu(false)} className={activeClass}>
                VIDEO CALL
              </NavLink>

              <NavLink to="/products" onClick={() => setMobileMenu(false)} className={activeClass}>
                PRODUCTS
              </NavLink>

              {!user && (
                <NavLink to="/signup" onClick={() => setMobileMenu(false)} className={activeClass}>
                  Sign Up
                </NavLink>
              )}

              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
              >
                <Icon
                  icon={theme === "dark" ? "mdi:weather-sunny" : "mdi:weather-night"}
                  width={20}
                />
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mt-20 md:mt-18">
        <Outlet />
      </main>

      {!hideFooter && (
        <footer className="flex flex-wrap justify-center py-6 gap-4 px-4">
          <img src={Facebook_img} />
          <img src={Twitter_img} />
          <img src={TIktok_img} />
          <img src={Youtube_img} />
        </footer>
      )}

      <Popover
        open={open}
        anchorEl={openModal}
        onClose={() => setOpenModal(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: { xs: "90vw", sm: 320 },
            maxWidth: 360,
            borderRadius: "16px",
            boxShadow: 24,
            p: 0,
          },
        }}
      >
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <img src={image} className="w-12 h-12 rounded-full border" />
            <div>
              <h2 className="text-lg font-semibold dark:text-gray-400">{user?.name}</h2>
              <p className="text-sm text-gray-500">User Profile</p>
            </div>
          </div>

          <div className="border-t" />

          <div className="space-y-4 text-sm">
            <div className="flex justify-between dark:text-gray-400">
              <span>Age</span>
              <span>{user?.age}</span>
            </div>
            <div className="flex justify-between  dark:text-gray-400">
              <span>Gender</span>
              <span>{user?.gender}</span>
            </div>
            <div className="flex justify-between  dark:text-gray-400">
              <span>Email</span>
              <span className="truncate max-w-[180px]">{user?.email}</span>
            </div>
            <div className="flex justify-between  dark:text-gray-400">
              <span>Phone</span>
              <span>{user?.phone}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="p-2 text-red-500 font-medium hover:scale-110"
            >
              Logout
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Navbar;
