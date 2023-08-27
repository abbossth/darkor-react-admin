import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({
  setCurrentItems,
  data,
  itemOffset,
  setItemOffset,
  pageCount,
  setPageCount,
  itemsPerPage,
}) => {
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    // setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      previousLabel="< previous"
      onPageChange={handlePageClick}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      disabledClassName="disabled"
      activeClassName="active"
      pageLinkClassName="page-link"
      pageClassName="page-item"
    />
  );
};

export default Pagination;
