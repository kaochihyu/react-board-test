import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const ClearAllBtns = styled.div`
  display: flex;
`;

const BottomBtn = styled.div`
  padding: 5px;
  color: #888;
  cursor: default;
  font-size: 14px;

  &:hover {
    color: #333;
  }
`;

const FilterBtns = styled.div`
  display: flex;
`;

export default function FilterButton({ handleCompletedAll, handleClearCompleted, filterList }) {
  return (
    <Btns>
      <ClearAllBtns>
        <BottomBtn onClick={handleCompletedAll}>Completed All</BottomBtn>
        <BottomBtn onClick={handleClearCompleted}>Clear Completed</BottomBtn>
      </ClearAllBtns>
      <FilterBtns>{filterList}</FilterBtns>
    </Btns>
  );
}

FilterButton.propTypes = {
  handleCompleteAll: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  filterList: PropTypes.arrayOf(PropTypes.string),
};
