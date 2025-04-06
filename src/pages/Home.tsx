import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { VenueListSection } from "../components/VenueList";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <VenueListSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
