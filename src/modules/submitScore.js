const fetch = require('node-fetch');

const SubmitScore = (() => {
  const send = async (name, score) => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ZUi2Xo2RRfSKd14twwPn/scores/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: name,
        score,
      }),
    });
    const data = await response.json();
    return data;
  };
  return {
    send,
  };
})();

module.exports = SubmitScore;
