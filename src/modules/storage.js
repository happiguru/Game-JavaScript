const Storage = (() => {
  const currentScore = (score) => {
    localStorage.setItem('currentScore', JSON.stringify(score));
  };

  const getCurrentScore = () => {
    const getScore = JSON.parse(localStorage.getItem('currentScore'));
    return getScore;
  };

  const highScore = (score) => {
    localStorage.setItem('highestScore', JSON.stringify(score));
  };

  const getHighScore = () => {
    const getHigh = JSON.parse(localStorage.getItem('highestScore'));
    return getHigh;
  };

  const setAmmo = (ammo) => {
    localStorage.setItem('Ammunition', JSON.stringify(ammo));
  };

  const currentAmmo = () => {
    const ammo = JSON.parse(localStorage.getItem('Ammunition'));
    return ammo;
  };
  return {
    currentScore,
    getCurrentScore,
    highScore,
    getHighScore,
    setAmmo,
    currentAmmo,
  };
})();

module.exports = Storage;
