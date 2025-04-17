import AboutImage from "../assets/AboutImage.jpg";
import { Layout } from "../components/Layout/Layout";
export function About() {
  return (
    <Layout>
      <div className="mx-auto px-14 py-16 font-primary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-2xl font-bold mt-24">
            <h5>About Our Dream.</h5>
            <h5>Our History.</h5>
            <h5>Cinema.</h5>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-6xl font-bold mb-10">About Us</h1>

            <p>Welcome to Cinebh, where movie magic comes to life.</p>
            <p>
              At Cinebh, we're not just about screening films; we're passionate
              about creating unforgettable cinematic experiences. Since our
              establishment, we've been dedicated to providing our audience with
              top-quality entertainment in a comfortable and welcoming
              environment.
            </p>
            <p className="mb-4">
              Our state-of-the-art facilities boast the latest in audiovisual
              technology, ensuring that every movie is presented with stunning
              clarity and immersive sound. From the latest blockbusters to
              timeless classics, our diverse selection of films caters to every
              taste and preference.
            </p>
            <p>
              As a hub for community entertainment, we take pride in being more
              than just a cinema. Join us at Cinebh and discover why we're not
              just your average movie theater—we're your destination for
              cinematic excellence and entertainment bliss.
            </p>
          </div>
        </div>
      </div>
      <img
        src={AboutImage}
        alt="About Cinebh"
        className="w-full h-60 sm:h-80 md:h-[500px] object-cover"
      />
    </Layout>
  );
}
