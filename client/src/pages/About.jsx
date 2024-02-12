const About = () => {
  return (
    <main className="flex flex-col md:flex-row  max-w-7xl gap-6 mx-auto p-3">
      <div>
        <h1 className="text-3xl text-[#1f2249] font-bold md:mt-4 ">About Us</h1>
        <p className=" py-1 sm:text-xl">
          At Ghar.pvt.ltd, our mission is to provide our clients with
          exceptional real estate services that exceed their expectations. We
          are committed to helping our clients find their dream homes and
          achieve their real estate goals.
        </p>
        <h2 className="text-3xl text-[#1f2249] font-bold mt-4">Our Team</h2>
        <p className=" py-1 sm:text-xl">
          Our team of experienced and knowledgeable real estate professionals is
          dedicated to providing our clients with the highest level of service.
          We have a proven track record of success in helping our clients buy,
          sell, and rent properties.
        </p>
        <h2 className="text-3xl text-[#1f2249] font-bold mt-4">Our Services</h2>
        <ul className="flex flex-wrap  py-1 sm:text-xl list-disc">
          <li className="mx-6">Buying and selling homes</li>
          <li className="mx-6">Renting homes</li>
          <li className="mx-6">Commercial real estate</li>
          <li className="mx-6">Property management</li>
          <li className="mx-6">Mortgage services</li>
          <li className="mx-6">Title insurance</li>
          <li className="mx-6">Home inspections</li>
        </ul>
        <h2 className="text-3xl text-[#1f2249] font-bold mt-4">
          Our Commitment to Excellence
        </h2>
        <p className=" py-1 sm:text-xl">
          We are committed to providing our clients with the best possible
          experience. We are always available to answer your questions and
          provide you with the support you need. We will work hard to ensure
          that your real estate transaction is a success.
        </p>
      </div>
      <div>
        <h2 className="text-3xl text-[#1f2249] font-bold mt-4">Contact Us</h2>
        <p className=" py-1 sm:text-xl">
          If you are interested in learning more about our services, please
          contact us today. We would be happy to answer any questions you have
          and help you get started on your real estate journey.
        </p>
        <ul className=" py-1 sm:text-xl">
          <li>
            <strong className="mr-2">Phone:</strong> 977XXXXXXX
          </li>
          <li>
            <strong className="mr-2">Email:</strong> sharmavarun.1912@gmail.com
          </li>
          <li>
            <strong className="mr-2">Website:</strong>{" "}
            https://v4run-sharma.github.io/Portfolio_3D
          </li>
        </ul>
      </div>
    </main>
  );
};

export default About;
