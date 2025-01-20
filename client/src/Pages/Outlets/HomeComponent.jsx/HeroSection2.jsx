import HeroImage from "../../../assets/images/engin-akyurt-g-m8edc4x6q-unsplash_1.jpg";

function HeroSection2() {
  return (
    <div className="flex flex-col lg:flex-row p-8 lg:gap-12 shadow-xl">
      <div className="flex-1">
        <img
          src={HeroImage}
          alt="Professional Treatment"
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
      <div className="flex-1 lg:pl-8">
        <h2 className="text-4xl font-bold mb-4">
          Let us handle your skin{" "}
          <span className="text-primary">Professionally</span>.
        </h2>
        <p className="mb-6">
          With well-written codes, we build amazing apps for all platforms,
          mobile and web apps in general. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Purus commodo ipsum.
        </p>
        <div className="flex justify-around">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary">500+</h3>
            <p className="text-gray-500">Happy Customer</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary">16+</h3>
            <p className="text-gray-500">Total Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection2;
