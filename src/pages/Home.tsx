import { CurrentMovieList } from "../components/CardList/CurrentMovieList";
import { UpcomingMovieList } from "../components/CardList/UpcomingMovieList";
import { VenueList } from "../components/CardList/VenueList";
import { Carousel } from "../components/Carousel/Carousel";
import { Layout } from "../components/Layout/Layout";
import { VenueButtonRow } from "../components/VenueButtonRow/VenueButtonRow";

export function Home() {
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
