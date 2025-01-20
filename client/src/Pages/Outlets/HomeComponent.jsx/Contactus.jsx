import PrimaryButton from "../../../Components/PrimaryButton";

function Contactus() {
  return (
    <div className="hero">
      <div className="hero-content flex-col gap-10 ">
        <div className="text-center ">
          <h1 className="text-2xl font-bold">
            Let us handle your <br /> project, professionally.
          </h1>
        </div>
        <div className="card w-full">
          <form className="card-body grid grid-cols-2">
            <div className="form-control ">
              <label className="label"></label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control ">
              <label className="label"></label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label"></label>
              <input
                type="email"
                placeholder="Email Adress"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label"></label>
              <input
                type="number"
                placeholder="Phone Number"
                className="input input-bordered"
                required
              />
            </div>
          </form>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Your Message"
          ></textarea>
        </div>
        <div className="text-center">
          <PrimaryButton>Send Message</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default Contactus;
