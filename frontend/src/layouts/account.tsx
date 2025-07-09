import { Outlet } from "react-router";

import Navbar from "../components/Navbar";

const AccountLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 md:px-10">
        <Outlet />
      </main>
    </>
  );
};

export default AccountLayout;
