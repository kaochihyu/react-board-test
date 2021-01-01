import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Todo from './Todo';
import Form from './Form';
import FilterButton from './FilterButton';
import useInput from './useInput';

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

const Itemslist = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-bottom: 5px;
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

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

function FilterBtn(props) {
  const { name, isPressed, setFilter } = props;
  return (
    <BottomBtn
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      {name}
    </BottomBtn>
  );
}

FilterBtn.propTypes = {
  name: PropTypes.string.isRequired,
  isPressed: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
};

function App() {
  const id = useRef(0);
  const [filter, setFilter] = useState('All');

  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem('todos') || '';
    return todoData ? JSON.parse(todoData) : []
  });
  console.log(todos.length)
  const { value, setValue, handleChange } = useInput();

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const handleButtonClick = useCallback(() => {
    if (!value) return
    setTodos([
      ...todos,
      {
        id: id.current,
        content: value,
      },
    ]);
    setValue("");
    id.current += 1;
    
  }, [setValue, setTodos, value, todos]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (value !== '') {
        setTodos([
          ...todos,
          {
            id: id.current,
            content: value,
          },
        ]);
        setValue('');
        id.current += 1;
      }
    }
  };

  const handleDeleteTodo = deletedId => {
    setTodos(todos.filter(todo => todo.id !== deletedId));
  };

  const handleCompletedAll = () => {
    setTodos(todos.map(todo => {
      return {
        ...todo, 
        isDone: true
      }
    })
    );
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => todo.isDone !== true));
  };

  const handleToggleIsDone = doneId => {
    setTodos(
      todos.map(todo => {
        if (todo.id !== doneId) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }),
    );
  };

  const handleEdit = (editedId, newContent) => {
    const editedTodo = todos.map((todo) => {
      if (todo.id !== editedId) return todo;
      return {
        ...todo,
        content: newContent,
      };
    });
    setTodos(editedTodo);
  };

  const FILTER_MAP = {
    All: () => true,
    Active: todo => !todo.isDone,
    Completed: todo => todo.isDone,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map(name => (
    <FilterBtn
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <Container>
      <Title>Todo List</Title>
      <Form
        value={value}
        handleChange={handleChange}
        handleButtonClick={handleButtonClick}
        handleKeyPress={handleKeyPress}
      />
      <Itemslist>
        {todos.filter(FILTER_MAP[filter]).map(todo => (
          <Todo
            key={todo.id}
            content={todo.content}
            todoId={todo.id}
            handleDeleteTodo={handleDeleteTodo}
            $isDone={todo.isDone}
            handleToggleIsDone={handleToggleIsDone}
            handleEdit={handleEdit}
          />
        ))}
      </Itemslist>
      <Line />
      <FilterButton 
        filterList={filterList} 
        handleClearCompleted={handleClearCompleted} 
        handleCompletedAll={handleCompletedAll} 
      />
    </Container>
  );
}

export default App;
