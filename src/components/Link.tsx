import { useCallback } from 'react';
import { Link as LinkModel } from '../model/link';
import { timeDifferenceForDate } from '../services/time';
import AUTH_TOKEN from '../model/constants';
import { gql, useMutation } from '@apollo/client';
import { FEED_QUERY } from './LinkList';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

interface Props {
  link: LinkModel;
  index: number;
}

export default function Link({ link, index }: Props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const handleVote = useCallback(() => {
    vote();
  }, []);

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data: { vote } }) => {
      const { feed }: any = cache.readQuery({
        query: FEED_QUERY,
      });

      const updatedLinks = feed.links.map((feedLink: any) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={handleVote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  );
}
