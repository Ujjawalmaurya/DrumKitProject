import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { playing, index, playSound } = this.props;
    
    return (
      <div
        data-key={index + 1}
        className={`button${playing ? ' playing' : ''}`}
        onClick={playSound}
      >
      <button className='btn'>Drum {index + 1}</button>
      </div>
    );
  }
}

export default Button;
