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
        <div className="navbar-center relative z-[99] lg:flex">
          <ul className="relative menu menu-horizontal px-1">
            <li tabIndex={0}>
              <details>
                <summary>Dịch vụ</summary>
                <ul className="p-3 hover:order-first">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Tra Cứu</summary>
                <ul className="p-2 hover:order-last">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Tin tức</summary>
                <ul className="p-2 hover:order-last">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Giới thiệu</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Tuyển dụng</a>{" "}
            </li>
            <li>
              <a>Liên hệ</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="./login">
            <button className="btn">Log in</button>
          </Link>
        </div>
      </div>
  )
}