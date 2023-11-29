import Link from "next/link";
import Image from "next/image";
export default function Header() {
  return (
    <div className="navbar  bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={2}
            className="menu menu-sm dropdown-content mt-3 z-[99] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <p>Dịch vụ</p>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <p>Tra cứu</p>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <p>Tin tức</p>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <p>Giới </p>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>

            <li>
              <a>Tuyển dụng</a>{" "}
            </li>
            <li>
              <a>Liên hệ</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Magic Post</a>
      </div>
      <div className="navbar-center hidden relative z-[99] lg:flex">
        <ul className="relative menu menu-horizontal px-1">
          <div className="dropdown dropdown-hover"> 
            <div tabIndex={0} role="button" className="btn m-1 bg-inherit border-none round-none text-cyan-500">
              Dịch vụ <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"> <path fill="#00f1f5" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            </div>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1 bg-inherit border-none round-none text-cyan-500">
              Tra cứu <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"> <path fill="#00f1f5" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            </div>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1 bg-inherit border-none round-none text-cyan-500">
              Giới thiệu <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"> <path fill="#00f1f5" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            </div>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn m-1 text-cyan-500 bg-inherit border-none round-none">
              Tuyển dụng
            </div>
          </div>

          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn m-1 text-cyan-500 bg-inherit border-none round-none">
             Liên hệ
            </div>
          </div>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="./login">
          <button className="btn">Log in</button>
        </Link>
      </div>
    </div>
  );
}
