import Nav from "@/components/fragments/dashboard/nav";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Nav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 ">
        {children}
      </div>
    </div>
  );
};

export default Layout;