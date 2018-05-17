import React from 'react';

export default ({ errors }) => (
  <div className="error-messages">
    { errors.map((error, i) => <p key={i}>{error}</p>) }
  </div>
);