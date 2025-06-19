import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useLocation } from "react-router";
import { CurrentMovieList } from "../components/CardList/CurrentMovieList";
import { UpcomingMovieList } from "../components/CardList/UpcomingMovieList";
import { VenueList } from "../components/CardList/VenueList";
import { Carousel } from "../components/Carousel/Carousel";
import { Layout } from "../components/Layout/Layout";
import { VenueButtonRow } from "../components/VenueButtonRow/VenueButtonRow";

export function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successParam = queryParams.get("success");

  const [isDialogOpen, setIsDialogOpen] = useState(successParam === "true");

  return (
    <Layout>
      <Carousel />
      <VenueButtonRow />
      <CurrentMovieList />
      <UpcomingMovieList />
      <VenueList />
      <div>
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Portal>
            <Dialog.Content className="fixed font-primary left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4 rounded-md bg-white p-8 ">
              <h2 className="text-xl font-bold text-primary mb-4">
                Payment Successful!
              </h2>
              <p className="text-center max-w-sm text-sm text-customDarkGray">
                The receipt and ticket have been sent to your email. You may
                retrieve them later from your User Profile.
              </p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </Layout>
  );
}
