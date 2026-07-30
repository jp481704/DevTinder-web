import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";

const SKILL_COLORS = [
  "bg-primary/15 text-primary border-primary/30",
  "bg-secondary/15 text-secondary border-secondary/30",
  "bg-accent/15 text-accent border-accent/30",
  "bg-info/15 text-info border-info/30",
];

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [skillInput, setSkillInput] = useState("");

  const dispatch = useDispatch();

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/Edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          gender,
          about,
        },
        { withCredentials: true },
      );

      console.log(res, "reswefwef ");
      toast.success("Update profile successfully");

      dispatch(addUser(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-start justify-center gap-10">
        {/* ---- Left: form ---- */}
        <form className="card w-full max-w-xl bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-2xl rounded-3xl">
          <div className="card-body gap-5">
            <div>
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <p className="text-sm text-base-content/50">
                Keep your info fresh so devs know who they're matching with.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="floating-label">
                <span>First name</span>
                <input
                  type="text"
                  placeholder="Ada"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
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
                />
              </label>
            </div>

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
              {skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, i) => (
                    <span
                      key={skill}
                      className={`badge gap-1.5 border capitalize ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
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

            <button
              onClick={handleUpdateProfile}
              className="btn btn-primary bg-linear-to-r from-primary to-secondary border-none mt-2"
            >
              Save Profile
            </button>
          </div>
        </form>

        {/* ---- Right: live preview ---- */}
        <div className="flex flex-col items-center gap-3 lg:sticky lg:top-24 shrink-0">
          <div className="flex items-center gap-2 text-sm text-base-content/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            Live preview — this is how others see you
          </div>
          <UserCard
            isTop={true}
            user={{
              firstName,
              lastName,
              age,
              gender,
              about,
              skills,
              photoUrl,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
