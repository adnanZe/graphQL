import { gql, useQuery } from '@apollo/client';
import LinkComponent from './Link';
import { Link as LinkModel } from '../model/link';

export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
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
          {data.feed.links.map((link: LinkModel, index: number) => (
            <LinkComponent key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
}
