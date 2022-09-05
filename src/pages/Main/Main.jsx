import React, { useEffect, useState } from 'react';
import BarChart from '../../components/BarChart/BarChart';
import { getLocationByName, getCharactersByIds, getCharactersByNames } from '../../api';
import Table from '../../components/Table/Table';
import './Main.css';

export default function Home() {
  const [location, setLocation] = useState();
  const [theMostUnpopularCharacter, setTheMostUnpopularCharacter] = useState();
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    const graphCharactersNames = [
      'Rick Sanchez',
      'Morty Smith',
      'Summer Smith',
      'Beth Smith',
      'Jerry Smith',
    ];

    const getInitialData = async () => {
    try {
      const loc = await getLocationByName('Earth (C-137)');
      setLocation(loc);
      const originCharactersIds = loc.residents.map((url) => url.match(/\d+/)[0]);
      const theEarthC137Chars = await getCharactersByIds(originCharactersIds);
      const theMostUnpopular = theEarthC137Chars.sort(
        (a, b) => a.episode.length - b.episode.length,
      )[0];
      setTheMostUnpopularCharacter(theMostUnpopular);
      const charactersByNames = await getCharactersByNames(graphCharactersNames);
      setGraphData(charactersByNames);
    } catch (err) {
      console.error('Error: ', err);
    }
  };

    getInitialData();
  }, []);

  const tableRows = [
    {
      rowName: 'Character name',
      rowValue: theMostUnpopularCharacter && theMostUnpopularCharacter.name,
    },
    { rowName: 'Origin name', rowValue: location && location.name },
    { rowName: 'Origin dimension', rowValue: location && location.dimension },
    {
      rowName: 'Popularity',
      rowValue: theMostUnpopularCharacter && theMostUnpopularCharacter.episode.length,
    },
  ];

  return (
    <>
      <section>
        <h3>The Most Unpopular Character in &apos;Earth (C-137)&apos; Location</h3>
        <Table tableRows={tableRows} />
      </section>
      <section>
        <h3>Popularity of Selected Characters</h3>
        {graphData && <BarChart data={graphData} />}
      </section>
    </>
  );
}
