import React from "react";
import { Pagination } from "react-bootstrap";

function TablePagination({
  numItems,
  activePage,
  setPage,
  maxNumItemDisplayed,
}) {
  const maxPage = Math.ceil(numItems / maxNumItemDisplayed);

  const customPageItem = (page, isActive) =>
    page >= 1 && page <= maxPage ? (
      <Pagination.Item
        className={isActive ? "active" : null}
        key={`page-${page}}`}
        onClick={() => setPage(page)}
      >
        {page}
      </Pagination.Item>
    ) : null;

  if (maxPage <= 1) return null;

  return (
    <Pagination>
      <Pagination.First onClick={() => setPage(1)}>First</Pagination.First>
      <Pagination.Prev
        onClick={() => setPage(activePage === 1 ? 1 : activePage - 1)}
      >
        Previous
      </Pagination.Prev>
      {customPageItem(activePage - 3, false)}
      {customPageItem(activePage - 2, false)}
      {customPageItem(activePage - 1, false)}
      {customPageItem(activePage, true)}
      {customPageItem(activePage + 1, false)}
      {customPageItem(activePage + 2, false)}
      {customPageItem(activePage + 3, false)}
      <Pagination.Next
        onClick={() =>
          setPage(activePage === maxPage ? maxPage : activePage + 1)
        }
      >
        Next
      </Pagination.Next>
      <Pagination.Last onClick={() => setPage(maxPage)}>Last</Pagination.Last>
    </Pagination>
  );
}

export default TablePagination;
