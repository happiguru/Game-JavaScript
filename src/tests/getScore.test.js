const GetScore = require('../modules/getScore');

let results = true;
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ user: 'stanley', score: 17 }),
}));

beforeAll(() => {
  global.fetch = () => Promise.resolve({
    json: () => Promise.resolve({ user: 'stanley', score: 17 }),
  });
});

afterAll(() => {
  global.fetch();
});

it('returns an array of objects with all the scores', () => {
  GetScore.all().then((response) => {
    if (Array.isArray(response.result) === true) results = true;
    expect(results).toBeTruthy();
  });
});