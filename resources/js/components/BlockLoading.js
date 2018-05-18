import React from 'react';

export default class BlockLoading extends React.Component {
  render () {
    return (
      <div className="block-loading">
        <span className="fas fa-spinner fa-spin" />
      </div>
    );
  }
}