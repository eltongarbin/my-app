import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';

import recipesQuery from './recipesQuery';

const Recipes = () => {
  const [vegetarian, setVegetarian] = useState(false);
  function updateVegetarian({ target: { checked } }) {
    setVegetarian(checked);
  }

  return (
    <Fragment>
      <label>
        <input
          type="checkbox"
          checked={vegetarian}
          onChange={updateVegetarian}
        />
        <span>vegetarian</span>
      </label>
      <Query query={recipesQuery} variables={{ vegetarian }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Something went wrong</p>;

          return (
            <ul>
              {data.recipes.map(({ id, title }) => (
                <li key={id}>{title}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default Recipes;
