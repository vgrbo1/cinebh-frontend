import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}

export function Pagination({
  total,
  page,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const hasNext = to < total;
  const hasPrev = page > 1;

  return (
    <div className="flex justify-end items-center gap-4 mt-4">
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
  );
}
