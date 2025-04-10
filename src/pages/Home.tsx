import Carousel from "../components/Carousel";
import CurrentMovieList from "../components/CurrentMovieList";
import Layout from "../components/Layout";
import UpcomingMovieList from "../components/UpcomingMovieList";
import VenueButtonRow from "../components/VenueButtonRow";
import VenueList from "../components/VenueList";

function Home() {
  return (
    <Layout>
      <Carousel />
      <VenueButtonRow />
      <CurrentMovieList />
      <UpcomingMovieList />
      <VenueList />
    </Layout>
  );
}

export default Home;
