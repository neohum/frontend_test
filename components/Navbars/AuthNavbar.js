/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
import { isAuthenticated, handleSignout } from "utils/withAuthorization"

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
                simple time!
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <PagesDropdown />
              </li>
              { !isAuthenticated() && (
              <li className="mr-3">
                <Link href="/auth/register">
                  <a className="inline-block py-2 px-4 text-white font-bold no-underline">
                    회원가입
                  </a>
                </Link>
              </li>
            )}
              <li className="mr-3">
                { !isAuthenticated() && (
                  <Link href="/auth/login">
                  <a className="inline-block py-2 px-4 text-white font-bold no-underline">
                    login
                  </a>
                  </Link>
                )}
              </li>
              <li className="mr-3">
              { isAuthenticated() && (
                <Link href="/admin/dashboard">
                  <a className="inline-block py-2 px-4 text-white font-bold no-underline">
                    dashboard
                </a>
                </Link>
                )}
              </li>
              <li className="mr-3">
              { isAuthenticated() && (
                <Link href="/">
                  <a
                  className="inline-block py-2 px-4 text-white font-bold no-underline"
                  onClick={handleSignout}
                  >
                    logout
                </a>
                </Link>
              )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
