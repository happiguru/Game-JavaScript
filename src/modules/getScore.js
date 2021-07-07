const GetScore = (() => {
  const all = async () => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ZUi2Xo2RRfSKd14twwPn/scores/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };
  return {
    all,
  };
})();

module.exports = GetScore;
