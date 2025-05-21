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

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
