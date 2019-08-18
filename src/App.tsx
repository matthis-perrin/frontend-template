import React from 'react';
import styled from 'styled-components';

import {CSSReset} from './lib/core/css_reset';
import {ParamWizz, Wizz} from './lib/core/wizz';

const WithTodoList = Wizz<string[]>();

interface Product {
  id: string;
  name: string;
}
const WithProduct = ParamWizz(
  (products: Product[] | undefined, props: {productId: string}) =>
    products && products.filter(p => p.id === props.productId)[0]
);

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
      <AppWrapper>
        <WithTodoList loader={<span>Loading...</span>}>
          {todoList => (
            <React.Fragment>
              <TodoListTitle>TODO list</TodoListTitle>
              {todoList.map((todo, index) => (
                <div key={index}>{todo}</div>
              ))}
              <RandomTodoButton onClick={addRandomTodo}>Add random</RandomTodoButton>
            </React.Fragment>
          )}
        </WithTodoList>
        <WithProduct productId="0003" loader={<span>Loading product 0003...</span>}>
          {product => <span>{`Product ${product.id} is ${product.name}`}</span>}
        </WithProduct>
      </AppWrapper>
    </React.Fragment>
  );
};

const FAKE_LOAD_TIME = 1000;
setTimeout(() => {
  WithTodoList.setState(['Loaded todo 1', 'Loaded todo 2']);
}, FAKE_LOAD_TIME);
setTimeout(() => {
  WithProduct.setState([
    {id: '0001', name: 'P1'},
    {id: '0002', name: 'P2'},
    {id: '0003', name: 'P3'},
  ]);
}, 2 * FAKE_LOAD_TIME);

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
