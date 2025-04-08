import CurrentMovieListSection from "../components/CurrentMovieList";
import Layout from "../components/Layout";
import VenueListSection from "../components/VenueList";

function Home() {
  return (
    <Layout>
      <CurrentMovieListSection />
      <VenueListSection />
    </Layout>
  );
}

export default Home;
