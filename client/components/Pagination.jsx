import React from 'react';
import PropTypes from 'prop-types';
/**
 * 
 * 
 * @param {any} pageCount 
 * @param {any} handleChange 
 * @param {any} currentPage 
 * @returns {null} null
 */
function pageNumber(pageCount, handleChange, currentPage) {
  const pageNum = [];
  for (let page = 1; page <= pageCount; page += 1) {
    pageNum.push(
      <li
        key={page}
        className={(page === currentPage) ? 'active page' : 'waves-effect'}
        onClick={() => handleChange(page)}
      >
        <a href="#!">
          {page}
        </a>
      </li>
    );
  }
  return pageNum;
}
const Paginate = ({ pageCount, currentPage, handleChange }) =>
  (<ul className="pagination" >
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
  </ul>);
// Paginate.propTypes = {
//   pageCount: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   handleChange: PropTypes.func.isRequired,
// };

export default Paginate;
