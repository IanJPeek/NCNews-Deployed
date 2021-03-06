import React, { Component } from 'react';
import axios from "axios"

class VoteChanger extends Component {

state = {
  votedOn: false,
  errMessage: false,
  voteDifference :0
}

HandleVote = (changeValue) => {
  const {comment_id, article_id } = this.props

  const request = comment_id ? "comments/" + comment_id : "articles/" + article_id;

  this.setState({votedOn:true, voteDifference : changeValue
  })

  axios.patch(`https://nc-news-ianp.herokuapp.com/api/${request}`, { inc_votes: changeValue }
  )
    .then(({ data }) =>
      console.log(data, "patched")
    )
.catch(err => {
  this.setState({votedOn: false, voteDifference: 0, errMessage: true})
})
}

render() {
  
  const {votes} = this.props
  const {votedOn, errMessage, voteDifference} = this.state

if (errMessage) return <p>Your vote was not registered...</p>

    return (
      <div>
        <button
          className="upButton"
          onClick={() => this.HandleVote(1)}
          disabled={votedOn}
        >
          Vote Up!
        </button>
        &emsp;
        <label>
        <b>Votes: </b> {votedOn ? votes + voteDifference : votes}
        </label>
        &emsp;
        <button
          className="downButton"
          onClick={() => this.HandleVote(-1)}
          disabled={votedOn}
        >
          Vote Down!
        </button>
      </div>
    );
  }
}

export default VoteChanger;