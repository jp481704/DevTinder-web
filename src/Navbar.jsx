import React from 'react'

const Navbar = () => {
  return (
     <div className="navbar shadow-sm px-4 sm:px-6 border-b" style={{ backgroundColor: "#161B22", borderColor: "#21262D" }}>
      {/* Logo */}
      <div className="flex-1">
        <a
          href="#"
          className="btn btn-ghost text-lg sm:text-xl px-2 normal-case hover:bg-white/5"
          style={{ color: "#C9D1D9", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
        >
          <span style={{ color: "#3FB950" }}>~/</span>
          DevTinder
          <span className="inline-block w-[2px] h-5 ml-0.5 animate-pulse" style={{ backgroundColor: "#58A6FF" }} />
        </a>
      </div>
 
      {/* Profile dropdown */}
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div
              className="w-10 rounded-full ring ring-offset-2 ring-offset-[#161B22]"
              style={{ "--tw-ring-color": "#3FB950" }}
            >
              <img
                alt="Your profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border"
            style={{ backgroundColor: "#161B22", borderColor: "#21262D", color: "#C9D1D9" }}
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge badge-sm border-none text-white" style={{ backgroundColor: "#3FB950" }}>
                  New
                </span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a style={{ color: "#F85149" }}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar