import React from "react";
import { Button } from "../atoms/Button";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  return (
    <div
      className={`is-flex is-justify-content-center is-align-items-center mt-4 ${className}`.trim()}
    >
      <Button
        variant="outline"
        size="small"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="mr-2"
      >
        Sebelumnya
      </Button>

      <span
        className="mx-3"
        style={{ fontSize: "0.8125rem", color: "#475569", fontWeight: 500 }}
      >
        Halaman {currentPage} dari {totalPages}
      </span>

      <Button
        variant="outline"
        size="small"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="ml-2"
      >
        Selanjutnya
      </Button>
    </div>
  );
};
