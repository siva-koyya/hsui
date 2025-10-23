'use client'  // ❗ This makes it a Client Component

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
