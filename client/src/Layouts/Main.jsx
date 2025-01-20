import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import TitleUpdater from "../Components/TitleUpdater";

function Main() {
  return (
    <div>
      <TitleUpdater />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main;
