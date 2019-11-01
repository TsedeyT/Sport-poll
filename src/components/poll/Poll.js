import React, { Component } from "react";
import styled from "styled-components";
const Btn = styled.button`
  background-image: linear-gradient(
    -180deg,
    rgba(167, 167, 167, 0.18) 0%,
    rgba(255, 7, 7, 0.08) 100%
  );
  border: 1px solid #8c8c8c;
  padding: 10px 30px;
  border-radius: 5px;
  font-size: 1rem;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: ${props => (props.isActive ? "red" : "")};
  @media (max-width: 873px) {
    padding: 16px 23px;
  }
`;
const Container = styled.div`
  background: #ffa7a7;
  width: 50%;
  margin: 50px auto;
  padding: 25px;
  border-radius: 10px;
  max-width: 800px;
`;
const Title = styled.h1`
  text-align: center;
`;
const SubTitle = styled.h3`
  text-align: center;
`;
const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;
const Heading = styled.h3`
  text-align: center;
`;

class Poll extends Component {
  state = {
    vote: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      const event = this.findEvent();
      if (event) {
        this.setState({
          vote: event.pollValue
        });
      }
    }
  }
  selectVote = pollValue => {
    if (pollValue) {
      const toSetItem = { id: this.props.id, pollValue };
      this.storeVote(toSetItem);
      // Update state
      this.setState({ vote: pollValue });
    }
  };

  findEvent = () => {
    const events = this.getEvents();
    return events.filter(event => {
      return event.id === this.props.id;
    })[0];
  };

  getEvents = () => {
    return JSON.parse(localStorage.getItem("votes"));
  };

  storeVote = userVote => {
    const events = this.getEvents();

    /**
     * If there is already an Id with the same
     * event , remove it
     */
    const filteredEvents = events.filter(event => {
      /**
       *  return true to keep items, return false to remove
       *
       */

      return event.id !== userVote.id;
    });
    /***
     * push new data to filtered events array
     */

    filteredEvents.push(userVote);
    localStorage.setItem("votes", JSON.stringify(filteredEvents));
  };
  render() {
    return (
      <div>
        <Container>
          <Title>Who will win - the Game? </Title>
          <SubTitle>{this.props.sportType}</SubTitle>
          <Heading>{this.props.country}</Heading>
          <InnerWrapper>
            <SubTitle> {this.props.homeTeam}</SubTitle>
            <SubTitle> {this.props.awayTeam}</SubTitle>
          </InnerWrapper>

          <InnerWrapper>
            <Btn
              onClick={() => this.selectVote("home")}
              isActive={this.state.vote === "home"}
            >
              Home Team
            </Btn>
            <Btn
              onClick={() => this.selectVote("draw")}
              isActive={this.state.vote === "draw"}
            >
              Draw
            </Btn>
            <Btn
              onClick={() => this.selectVote("away")}
              isActive={this.state.vote === "away"}
            >
              Away Team
            </Btn>
          </InnerWrapper>
        </Container>
      </div>
    );
  }
}
export default Poll;
