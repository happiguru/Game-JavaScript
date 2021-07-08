const SubmitScore = require('../modules/submitScore');

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ scores: { user: 'stanley', score: 17 } }),
}));

beforeAll(() => {
  global.fetch = () => Promise.resolve({
    json: () => Promise.resolve('Leaderboard score created correctly.'),
  });
});

it('submits the player score to the leaderboard', () => {
  SubmitScore.send('PlayerOne', 0)
    .then((response) => {
      expect(response).toBe('Leaderboard score created correctly.');
    });
});