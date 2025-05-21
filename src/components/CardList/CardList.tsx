import clsx from "clsx";
import React from "react";
import { Link } from "react-router";
import { Pagination } from "../Pagination/Pagination";

export interface CardListProps<T> {
  title: string;
  seeAllUrl?: string;
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  renderItem: (item: T) => React.ReactNode;
  maxColumns?: 4 | 6;
}

export function CardList<T>({
  title,
  seeAllUrl,
  items,
  total,
  page,
  pageSize,
  onPageChange,
  renderItem,
  maxColumns = 4,
}: CardListProps<T>) {
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

  return (
    <div className="space-y-4 my-6 font-primary">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-primary font-bold">{title}</h2>
        {seeAllUrl && (
          <Link
            to={seeAllUrl}
            className="text-base font-semibold text-secondary hover:underline"
          >
            See All
          </Link>
        )}
      </div>
      <div className={clsx(gridCols, "gap-2.5")}>{items.map(renderItem)}</div>

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
