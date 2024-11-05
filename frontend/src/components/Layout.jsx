import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <>
      <header>
        <Header/>
      </header>
       {/* <Navbar/> */}
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
