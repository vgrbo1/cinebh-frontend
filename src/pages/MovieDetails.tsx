import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { SeeAlsoList } from "../components/CardList/SeeAlsoList";
import { Layout } from "../components/Layout/Layout";

export const movieMedia = {
  videoUrl: "https://www.youtube.com/embed/PLl99DlL6b4",
  images: [
    {
      url: "https://image.tmdb.org/t/p/w500/jFkuJbWsciMwgcpOEkJIlxTElEp.jpg",
      alt: "Scene 1",
    },
    {
      url: "https://image.tmdb.org/t/p/w500/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
      alt: "Scene 2",
    },
    {
      url: "https://image.tmdb.org/t/p/w500/pNjh59JSxChQktamG3LMp9ZoQzp.jpg",
      alt: "Scene 3",
    },
    {
      url: "https://image.tmdb.org/t/p/w500/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
      alt: "Scene 4",
    },
  ],
};

const movieDetails = {
  title: "Avatar: The way of water",
  rating: "PG 13",
  language: "English",
  duration: "117 Min",
  projectionDate: "2023/07/04 - 2023/07/10",
  genres: ["Fantasy", "Action", "Adventure"],
  description: `Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home. Several years after the Na'vi repelled the RDA invasion Jake Sully and his family are living on Pandora. Things seem peaceful but the RDA has other plans, invading and capturing Pandora. Sully forms a guerrilla group to try to expel the invaders.`,
  director: "James Cameroon",
  writers: ["James Cameroon", "Rick Jaffa", "Amanda Silver"],
  cast: [
    { name: "Sam Worthington", role: "Jake" },
    { name: "Zoe Saldana", role: "Neytiri" },
    { name: "Sigourney Weaver", role: "Kiri" },
    { name: "Kate Winslet", role: "Ronal" },
    { name: "Stephen Lang", role: "Quaritch" },
    { name: "Cliff Curtis", role: "Tonowari" },
  ],
  ratings: [
    { label: "IMDB Rating", value: 9.7 },
    { label: "Rotten Tomatoes", value: 9.7 },
  ],
};

export const MovieDetails: React.FC = () => {
  return (
    <Layout>
      <div className="py-6 font-primary">
        <h2 className="text-2xl font-bold mb-6 text-primary">Movie Details</h2>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="w-1/2 aspect-video overflow-hidden rounded-tl-2xl rounded-bl-2xl">
            <iframe
              className="w-full h-full rounded-tl-2xl rounded-bl-2xl"
              src={movieMedia.videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="w-1/2 aspect-video grid grid-cols-2 gap-4">
            {movieMedia.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className={clsx("w-full h-full object-cover", {
                  "rounded-tr-2xl": index === 1,
                  "rounded-br-2xl": index === 3,
                })}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row py-8 justify-between gap-6">
          <div className="w-full lg:w-1/2 space-y-3">
            <h1 className="text-px-32 font-bold text-primary">
              {movieDetails.title}
            </h1>

            <div className="text-base text-primary space-x-3">
              <span className="border-secondary border-r-2 pr-3">
                {movieDetails.rating}
              </span>
              <span className="border-secondary border-r-2 pr-3">
                {movieDetails.language}
              </span>
              <span className="border-secondary border-r-2 pr-3">
                {movieDetails.duration}
              </span>
              <span>Projection date: {movieDetails.projectionDate}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {movieDetails.genres.map((genre) => (
                <span className="bg-customGray text-sm text-customDarkCyanBlue px-2 py-1.5 rounded-lg font-normal">
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-base text-primary leading-relaxed">
              {movieDetails.description}
            </p>

            <div className="mt-6 text-base space-y-3">
              <div>
                <span className="text-customDarkGray">Director:</span>{" "}
                <span className="text-primary">{movieDetails.director}</span>
              </div>
              <div>
                <span className="text-customDarkGray">Writers:</span>{" "}
                <span className="text-primary">
                  {movieDetails.writers.join(", ")}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-customDarkGray border-l-2 border-secondary pl-2 mb-3">
                Cast
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movieDetails.cast.map((actor) => (
                  <div key={actor.name}>
                    <p className="font-semibold text-sm text-customDarkBlue">
                      {actor.name}
                    </p>
                    <p className="text-xs text-customDarkGray">{actor.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-customDarkGray border-l-2 border-secondary pl-2 mb-6">
                Rating
              </h3>
              <div className="flex gap-4">
                <div className="border border-customGray rounded-lg flex px-6 py-4 items-center">
                  <FontAwesomeIcon
                    className="text-secondary text-base"
                    icon={faStar}
                  ></FontAwesomeIcon>
                  <div className="flex flex-col ml-2">
                    <p className="text-customDarkBlue text-sm">9.7</p>
                    <p className="text-customDarkGray text-xs">IMDB rating</p>
                  </div>
                </div>
                <div className="border border-customGray rounded-lg flex px-6 py-4 items-center">
                  <FontAwesomeIcon
                    className="text-secondary text-base"
                    icon={faStar}
                  ></FontAwesomeIcon>
                  <div className="flex flex-col ml-2">
                    <p className="text-customDarkBlue text-sm">9.7</p>
                    <p className="text-customDarkGray text-xs">
                      Rotten Tomatoes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">Container</div>
        </div>
        <SeeAlsoList />
      </div>
    </Layout>
  );
};
