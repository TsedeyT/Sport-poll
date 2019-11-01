import React, { Component } from "react";
import Poll from "./components/poll/Poll";
import poll_data from "./components/poll/poll_data";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollData: {
        awayName: " ",
        createdAt: "",
        group: "",
        homeName: "",
        id: "",
        name: "",
        objectId: "",
        sport: "",
        country: "",
        state: ""
      }
    };
  }
  componentDidMount() {
    this.setRandomEvent();
    /**
     * if localStorage has no data create an empty array
     */
    if (!localStorage.getItem("votes")) {
      localStorage.setItem("votes", JSON.stringify([]));
    }
  }
  /**
   * Return random integers
   * between 0 and poll_data.length
   * to set the array for a randomly
   *  generated the data object
   */
  setRandomEvent = () => {
    const randomNumber = Math.floor(Math.random() * poll_data.length);
    const randomData = poll_data[randomNumber];
    console.log(randomData);
    this.setState({
      pollData: randomData
    });
  };
  render() {
    const { id, country, homeName, awayName, sport } = this.state.pollData;
    return (
      <div>
        <Poll
          id={id}
          country={country}
          homeTeam={homeName}
          awayTeam={awayName}
          sportType={sport}
          homePoll={this.selectVote}
        />
      </div>
    );
  }
}
export default App;
