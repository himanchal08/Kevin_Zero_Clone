import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const menuItems = [
    { name: "Solutions", hasDropdown: true },
    { name: "Resources", hasDropdown: true },
    { name: "Partners", hasDropdown: false },
    { name: "Pricing", hasDropdown: false },
    { name: "Company", hasDropdown: true },
  ];

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-[99]">
      <div className="bg-[#ffffff] fixed top-[1.2rem] left-[50%] right-auto h-[3.6rem] rounded-[12rem] translate-x-[-50%] whitespace-nowrap text-[#5f5f5f] font-medium text-sm">
        <div className="grid items-center justify-around grid-flow-col h-full gap-10">
          <div className="flex h-full items-center px-[10px]">
            <span className="font-bold text-black">KELVIN</span>ZERO
          </div>
          <div className="flex h-full items-center">
            <ul className="flex items-center gap-[15px]">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => {
                    if (item.hasDropdown) handleMouseEnter(index);
                  }}
                  onMouseLeave={() => {
                    if (item.hasDropdown) handleMouseLeave();
                  }}
                  className="relative"
                >
                  <a
                    href="#"
                    className="flex items-center hover:text-[#324ff4] transition-colors duration-300"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <>
                        {hoveredIndex === index ? (
                          <RiArrowDropUpLine />
                        ) : (
                          <RiArrowDropDownLine />
                        )}
                      </>
                    )}
                  </a>

                  {/* Dropdown Content */}
                  {item.hasDropdown && (
                    <div
                      className={`absolute top-[1.1rem] left-[0rem] h-[220px] w-[220px] bg-transparent p-3 rounded-[1.3rem] ${
                        hoveredIndex === index
                          ? "visible opacity-100"
                          : "invisible opacity-0"
                      } transition-opacity duration-400`}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="relative top-4 left-0 bg-white p-6 rounded-[1.3rem]">
                        {index === 0 && (
                          <>
                            <h2 className="my-2 font-bold text-[#303037]">
                              Workforce
                            </h2>
                            <hr />
                            <ul className="my-3">
                              <li>
                                <a href="#">Passwordless</a>
                              </li>
                              <li>
                                <a href="#">Remote Authentication</a>
                              </li>
                              <li>
                                <a href="#">Physical Access</a>
                              </li>
                            </ul>
                            <h2 className="my-2 font-bold text-[#303037]">
                              Customer
                            </h2>
                            <hr />
                            <ul>
                              <li>
                                <a href="#">Passwordless</a>
                              </li>
                            </ul>
                          </>
                        )}

                        {index === 1 && (
                          <>
                            <h2 className="my-2 font-bold text-[#303037]">
                              Resources
                            </h2>
                            <ul className="my-3">
                              <li>
                                <a href="#">API Docs</a>
                              </li>
                              <li>
                                <a href="#">Tutorials</a>
                              </li>
                              <li>
                                <a href="#">Community</a>
                              </li>
                            </ul>
                          </>
                        )}

                        {index === 4 && (
                          <>
                            <h2 className="my-2 font-bold text-[#303037]">
                              Company
                            </h2>
                            <ul className="my-3">
                              <li>
                                <a href="#">Careers</a>
                              </li>
                              <li>
                                <a href="#">Press</a>
                              </li>
                              <li>
                                <a href="#">Contact</a>
                              </li>
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Multi-Pass Button with Hover Effect */}
            <div className="flex h-full items-center gap-[10px] px-1">
              <a href="#" className="mx-5 text-[15px]">
                FR
              </a>
              <div className="relative h-[3rem] w-[150px] bg-[#324ff4] text-white flex items-center justify-center px-4 rounded-[12rem] cursor-pointer overflow-hidden group">
                {/* Background Hover Animation */}
                <div className="absolute inset-0 bg-[#4860f7] transform translate-y-full transition-transform duration-500 group-hover:translate-y-0 rounded-[20%]"></div>

                {/* First Text */}
                <span className="relative z-10 transition-all duration-500 transform group-hover:translate-y-[-100%] opacity-100 group-hover:opacity-0">
                  Try Multi-Pass
                </span>

                {/* Second Text */}
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 transform translate-y-[100%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  Try Multi-Pass
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
