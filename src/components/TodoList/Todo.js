import React, { useState } from "react";
import styled from "styled-components";

const StyledItem = styled.div`
  margin-bottom: 20px;
  color: #555;
  max-width: 370px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-item: center;
`;

const Checkbox = styled.input`
  padding: 10px;
  appearance: none;
  background-color: #fff;
  border: 1px solid #cacaca;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  margin-right: 15px;
  margin-bottom: -2px;
  letter-spacing: 1.5px;

  &:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px 1px 3px rgba(0, 0, 0, 0.1);
    border: solid 1px #cacaca;
  }

  &:checked {
    background-color: #fefefe;
    border: 1px solid #cacaca;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
      inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #555;

    &:active {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px 1px 3px rgba(0, 0, 0, 0.1);
      border: solid 1px #cacaca;
    }

    &:after {
      content: "\u2714";
      font-size: 20px;
      position: absolute;
      top: -5px;
      left: 3px;
      color: #555;
    }
  }

  &:focus {
    outline: none;
  }
`;

const Btn = styled.div`
  color: #888;
  font-size: 14px;
  cursor: default;
  margin-left: 10px;
  font-family: "微軟正黑體";

  &:hover {
    color: #333;
  }
`;

const Btns = styled.div`
  display: flex;
`;

const TodoContent = styled.div`
  ${props => props.isDone
    && `
      text-decoration: line-through;
  `}

  & input {
    border: solid 1px #cacece;
    height: 20px;
    color: #555;

    &:focus {
      outline: none;
    }
  }
`;

const Hidden = styled.div`
  display: none;
`;

export default function Todo({
  content,
  todoId,
  handleDeleteTodo,
  $isDone,
  handleToggleIsDone,
  handleEdit,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState('');

  const handleEditChange = (e) => {
    setNewContent(e.target.value);
  };

  const handleSaveClick = () => {
    if (newContent) {
      handleEdit(todoId, newContent);
      setEditing(false);
    } else {
      setEditing(false);
    }
  };

  const handleTogglerClick = () => {
    handleToggleIsDone(todoId);
  };

  const handleDeleteClick = () => {
    handleDeleteTodo(todoId);
  };

  const editingTemplate = (
    <StyledItem edit>
      <TodoContent>
        <input
          onChange={handleEditChange}
          id={todoId}
          value={newContent}
          placeholder={content}
        />
      </TodoContent>
      <Btns>
        <Btn onClick={handleSaveClick} save>
          Save
        </Btn>
        <Btn onClick={() => setEditing(false)} cancel>
          Cancel
        </Btn>
      </Btns>
    </StyledItem>
  );

  const viewTemplate = (
    <StyledItem view>
      <TodoContent isDone={$isDone}>
        <Checkbox
          onClick={handleTogglerClick}
          checked={$isDone}
          type="checkbox"
          name="item"
          id={todoId}
        />
        {content}
      </TodoContent>
      <Btns>
        <Btn onClick={() => setEditing(true)}>
          Edit
          <sapn>
            <Hidden>{content}</Hidden>
          </sapn>
        </Btn>
        <Btn onClick={handleDeleteClick}>Delete</Btn>
      </Btns>
    </StyledItem>
  );

  return isEditing ? editingTemplate : viewTemplate;
}
