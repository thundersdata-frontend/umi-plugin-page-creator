import React from 'react';

const LoginLayout: React.FC = props => (
  <div>
    <div>login header</div>
    {props.children}
  </div>
);

export default LoginLayout;
