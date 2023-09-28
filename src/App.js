import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  TextInput,
} from 'carbon-components-react';
import { Search } from '@carbon/icons-react';

import './App.css';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchTerm}`
      );
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching GitHub:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Project Search</h1>
        <Form>
          <FormGroup legendText="">
            <TextInput
              id="search-input"
              labelText="Enter project name"
              placeholder="Search for GitHub projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormGroup>
          <Button
            kind="primary"
            onClick={handleSearch}
            renderIcon={Search}
          >
            Search
          </Button>
        </Form>
        <div className="search-results">
          {searchResults.length > 0 && (
            <h2>Search Results</h2>
          )}
          {searchResults.map((result) => (
            <div key={result.id} className="tile">
              <div className="tile-above-the-fold-content">
                <h3>{result.name}</h3>
                <p>{result.description}</p>
              </div>
              <div className="tile-content">
                <p>Stars: {result.stargazers_count}</p>
                <p>Language: {result.language}</p>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
