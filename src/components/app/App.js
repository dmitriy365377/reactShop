import React from 'react';
import BeerContainer from '../beers/BeerContainer'
import styles from './App.module.css';


class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className={styles.app}>
        <BeerContainer />
      </div>
    )
  }
}

export default App
