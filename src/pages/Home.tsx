import Carousel from "../components/Carousel";
import CurrentMovieListSection from "../components/CurrentMovieList";
import Layout from "../components/Layout";
import UpcomingMovieListSection from "../components/UpcomingMovieList";
import VenueListSection from "../components/VenueList";

function Home() {
  return (
    <Layout>
      <Carousel />
      <CurrentMovieListSection />
      <UpcomingMovieListSection />
      <VenueListSection />
    </Layout>
  );
}

export default Home;
