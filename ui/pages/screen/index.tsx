import React from 'react';
import { IUiApi } from '@umijs/ui-types';
import Context from './Context';
import Dashboard from './Dashboard';

export default ({ api }: { api: IUiApi }) => {
  return (
    <Context.Provider value={{ api }}>
      <Dashboard />
    </Context.Provider>
  );
};
