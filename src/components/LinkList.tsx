import { gql, useQuery } from '@apollo/client';
import LinkComponent from './Link';
import { Link as LinkModel } from '../model/link';

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export default function LinkList() {
  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link: LinkModel) => (
            <LinkComponent key={link.id} link={link} />
          ))}
        </>
      )}
    </div>
  );
}
