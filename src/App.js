import React, { Component } from 'react';
import './App.css';
import Button from './Button.js';
import { sounds } from './sounds';

class App extends Component {
  constructor() {
    super();
    this.playSound = this.playSound.bind(this);
    this.state = {
      sounds: sounds
    };
  }
  
  componentDidMount() {
    // Add audio objects
    this.setState({
      sounds: this.state.sounds.map(sound => {
        return {...sound, audioObj: new Audio(sound.audioSrc)};
      })
    });
    window.addEventListener('keydown', this.playSound); // For listening keyboard input to do something
  }
  
  playSound(e) {
    let eventIndex;
    let keyCode = e.keyCode;
    if (keyCode) {
      if (keyCode > 48 && keyCode < 57) {
        eventIndex = keyCode - 49;
      } else { return; }
    } else {
      eventIndex = parseInt(e.currentTarget.dataset.key, 10) - 1;
    }
    const audio = this.state.sounds[eventIndex].audioObj;
    // Play the sound
    audio.currentTime = 0;
    audio.play();
    // Animate boom animation
    this.setState({
      sounds: this.state.sounds.map((sound, index) => {
        if (eventIndex === index) {
          return {...sound, playing: true};
        }
        return sound;
      })
    });
    
    // Remove boom animation
    setTimeout(() => {
      this.setState({
        sounds: this.state.sounds.map((sound, index) => {
          if (eventIndex === index) {
            return {...sound, playing: false};
          }
          return sound;
        })
      });
    }, 40);
  }
  
  render() {
    const renderButtons = this.state.sounds.map((sound, index) => {
      return (
        <Button
          key={sound.audioSrc}
          imageSrc={sound.imageSrc}
          playing={sound.playing}
          index={index}
          playSound={this.playSound}
        />
      );
    });
    
    return (
    <>
      <section id="drumkit">
        {renderButtons}
      </section>
      <p>Press drum number from your Num Row.</p>
      </>
    );
  }
}

export default App;
