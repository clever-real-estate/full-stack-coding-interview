"use client";

import ByPassLogin from "./middleware/ByPassLogin";

function Home() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div>Loading...</div>
    </div>
  );
}

export default ByPassLogin(Home);
