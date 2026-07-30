import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addRequest } from "../utils/request";

const Request = () => {
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(addRequest(request.filter((req) => req._id !== _id)));
      toast.success(
        status === "accepted" ? "Request accepted" : "Request rejected",
      );
    } catch (error) {
      toast.error(error?.response?.data || "Something went wrong");
      console.log(error);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (request.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="card w-80 bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-xl text-center">
          <div className="card-body items-center">
            <span className="text-4xl">📭</span>
            <h2 className="text-lg font-semibold">No pending requests</h2>
            <p className="text-sm text-base-content/60">
              When someone's interested in you, they'll show up here.
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
          <h1 className="text-2xl font-bold">Connection Requests</h1>
          <p className="text-sm text-base-content/50 mt-1">
            {request.length} dev{request.length === 1 ? "" : "s"} interested in
            you
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {request.map((req) => {
            const fromUser = req.fromUserId || {};
            const {
              firstName,
              lastName,
              age,
              gender,
              about,
              skills,
              photoUrl,
            } = fromUser;
            const visibleSkills = skills?.slice(0, 4) || [];
            const extraSkills = (skills?.length || 0) - visibleSkills.length;

            return (
              <div
                key={req._id}
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

                  <div className="card-actions mt-3 gap-2">
                    <button
                      onClick={() => reviewRequest("rejected", req._id)}
                      type="button"
                      className="btn btn-sm flex-1 border border-base-content/15 bg-base-100/40 hover:bg-error/90 hover:border-error hover:text-white"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => reviewRequest("accepted", req._id)}
                      type="button"
                      className="btn btn-sm flex-1 btn-primary bg-linear-to-r from-primary to-secondary border-none"
                    >
                      Accept
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

export default Request;
