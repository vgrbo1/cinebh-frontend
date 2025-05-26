import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import React from "react";
import { useParams } from "react-router";
import { SeeAlsoList } from "../components/CardList/SeeAlsoList";
import { Layout } from "../components/Layout/Layout";
import { MovieDetailsContainer } from "../components/MovieDetailsContainer/MovieDetailsContainer";
import { ProjectionPanel } from "../components/ProjectionPanel/ProjectionPanel";
import { MovieDetailsSkeleton } from "../components/skeleton/MovieDetailsSkeleton/MovieDetailsSkeleton";
import { getMovieDetails } from "../services/movieService";

export const MovieDetails: React.FC = () => {
  const { movieId } = useParams();

  if (!movieId) {
    return <div>Movie ID is required</div>;
  }

  const { data: movie, status } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  });

  if (status === "pending") {
    return (
      <Layout>
        <MovieDetailsSkeleton />;
      </Layout>
    );
  }

  if (status === "error") {
    return <div>Error loading movie details</div>;
  }

  const now = new Date();
  const projectionStartDate = new Date(
    movie.projectionStartDate[0],
    movie.projectionStartDate[1] - 1,
    movie.projectionStartDate[2]
  );
  const isUpcoming = projectionStartDate > now;

  return (
    <Layout>
      <div className="px-24 py-6 font-primary">
        <h2 className="text-2xl font-bold mb-6 text-primary">Movie Details</h2>
        <div className="flex flex-col h-[500px] lg:flex-row gap-6 w-full">
          <div className="w-1/2 overflow-hidden rounded-tl-2xl rounded-bl-2xl">
            <iframe
              className="w-full h-full rounded-tl-2xl rounded-bl-2xl"
              src={movie.trailerUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/2 grid grid-cols-2 gap-4">
            {movie.stills.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={image}
                className={clsx("w-full h-full object-cover", {
                  "rounded-tr-2xl": index === 1,
                  "rounded-br-2xl": index === 3,
                })}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row py-8 gap-6">
          <div className="w-full lg:w-1/2">
            <MovieDetailsContainer movie={movie} />
          </div>
          <div className="w-full lg:w-1/2 pl-2">
            {isUpcoming ? (
              <div className="h-[528px] rounded-2xl shadow-md p-6 bg-white space-y-6 font-primary shadow-light-400">
                <h3 className="text-primary text-2xl text-center font-bold">
                  {movie.title} is coming on{" "}
                  {projectionStartDate.toLocaleDateString()}!
                </h3>
              </div>
            ) : (
              <ProjectionPanel movieId={movie.id} />
            )}
          </div>
        </div>
        <SeeAlsoList />
      </div>
    </Layout>
  );
};
