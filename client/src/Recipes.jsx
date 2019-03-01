import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const recipesQuery = gql`
  {
    recipes {
      id
      title
    }
  }
`;

const Recipes = () => (
  <Query query={recipesQuery}>
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
);

export default Recipes;
