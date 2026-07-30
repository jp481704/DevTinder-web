import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connection";

const Connection = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connection) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (connection.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="card w-80 bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-xl text-center">
          <div className="card-body items-center">
            <span className="text-4xl">🤝</span>
            <h2 className="text-lg font-semibold">No connections yet</h2>
            <p className="text-sm text-base-content/60">
              Keep swiping — your matches will show up here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Your Connections</h1>
          <p className="text-sm text-base-content/50 mt-1">
            {connection.length} dev{connection.length === 1 ? "" : "s"} matched
            with you
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {connection.map((user) => {
            const {
              _id,
              firstName,
              lastName,
              age,
              gender,
              about,
              skills,
              photoUrl,
            } = user;
            const visibleSkills = skills?.slice(0, 4) || [];
            const extraSkills = (skills?.length || 0) - visibleSkills.length;

            return (
              <div
                key={_id}
                className="card sm:flex-row bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-xl rounded-3xl overflow-hidden hover:border-primary/40 transition-colors"
              >
                <figure className="sm:w-40 shrink-0 h-40 sm:h-auto">
                  <img
                    src={
                      photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt={firstName}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="card-body p-5 gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-lg font-bold leading-tight">
                        {firstName} {lastName}
                      </h2>
                      {age ? (
                        <span className="text-sm font-light text-base-content/50">
                          {age}
                        </span>
                      ) : null}
                    </div>
                    {gender && (
                      <span className="badge badge-sm badge-outline capitalize shrink-0">
                        {gender}
                      </span>
                    )}
                  </div>

                  {about && (
                    <p className="text-sm text-base-content/60 line-clamp-2">
                      {about}
                    </p>
                  )}

                  {visibleSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {visibleSkills.map((skill) => (
                        <span
                          key={skill}
                          className="badge badge-sm bg-primary/15 text-primary border-primary/30 capitalize"
                        >
                          {skill}
                        </span>
                      ))}
                      {extraSkills > 0 && (
                        <span className="badge badge-sm badge-ghost">
                          +{extraSkills}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="card-actions mt-3">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary bg-linear-to-r from-primary to-secondary border-none flex-1"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connection;
