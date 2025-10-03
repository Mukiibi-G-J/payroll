"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowUpRight,
  List,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubmenu = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  return (
    <header className="">
      <div className="top-0 left-0 right-0 z-50 header headerAbsolute 2">
        <div className="flex justify-between items-center container text-s1 py-6">
          <div className="pb-1 flex justify-start items-center gap-3">
            <button
              className="lg:hidden text-3xl mobileMenuOpenButton"
              onClick={toggleMobileMenu}
            >
              <List className="w-6 h-6" />
            </button>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="accupay logo"
                width={120}
                height={40}
              />
            </Link>
          </div>

          {/* Desktop Menu Start */}
          <nav className="max-lg:hidden">
            <ul className="flex justify-center items-center gap-3">
              <li className="">
                <Link
                  href="/"
                  className="menu hover:header_menu_shadow duration-700 px-2 py-3 rounded-lg"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="group cursor-pointer relative">
                  <div className="flex justify-center items-center gap-1 relative px-2 py-3 rounded-lg hover:header_menu_shadow subMenuTitle">
                    Services
                    <ChevronDown className="w-4 h-4 pt-0.5 block group-hover:rotate-180 duration-700" />
                  </div>
                  <ul className="absolute top-12 left-0 pointer-events-none group-hover:eventunset flex justify-start items-start flex-col w-[200px] py-6 gap-3 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:z-50 bg-s1 text-white/80 rounded-lg group-hover:translate-y-0 group-hover:scale-100 translate-y-8 scale-75 duration-500">
                    <li>
                      <Link
                        href="/payroll-processing"
                        className="px-6 hover:ml-2 duration-500 hover:text-s2 subMenuItem"
                      >
                        Payroll Processing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/accounting-services"
                        className="px-6 hover:ml-2 duration-500 hover:text-s2 subMenuItem"
                      >
                        Accounting Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/taxation-services"
                        className="px-6 hover:ml-2 duration-500 hover:text-s2 subMenuItem"
                      >
                        Taxation Services
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:header_menu_shadow duration-700 px-2 py-3 rounded-lg menu"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:header_menu_shadow duration-700 px-2 py-3 rounded-lg menu"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:header_menu_shadow duration-700 px-2 py-3 rounded-lg menu"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:header_menu_shadow duration-700 px-2 py-3 rounded-lg menu"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:header_menu_shadow duration-700 px-2 py-3 rounded-lg menu"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          {/* Desktop Menu End */}

          <div className="flex justify-end items-center gap-2 sm:gap-6 xl:gap-10 font-medium max-sm:hidden">
            <div className="flex justify-between items-center gap-1">
              <Phone className="bg-s1 rounded-full text-s2 p-2 md:p-3 text-lg lg:text-2xl !leading-none" />
              <a href="tel:+123456789" className="max-xl:hidden">
                {" "}
                + 1234 567 865{" "}
              </a>
            </div>
            <Link
              href="/contact"
              className="flex justify-center max-sm:text-sm items-center gap-3 py-2 md:py-3 px-3 md:px-6 rounded-full bg-s2 border border-mainTextColor text-mainTextColor group font-medium"
            >
              Get Started
              <ArrowUpRight className="group-hover:rotate-[45deg] duration-500 text-base sm:text-xl lg:text-2xl !leading-[0]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Start */}
      <nav className="">
        <div
          className={`fixed top-0 left-0 bg-s1/80 h-full w-full lg:hidden duration-700 z-[998] mobileMenuBg ${
            isMobileMenuOpen ? "mobileMenuBgOpen" : "mobileMenuBgClose"
          }`}
        ></div>

        <div
          className={`flex justify-start flex-col items-start gap-8 pb-10 lg:gap-20 fixed lg:hidden top-0 left-0 w-3/4 min-[500px]:w-1/2 h-full bg-s2 overflow-y-auto duration-700 z-[999] mobileMenu ${
            isMobileMenuOpen ? "mobileMenuOpen" : "mobileMenuClose"
          }`}
        >
          <div className="flex justify-between items-center w-full p-4 sm:p-8">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={120}
                height={40}
              />
            </Link>
            <button
              className="!text-3xl cursor-pointer mobileMenuCloseButton"
              onClick={toggleMobileMenu}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ul className="text-lg sm:text-xl flex gap-6 lg:gap-10 items-start flex-col pl-8">
            <li>
              <Link href="/" className="menu-hover hover:after:border-p1">
                Home
              </Link>
            </li>
            <li>
              <div className="flex flex-col justify-start items-start group subMenuToggle">
                <div
                  className="flex justify-start items-center cursor-pointer"
                  onClick={() => toggleSubmenu("services")}
                >
                  <span>Services</span>
                  <ChevronRight
                    className={`!text-xl pl-1 pt-1 duration-500 ${
                      activeSubmenu === "services" ? "rotate-90" : ""
                    }`}
                  />
                </div>

                <ul
                  className={`pl-4 flex justify-start items-start flex-col gap-2 overflow-hidden duration-700 subMenu ${
                    activeSubmenu === "services"
                      ? "subMenuOpen"
                      : "subMenuClose"
                  }`}
                >
                  <li>
                    <Link href="/payroll-processing" className="text-base">
                      <span>-</span> Payroll Processing
                    </Link>
                  </li>
                  <li>
                    <Link href="/accounting-services" className="text-base">
                      <span>-</span> Accounting Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/taxation-services" className="text-base">
                      <span>-</span> Taxation Services
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link href="/about" className="menu-hover hover:after:border-p1">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="menu-hover hover:after:border-p1"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/faq" className="menu-hover hover:after:border-p1">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/team" className="menu-hover hover:after:border-p1">
                Team
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="menu-hover hover:after:border-p1"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Mobile Menu End */}
    </header>
  );
}
