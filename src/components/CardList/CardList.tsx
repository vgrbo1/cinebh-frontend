import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";

export interface CardListProps<T> {
  title: string;
  seeAllUrl?: string;
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  renderItem: (item: T) => React.ReactNode;
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
}: CardListProps<T>) {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const hasNext = to < total;
  const hasPrev = page > 1;

  return (
    <div className="space-y-4 px-24 my-6 font-primary">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {items.map(renderItem)}
      </div>

      <div className="flex justify-end items-center gap-4">
        <span className="text-base text-primary">
          Showing{" "}
          <span className="font-semibold">
            {from}-{to}
          </span>{" "}
          of <span className="font-semibold">{total}</span>
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev}
            className="p-3 w-12 h-12 flex items-center justify-center rounded-lg border border-customGray bg-white hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext}
            className="p-3 w-12 h-12 flex items-center justify-center rounded-lg border border-customGray bg-white hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
