import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const STACK_AVATARS = [
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/68.jpg",
];

const DEFAULT_AVATAR =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addSkill = () => {
    const value = skillInput.trim();
    if (value && !skills.includes(value)) {
      setSkills([...skills, value]);
    }
    setSkillInput("");
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/singup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender,
          about,
          photoUrl,
          skills,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data || res.data));
      toast.success("Account created successfully");
      return navigate("/");
    } catch (err) {
      toast.error(err?.response?.data || "Signup failed");
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
              Join the devs
              <br />
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                already shipping together.
              </span>
            </h1>
            <p className="mt-3 text-base-content/60">
              Build your profile, show off your stack, and start matching with
              developers nearby.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="avatar-group -space-x-4">
              {STACK_AVATARS.map((src, i) => (
                <div className="avatar" key={src}>
                  <div className="w-14 ring-2 ring-base-100">
                    <img src={src} alt={`dev ${i + 1}`} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-base-content/60">
              12,482 developers already matched this week
            </p>
          </div>

          <div className="card w-full max-w-sm bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-2xl">
            <div className="card-body p-5">
              <div className="flex items-center gap-3">
                <div className="avatar online">
                  <div className="w-14 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                    <img alt="dev avatar" src={photoUrl || DEFAULT_AVATAR} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">
                    {firstName || "Ada"} {lastName || "Lovelace"}
                    {age ? `, ${age}` : ""}
                  </p>
                  <p className="text-xs text-base-content/50 capitalize">
                    {gender || "full-stack dev"}
                  </p>
                </div>
              </div>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.slice(0, 4).map((tag, i) => (
                    <span
                      key={tag}
                      className={`badge badge-sm ${
                        [
                          "badge-primary",
                          "badge-secondary",
                          "badge-accent",
                          "badge-info",
                        ][i % 4]
                      } badge-outline capitalize`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-base-content/70 font-mono">
                  {"if (youKnowReact && lovesDarkMode) {"}
                  <br />
                  &nbsp;&nbsp;matchWithMe();
                  <br />
                  {"}"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right: signup card */}
        <div className="card w-full max-w-xl mx-auto bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-2xl">
          <div className="card-body">
            <div className="flex justify-center mb-2">
              <div className="avatar">
                <div className="w-16 rounded-2xl ring-2 ring-primary/50 ring-offset-2 ring-offset-base-100">
                  <img src={photoUrl || DEFAULT_AVATAR} alt="Your avatar" />
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center">
              Create your account
            </h2>
            <p className="text-sm mb-4 text-center text-base-content/50">
              Set up your profile and start matching
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="floating-label">
                  <span>First name</span>
                  <input
                    type="text"
                    placeholder="Ada"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full"
                    required
                  />
                </label>
                <label className="floating-label">
                  <span>Last name</span>
                  <input
                    type="text"
                    placeholder="Lovelace"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>

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
                    className="input input-bordered w-full pr-16"
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

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="floating-label">
                  <span>Age</span>
                  <input
                    type="number"
                    min="18"
                    placeholder="26"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="floating-label">
                  <span>Gender</span>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <label className="floating-label">
                <span>Photo URL</span>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="floating-label">
                <span>About</span>
                <textarea
                  placeholder="Hey there! I am using DevTinder."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={3}
                  className="textarea textarea-bordered w-full"
                />
              </label>

              <div>
                <label className="floating-label">
                  <span>Skills</span>
                  <input
                    type="text"
                    placeholder="Type a skill and press Enter"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    onBlur={addSkill}
                    className="input input-bordered w-full"
                  />
                </label>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="badge gap-1.5 border capitalize bg-primary/15 text-primary border-primary/30"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          aria-label={`Remove ${skill}`}
                          className="hover:opacity-60"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                Sign up
              </button>
            </form>

            <p className="text-center text-sm mt-4 text-base-content/50">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold link link-primary no-underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
