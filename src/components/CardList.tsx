import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";

interface CardListProps<T> {
  title: string;
  seeAllLink: string;
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  renderItem: (item: T) => React.ReactNode;
}

function CardList<T>({
  title,
  seeAllLink,
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
    <div className="space-y-4 px-14 my-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          to={seeAllLink}
          className="text-sm text-secondary hover:underline"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(renderItem)}
      </div>

      <div className="flex justify-end items-center gap-4 text-sm text-gray-600">
        <span>
          Showing {from}–{to} of {total}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev}
            className="p-4 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext}
            className="p-4 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardList;
