import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="card w-80 bg-base-100/60 backdrop-blur-xl border border-base-content/10 shadow-xl text-center">
          <div className="card-body items-center">
            <span className="text-4xl">🎉</span>
            <h2 className="text-lg font-semibold">No new devs nearby</h2>
            <p className="text-sm text-base-content/60">
              Check back later for more matches.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[20vh] flex items-center justify-center py-10 px-4">
      <div className="relative w-80 sm:w-96">
        {feed
          .slice(0, 3)
          .reverse()
          .map((user, index, arr) => {
            const isTop = index === arr.length - 1;
            const depth = arr.length - 1 - index;
            return (
              <div
                key={user._id}
                className="absolute inset-0 transition-all duration-300"
                style={{
                  transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.05})`,
                  zIndex: index,
                  opacity: depth > 1 ? 0.6 : 1,
                }}
              >
                <UserCard user={user} isTop={isTop} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Feed;
