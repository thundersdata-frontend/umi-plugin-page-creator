import React from 'react';

const BlankLayout: React.FC = (props) => (
  <div>
    <div>layout header</div>
    {props.children}
  </div>
);

export default BlankLayout;
