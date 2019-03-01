import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import recipesQuery from './recipesQuery';

const addRecipeMutation = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`;

const AddRecipe = () => {
  const [vegetarian, setVegetarian] = useState(false);
  const [title, setTitle] = useState('');

  return (
    <Mutation
      mutation={addRecipeMutation}
      refetchQueries={[
        { query: recipesQuery, variables: { vegetarian: true } },
        { query: recipesQuery, variables: { vegetarian: false } }
      ]}
      awaitRefetchQueries={true}
    >
      {(addRecipe, { loading, error }) => (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addRecipe({
              variables: {
                recipe: {
                  title,
                  vegetarian
                }
              }
            });
            setVegetarian(false);
            setTitle('');
          }}
        >
          <label>
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={({ target: { value } }) => setTitle(value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={vegetarian}
              onChange={({ target: { checked } }) => setVegetarian(checked)}
            />
            <span>vegetarian</span>
          </label>
          <div>
            <button>Add Recipe</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
          </div>
        </form>
      )}
    </Mutation>
  );
};

export default AddRecipe;
