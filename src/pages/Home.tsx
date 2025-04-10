import Carousel from "../components/Carousel";
import CurrentMovieListSection from "../components/CurrentMovieList";
import Layout from "../components/Layout";
import UpcomingMovieListSection from "../components/UpcomingMovieList";
import VenueButtonRow from "../components/VenueButtonRow";
import VenueListSection from "../components/VenueList";

function Home() {
  return (
    <Layout>
      <Carousel />
      <VenueButtonRow />
      <CurrentMovieListSection />
      <UpcomingMovieListSection />
      <VenueListSection />
    </Layout>
  );
}

export default Home;
