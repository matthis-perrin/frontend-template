import React from 'react';
import styled from 'styled-components';

import {CSSReset} from './lib/core/css_reset';
import {Wizz} from './lib/core/wizz';

const WithTodoList = Wizz<string[]>();

function addRandomTodo(): void {
  let currentTodoList = WithTodoList.getState();
  if (currentTodoList === undefined) {
    currentTodoList = [];
  }
  WithTodoList.setState(
    currentTodoList.concat([
      `TODO #${Math.random()
        .toString()
        .slice(2)}`,
    ])
  );
}

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <CSSReset />
      <WithTodoList loader={<span>Loading...</span>}>
        {todoList => (
          <AppWrapper>
            <TodoListTitle>TODO list</TodoListTitle>
            {todoList.map((todo, index) => (
              <div key={index}>{todo}</div>
            ))}
            <RandomTodoButton onClick={addRandomTodo}>Add random</RandomTodoButton>
          </AppWrapper>
        )}
      </WithTodoList>
    </React.Fragment>
  );
};

const FAKE_LOAD_TIME = 2000;
setTimeout(() => WithTodoList.setState([]), FAKE_LOAD_TIME);

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #282c34;
  height: 100vh;
  color: white;
`;

const TodoListTitle = styled.div`
  font-size: 20px;
  text-decoration: underline;
`;

const RandomTodoButton = styled.button``;
