import React from 'react';
/**
 * @param {any} pageCount
 * @param {any} handleChange
 * @returns
 */
function pageNumber(pageCount, handleChange, currentPage) {
  const pageNum = [];
  for (let page = 1; page <= pageCount; page += 1) {
    pageNum.push(
      <li
        className={(page === currentPage) ? "active page" : "waves-effect"}
        onClick={() => handleChange(page)} >
          <a href="#!">
            {page}
          </a>
        </li>
        );
  }
  return pageNum;
}
const Pagination = ({ pageCount, currentPage, handleChange }) =>
<ul className="pagination" >
    <li className={(currentPage === 1) ? 'disabled' : 'waves-effect'} >
      <a href="#!">
        <i className="material-icons">chevron_left</i>
      </a>
    </li>
      {pageNumber(pageCount, handleChange, currentPage)}
    <li className={(currentPage === pageCount) ? 'disabled' : 'waves-effect'}>
      <a href="#!">
        <i className="material-icons">chevron_right</i>
      </a>
    </li>
  </ul>
            
;


export default Pagination;
