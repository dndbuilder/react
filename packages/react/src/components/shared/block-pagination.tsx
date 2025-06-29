"use client";
import { classNames } from "@/utils";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export type PaginationProps = {
  current: number;
  totalPage: number;
  className?: string;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
} & React.HTMLProps<HTMLDivElement>;

// Get available page numbers as array
const getAvailablePages = (current: number, totalPage: number) => {
  const middlePage = Math.min(Math.max(3, current), totalPage - 2),
    fromPage = Math.max(middlePage - 2, 1),
    toPage = Math.max(middlePage + 2, current);

  let pages = [];

  for (let n = fromPage; n <= toPage; ++n) {
    if (n > 0) pages.push(n);
  }

  return pages;
};

export const BlockPagination = ({
  current,
  totalPage,
  onPageChange,
  className,
  ...rest
}: PaginationProps) => {
  const [availablePages, setAvailablePages] = useState<number[]>([]);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    setAvailablePages(getAvailablePages(current, totalPage));
    setHasPreviousPage(current > 1);
    setHasNextPage(current < totalPage);
  }, [current]);

  return (
    <div
      className={classNames("inline-flex items-center justify-between gap-2 text-sm", className)}
      {...rest}
    >
      <button
        className={classNames(
          "reset flex h-8 items-center justify-center rounded-sm border border-slate-300 px-4 text-slate-800",
          !hasPreviousPage
            ? "cursor-not-allowed text-slate-400 hover:bg-transparent"
            : "hover:border-primary-500 hover:bg-primary-50 hover:text-primary-500"
        )}
        disabled={!hasPreviousPage}
        onClick={() => {
          onPageChange?.(current - 1);
        }}
      >
        <FiChevronLeft />
      </button>
      {availablePages.map((pageNo, index) => {
        if (pageNo == current) {
          return (
            <button
              disabled
              key={index}
              className="reset active flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-sm border text-slate-400 hover:bg-transparent"
            >
              {pageNo}{" "}
            </button>
          );
        }
        return (
          <button
            onClick={() => {
              onPageChange?.(pageNo);
            }}
            key={index}
            className="reset hover:border-primary-500 hover:bg-primary-50 hover:text-primary-500 flex h-8 w-8 items-center justify-center rounded-sm border text-slate-800"
          >
            {pageNo}{" "}
          </button>
        );
      })}
      <button
        className={classNames(
          "reset flex h-8 items-center justify-center rounded-sm border border-slate-300 px-4 text-slate-800",
          !hasNextPage
            ? "cursor-not-allowed text-slate-400 hover:bg-transparent"
            : "hover:border-primary-500 hover:bg-primary-50 hover:text-primary-500"
        )}
        disabled={!hasNextPage}
        onClick={() => {
          onPageChange?.(current + 1);
        }}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};
