import React from 'react';
import styled from 'styled-components';

export const App: React.FC = () => {
  return (
    <AppWrapper>
      Edit <code>src/app.tsx</code> and save to reload.
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #282c34;
  height: 100vh;
  font-size: 20px;
  color: white;
`;
