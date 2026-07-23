import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((store) => store.user);

  console.log(user, "jay");
  return (
    <div className="navbar sticky top-0 z-20 bg-base-100/70 backdrop-blur-xl border-b border-base-content/10 px-4 sm:px-6">
      {/* Logo */}
      <div className="flex-1">
        <a href="#" className="btn btn-ghost text-xl px-2 gap-2">
          <span className="w-8 h-8 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-sm shadow-md">
            ♥
          </span>
          <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-extrabold">
            DevTinder
          </span>
        </a>
      </div>

      {/* Profile dropdown */}
      {user && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar online"
            >
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <img alt="Your profile" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/90 backdrop-blur-xl rounded-box z-1 mt-3 w-52 p-2 shadow-2xl border border-base-content/10"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge badge-sm badge-primary">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a className="text-error">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
