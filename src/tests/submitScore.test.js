const SubmitScore = require('../modules/submitScore');

it('submits the player score to the leaderboard', async () => {
  await SubmitScore.send('PlayerOne', 10)
    .then((response) => {
      expect(response.result).toBe('Leaderboard score created correctly.');
    });
});