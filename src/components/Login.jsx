import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      toast.success("Logged in successfully");
      return navigate("/");
    } catch (err) {
      toast.error(err?.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-base-100 px-4 py-10 sm:py-16">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-base-100/70 via-base-100/85 to-base-100" />

      {/* glow blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary/30 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-center">
        {/* Left: pitch panel */}
        <div className="hidden lg:flex flex-col gap-6">
          <div>
            <div className="badge badge-primary badge-outline gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              made for developers
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-base-content">
              Swipe. Match.
              <br />
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Ship code together.
              </span>
            </h1>
            <p className="mt-3 text-base-content/60">
              Find your next co-founder, pair programmer, or partner in
              debugging.
            </p>
          </div>

          {/* Fake swipe card preview */}
          <div className="card w-full max-w-sm bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-2xl">
            <div className="card-body p-5">
              <div className="flex items-center gap-3">
                <div className="avatar online">
                  <div className="w-14 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                    <img
                      alt="dev avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Aditi, 26</p>
                  <p className="text-xs text-base-content/50">
                    Full-stack · Bengaluru
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-base-content/70 font-mono">
                {"if (youKnowReact && lovesDarkMode) {"}
                <br />
                &nbsp;&nbsp;matchWithMe();
                <br />
                {"}"}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {["React", "Node.js", "PostgreSQL", "Docker"].map((tag, i) => (
                  <span
                    key={tag}
                    className={`badge badge-sm ${
                      [
                        "badge-primary",
                        "badge-secondary",
                        "badge-accent",
                        "badge-info",
                      ][i % 4]
                    } badge-outline`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-5">
                <button
                  type="button"
                  className="btn btn-circle btn-outline btn-error btn-sm"
                >
                  ✕
                </button>
                <button
                  type="button"
                  className="btn btn-circle btn-primary btn-sm"
                >
                  ♥
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-base-content/40">
            12,482 developers matched this week
          </p>
        </div>

        {/* Right: auth card */}
        <div className="card w-full max-w-md mx-auto bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-2xl">
          <div className="card-body">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-lg">
                ♥
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center">
              {isSignup ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-sm mb-4 text-center text-base-content/50">
              {isSignup
                ? "Set up your profile and start matching"
                : "Log in to continue swiping"}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="floating-label">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="floating-label">
                <span>Password</span>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full  pr-16"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs link link-primary link-hover"
                  >
                    {showPassword ? "hide" : "show"}
                  </button>
                </div>
              </label>

              <button type="submit" className="btn btn-primary mt-2">
                {isSignup ? "Sign up" : "Login"}
              </button>
            </form>

            <p className="text-center text-sm mt-4 text-base-content/50">
              {isSignup ? "Already have an account?" : "New here?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignup((s) => !s)}
                className="font-semibold link link-primary no-underline"
              >
                {isSignup ? "Login" : "Create one"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
