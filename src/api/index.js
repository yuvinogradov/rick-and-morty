const apiHost = 'https://rickandmortyapi.com/api';

const getLocationByName = async (locationName) => {
  const response = await fetch(`${apiHost}/location/?name=${locationName}`);
  const location = await response.json();
  return location.results[0];
};

const getCharactersByIds = async (charactersIds) => {
  const charactersUrl = `${apiHost}/character/${charactersIds.join(',')}`;
  const response = await fetch(charactersUrl);
  const characters = await response.json();
  return characters;
};

const getCharactersByNames = async (names) => {
  const chars = [];
  names.forEach((name) => {
    chars.push(fetch(`${apiHost}/character/?name=${name}`).then((res) => res.json()));
  });
  const allCharacters = await Promise.all(chars);

  // reduce data to [{name:..., episodes:...}, ...]
  const allCharactersReduced = allCharacters
    .map((group) => group.results)
    .map((character) => character
      .reduce(
        (acc, item) => (
          {
            name: item.name,
            episodes: (acc.episodes || 0) + (item.episode?.length || 0),
          }
        ),
        {},
      ));
  return allCharactersReduced;
};

const getCharactersByOriginName = async (location) => {
  const charactersUrl = `${apiHost}/character/${location.residents.map((url) => url.match(/\d+/)[0]).join(',')}`;

  const response = await fetch(charactersUrl);
  const characters = await response.json();
  return characters;
};

export {
  getLocationByName,
  getCharactersByIds,
  getCharactersByOriginName,
  getCharactersByNames,
};
