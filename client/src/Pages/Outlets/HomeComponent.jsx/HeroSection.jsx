import { Link } from "react-router-dom";
import PrimaryButton from "../../../Components/PrimaryButton";

function HeroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:p-12 shadow-xl lg:flex lg:flex-row-reverse ">
      <img
        src="/assets/images/HeroImage1.png"
        className="lg:w-1/2"
        alt="Hero"
      />
      <div className="w-full flex flex-col justify-center items-start p-6">
        <h1 className="text-5xl font-bold">
          Beauty Salon <br />
          For Every Women
        </h1>
        <p className="py-6">
          Lorem ipsum dolor sit amet, consectetur <br />
          adipiscing elit. Purus commodo ipsum duis <br />
          laoreet maecenas. Feugiat
        </p>
        <Link to="/services">
          {" "}
          <PrimaryButton>Get an Appointment</PrimaryButton>{" "}
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
