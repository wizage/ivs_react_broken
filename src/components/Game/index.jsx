import React, { Component } from 'react';
/* Location 8 */
/* Location 10 */
/* Location 15 */
import Video from '../Video';
import Modal from '../Modal';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      drawInfo: {},
    };
  }

  componentDidMount() {
    
  }


  render() {
    /* Location 9 */
    const url = '';
    const { modalVisible, drawInfo } = this.state;
    return (
      <div className="game-container">
        <Video />
      </div>
    );
  }
}

export default Game;
