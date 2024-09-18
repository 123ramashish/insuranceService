import { useState } from "react";

function Navbar() {
  const [active, setActive] = useState("Home");

  const navItems = ["Home", "SignUp", "Login", "Dashboard"];

  return (
    <nav className="flex justify-between items-center py-4 absolute top-0 w-full overflow-hidden z-40 bg-gray-300">
      <div className="flex space-x-6 ml-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase()}`}
            onClick={() => setActive(item)}
            className={`text-gray-700 ${
              active === item ? "text-blue-600" : "hover:text-blue-500"
            }`}
          >
            {item}
          </a>
        ))}
      </div>

      <div>
        <img
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full mr-8"
        />
      </div>
    </nav>
  );
}

export default Navbar;
