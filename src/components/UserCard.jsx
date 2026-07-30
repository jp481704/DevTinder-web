const UserCard = ({ user, isTop, onIgnore, onInterested }) => {
  const { firstName, lastName, age, gender, about, skills, photoUrl } = user;

  console.log(user, "user card");

  const visibleSkills = skills?.slice(0, 3) || [];
  const extraSkills = (skills?.length || 0) - visibleSkills.length;

  return (
    <div
      className={`relative w-80 sm:w-96 h-[30rem] sm:h-[34rem] rounded-[2rem] overflow-hidden select-none transition-all duration-300 ${
        isTop
          ? "shadow-2xl shadow-black/40"
          : "pointer-events-none scale-95 opacity-70"
      }`}
    >
      {/* full-bleed photo — the photo IS the card */}
      <img
        src={
          photoUrl ||
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        }
        alt={firstName}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* scrims: soft at top for the pill, strong at bottom for the panel */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* gender pill */}
      {gender && (
        <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase text-white bg-white/15 backdrop-blur-md border border-white/25">
          {gender}
        </span>
      )}

      {/* frosted glass info panel */}
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <div className="rounded-[1.5rem] bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-lg">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-[1.7rem] font-bold text-white leading-tight tracking-tight">
              {firstName} {lastName}
            </h2>
            {age ? (
              <span className="text-xl font-light text-white/70">{age}</span>
            ) : null}
          </div>

          {about && (
            <p className="text-[13px] text-white/75 mt-1 line-clamp-2 leading-snug">
              {about}
            </p>
          )}

          {visibleSkills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {visibleSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-[11px] font-medium capitalize text-white bg-white/15 border border-white/20"
                >
                  {skill}
                </span>
              ))}
              {extraSkills > 0 && (
                <span className="px-3 py-1 rounded-full text-[11px] font-medium text-white/60 border border-white/15">
                  +{extraSkills} more
                </span>
              )}
            </div>
          )}
          <div>
            <p></p>
          </div>

          {/* actions inside the panel */}
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={onIgnore}
              aria-label="Ignore"
              className="btn flex-1 h-12 rounded-2xl border border-white/25 bg-white/10 hover:bg-error/90 hover:border-error text-white backdrop-blur-md shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="w-5 h-5"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <button
              type="button"
              onClick={onInterested}
              aria-label="Interested"
              className="btn flex-[2] h-12 rounded-2xl border-none bg-white text-neutral-900 hover:scale-[1.03] active:scale-95 shadow-xl gap-2 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-rose-500"
              >
                <path d="M12 21s-6.7-4.35-9.33-8.2C1.02 10.5 1.5 7.4 4 5.7c2.13-1.46 4.7-.98 6.2.9L12 8.4l1.8-1.8c1.5-1.88 4.07-2.36 6.2-.9 2.5 1.7 2.98 4.8 1.33 7.1C18.7 16.65 12 21 12 21z" />
              </svg>
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
