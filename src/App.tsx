import React, { useEffect, ChangeEvent } from 'react';
import { switchMap, catchError, filter, tap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { of } from 'rxjs';
import './App.css';
import CardList from './components/card-list/card-list';
import { IMonster } from './interfaces/models/monster.model';
import { useDebounced } from './utils/useDebounced';
import SearchBox from './pages/SearchBox/SearchBox';

interface TProps {}

const VALIDATION_DEBOUNCE_TIME_MILLIS = 500;

const App: React.FC<TProps> = props => {
  const [monsters, setMonsters] = React.useState<IMonster[]>([]);
  const [searchField, setSearchField] = React.useState<string>('');

  useEffect(() => {
    fromFetch('https://jsonplaceholder.typicode.com/users')
      .pipe(
        filter(res => res.ok),
        switchMap(response => response.json()),
        tap(users => setMonsters(users)),
        catchError(err => of({ error: true, message: err.message }))
      )
      .subscribe(console.log);
  }, []);

  const validateDebounced = useDebounced<string>(
    VALIDATION_DEBOUNCE_TIME_MILLIS,
    setSearchField
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    validateDebounced(value);
  };

  const filteredMonsters = monsters.filter(monster =>
    monster.name.toLocaleLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="App">
      <h1> Monsters Rolodex </h1>
      <SearchBox placeholder='Search Monsters' handleChange={onChange} />
      <CardList monsters={filteredMonsters}>
        {monsters.map((monster: IMonster) => (
          <h1 key={monster.id}>{monster.name}</h1>
        ))}
      </CardList>
    </div>
  );
};

export default App;
