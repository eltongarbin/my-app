import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const recipesQuery = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;

const Recipes = () => {
  const [isVegetarian, setVegetarian] = useState(false);
  function updateVegetarian({ target: { checked } }) {
    setVegetarian(checked);
  }

  return (
    <Fragment>
      <label>
        <input
          type="checkbox"
          checked={isVegetarian}
          onChange={updateVegetarian}
        />
        <span>vegetarian</span>
      </label>
      <Query query={recipesQuery} variables={{ vegetarian: isVegetarian }}>
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
