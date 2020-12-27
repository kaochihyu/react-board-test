import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AddItem = styled.div`
  margin: 16px 0;
  vertical-align: sub;
`;

const AddInput = styled.input`
  border: solid 1px #cacece;
  border-radius: 5px;
  width: 70%;
  height: 30px;
  font-size: 16px;
  padding: 10px;
  display: inline-block;

  &:focus {
    outline: #aaa auto 1px;
  }
`;

const AddBtn = styled.div`
  box-sizing: border-box;
  margin-left: 10px;
  width: 30px;
  height: 30px;
  padding: 6px;
  font-size: 18px;
  color: #555;
  text-align: center;
  cursor: default;
  display: inline-block;

  &:hover {
    background-color: #ddd;
    border-radius: 50%;
  }
`;

function AddButton({ onClick, children }) {
  return <AddBtn onClick={onClick}>{children}</AddBtn>;
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

const MemoButton = memo(AddButton);

export default function Form({
  value,
  handleChange,
  handleButtonClick,
  handleKeyPress,
}) {
  return (
    <AddItem>
      <AddInput
        type="text"
        placeholder="todo..."
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <MemoButton onClick={handleButtonClick}>+</MemoButton>
    </AddItem>
  );
}

Form.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};