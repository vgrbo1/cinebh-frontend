import clsx from "clsx";
import Marquee from "react-fast-marquee";

export function VenueButtonRowSkeleton() {
  const SKELETON_WIDTHS = [
    "w-24",
    "w-32",
    "w-28",
    "w-36",
    "w-20",
    "w-40",
    "w-30",
    "w-26",
    "w-34",
    "w-22",
  ];

  return (
    <Marquee
      speed={30}
      pauseOnHover={true}
      className="font-bold text-2xl font-primary py-10"
      autoFill={true}
    >
      {SKELETON_WIDTHS.map((width, index) => (
        <div key={index} className="mx-5">
          <div
            className={clsx(
              "rounded p-4 bg-gray-200 border border-gray-300 animate-pulse h-12",
              width
            )}
          ></div>
        </div>
      ))}
    </Marquee>
  );
}
