import "./App.css";
import styled from "styled-components";
import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import useInput from "./useInput";

const Container = styled.div`
  width: 400px;
  min-height: 120px;
  background-color: #fff;
  margin: 50px auto;
  border-radius: 16px;
  padding: 40px 40px 5px 40px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h4`
  font-family: "Mukta", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #333;
  margin-bottom: 30px;
  letter-spacing: 1.5px;
  text-align: left;
`;

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
  margin-left: 10px;
  width: 30px;
  height: 30px;
  padding: 5px;
  font-size: 20px;
  color: #555;
  text-align: center;
  cursor: default;
  display: inline-block;

  &:hover {
    background-color: #ddd;
    border-radius: 50%;
  }
`;

const Itemslist = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const StyledItem = styled.div`
  ${(props) =>
    props.isDone &&
    `
      text-decoration: line-through;
  `}

  margin-bottom: 20px;
  color: #555;
  max-width: 370px;
  overflow: hidden;
`;

const Checkbox = styled.input`
  appearance: none;
  background-color: #fff;
  border: 1px solid #cacaca;
  padding: 10px;
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

const DeleteBtn = styled.div`
  display: inline-block;
  float: right;
  font-size: 20px;
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
  cursor: default;
  text-align: center;

  &:hover {
    background-color: #ddd;
    border-radius: 50px;
    padding: 0px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-bottom: 5px;
`;

const StyledBtns = styled.div`
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

// function AddButton({ onClick, children }) {
//   console.log('render button')
//   return <AddBtn onClick={onClick}>{children}</AddBtn>
// }

class AddButton extends React.Component {
  render() {
    const { onClick, children } = this.props;
    return <AddBtn onClick={onClick}>{children}</AddBtn> 
  }
}

const MemoButton = memo(AddButton)


function Item({
  content,
  todoId,
  handleDeleteTodo,
  $isDone,
  handleToggleIsDone,
}) {
  const handleTogglerClick = () => {
    handleToggleIsDone(todoId);
  };

  const handleDeleteClick = () => {
    handleDeleteTodo(todoId);
  };

  return (
    <StyledItem isDone={$isDone}>
      <Checkbox
        onClick={handleTogglerClick}
        type="checkbox"
        id="item"
        name="item"
        data-todo-id={todoId}
      />
      {content}
      <DeleteBtn onClick={handleDeleteClick}>+</DeleteBtn>
    </StyledItem>
  );
}

function Btns({ handleClearAll, handleDone }) {
  const handleClearAllClick = () => {
    handleClearAll();
  };

  return (
    <StyledBtns>
      <ClearAllBtns>
        <BottomBtn onClick={handleClearAllClick}>清除完成項目</BottomBtn>
      </ClearAllBtns>
      <FilterBtns>
        <BottomBtn>全部項目</BottomBtn>
        <BottomBtn>待辦項目</BottomBtn>
        <BottomBtn>完成項目</BottomBtn>
      </FilterBtns>
    </StyledBtns>
  );
}

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos))
}


function App() {
  const id = useRef(0);
  const [todos, setTodos] = useState(() => {
    console.log("init");
    let todoData = window.localStorage.getItem("todos") || "";
    console.log(todoData.length) // 這裡有點怪，甚麼都沒有是 2，新增一個東西變 25 (之後每重新整理就+ 24)
    if (todoData) {
      todoData = JSON.parse(todoData);
      id.current = todoData[0].id + 1;
    } else {
      todoData = [];
    }
    console.log(todoData);
    console.log(todoData.length); // 這裡是 3
    return todoData;
  });


  const { value, setValue, handleChange } = useInput();

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const handleButtonClick = useCallback(() => {
    setTodos([
      ...todos,
      {
        id: id.current,
        content: value,
      },
    ]);
    setValue("");
    id.current++;
  }, [setValue, setTodos, value, todos]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        {
          id: id.current,
          content: value,
        },
      ]);
      setValue("");
      id.current++;
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };


  const handleClearAll = (isDone) => {
    setTodos(todos.filter((todo) => !todo.isDone));
  };

  return (
    <Container onKeyPress={handleKeyPress}>
      <Title>Todo List</Title>
      <AddItem>
        <AddInput
          type="text"
          placeholder="todo"
          value={value}
          onChange={handleChange}
        />
        <MemoButton onClick={handleButtonClick}>+</MemoButton>
      </AddItem>
      <Itemslist>
        {todos.map((todo, index) => (
          <Item
            key={todo.id}
            content={todo.content}
            todoId={todo.id}
            handleDeleteTodo={handleDeleteTodo}
            $isDone={todo.isDone}
            handleToggleIsDone={handleToggleIsDone}
          />
        ))}
      </Itemslist>
      <Line />
      <Btns handleClearAll={handleClearAll} />
    </Container>
  );
}

export default App;
