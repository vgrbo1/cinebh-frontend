import clsx from "clsx";
import { CardSkeleton } from "../CardSkeleton/CardSkeleton";
import { SmallCardSkeleton } from "../SmallCardSkeleton/SmallCardSkeleton";

interface CardListSkeletonProps {
  title?: string;
  showSeeAll?: boolean;
  itemCount?: number;
  maxColumns?: 4 | 6;
  variant?: "default" | "small";
}

export function CardListSkeleton({
  title = "Loading...",
  showSeeAll = false,
  itemCount = 4,
  maxColumns = 4,
  variant = "default",
}: CardListSkeletonProps) {
  const gridCols = clsx(
    "grid",
    "grid-cols-1",
    "sm:grid-cols-2",
    "md:grid-cols-3",
    {
      "lg:grid-cols-4": maxColumns === 4,
      "lg:grid-cols-6": maxColumns === 6,
    }
  );

  const SkeletonComponent =
    variant === "small" ? SmallCardSkeleton : CardSkeleton;

  return (
    <div className="space-y-4 my-6 font-primary">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-primary font-bold">{title}</h2>
        {showSeeAll && (
          <div className="bg-gray-200 animate-pulse h-6 w-16 rounded" />
        )}
      </div>

      <div className={clsx(gridCols, "gap-2.5")}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <SkeletonComponent key={index} />
        ))}
      </div>

      <div className="flex justify-end items-center gap-4 mt-4">
        <div className="bg-gray-200 animate-pulse h-6 w-32 rounded" />
        <div className="flex gap-2">
          <div className="bg-gray-200 animate-pulse w-12 h-12 rounded-lg" />
          <div className="bg-gray-200 animate-pulse w-12 h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
