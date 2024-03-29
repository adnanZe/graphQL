import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { FEED_QUERY } from './LinkList';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

export default function CreateLink() {
  const [formState, setFormState] = useState({
    description: '',
    url: '',
  });

  const navigate = useNavigate();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update: (cache, { data: { post } }) => {
      const data = cache.readQuery({
        query: FEED_QUERY,
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...(data as any).feed.links],
          },
        },
      });
    },
    onCompleted: () => navigate('/'),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3 pb2">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) => {
              setFormState({
                ...formState,
                description: e.target.value,
              });
            }}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) => {
              setFormState({
                ...formState,
                url: e.target.value,
              });
            }}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
