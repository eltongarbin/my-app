import React, { Fragment, useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import recipesQuery from './recipesQuery';
import './Recipes.css';

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;

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
      <Query
        query={recipesQuery}
        variables={{ vegetarian }}
        pollInterval={3000}
      >
        {({ data, loading, error, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Something went wrong</p>;

          return (
            <ul>
              {data.recipes.map(({ id, title, isStarred }) => (
                <li key={id}>
                  {title}
                  <Mutation
                    mutation={updateRecipeStarredMutation}
                    refetchQueries={[
                      {
                        query: recipesQuery,
                        variables: { vegetarian: false }
                      },
                      { query: recipesQuery, variables: { vegetarian: true } }
                    ]}
                    awaitRefetchQueries
                  > 
                    {(updateRecipeStarred, { loading, error }) => (
                      <button
                        onClick={() =>
                          updateRecipeStarred({
                            variables: {
                              id,
                              isStarred: !isStarred
                            }
                          })
                        }
                        className="star-btn"
                        style={{
                          color: isStarred ? 'orange' : 'grey',
                          animation: loading
                            ? 'inflate 0.7s ease infinite alternate'
                            : 'none'
                        }}
                      >
                        ★ {error && 'Failed to update'}
                      </button>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default Recipes;
