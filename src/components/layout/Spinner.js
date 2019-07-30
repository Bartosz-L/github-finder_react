import React from 'react';
import spinner from 'components/layout/spinner.gif';

const Spinner = () => (
  <>
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: '200px', margin: 'auto', display: 'block' }}
    />
  </>
);

export default Spinner;
