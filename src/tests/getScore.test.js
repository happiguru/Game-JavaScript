const GetScore = require('../modules/getScore');

let results = false;

it('returns an array of objects with all the scores', async () => {
  await GetScore.all().then((response) => {
    if (Array.isArray(response.result) === true) results = true;
    expect(results).toBeTruthy();
  });
});