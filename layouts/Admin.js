import React, { useEffect } from "react";
import { useRouter } from "next/router";
import cookies from "nookies"

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { withAuthorization } from "utils/withAuthorization";


const Admin = ({ children }) => {
  const { token } = cookies.get(children);
  const router = useRouter();
  
  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
      return <h2>Loading...</h2>
    }
  })
  return (
    <>
      <Sidebar />   
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export default withAuthorization(Admin)