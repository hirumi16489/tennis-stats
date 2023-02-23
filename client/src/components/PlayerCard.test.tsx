import renderer from 'react-test-renderer';
import PlayerCard from './PlayerCard';

const player = {
  id: 52,
  firstname: 'Novak',
  lastname: 'Djokovic',
  shortname: 'N.DJO',
  sex: 'M',
  country: {
    picture: 'https://i.eurosport.com/_iss_/geo/country/flag/medium/6944.png',
    code: 'SRB',
  },
  picture: 'https://i.eurosport.com/_iss_/person/pp_clubteam/large/565920.jpg',
  data: {
    rank: 2,
    points: 2542,
    weight: 80000,
    height: 188,
    age: 31,
    last: [1, 1, 1, 1, 1],
  },
};

it('renders correctly', () => {
  const tree = renderer.create(<PlayerCard player={player} />).toJSON();
  expect(tree).toMatchSnapshot();
});
