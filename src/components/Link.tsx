import { useCallback } from 'react';
import AUTH_TOKEN from '../model/constants';
import { Link as LinkModel } from '../model/link';
import { timeDifferenceForDate } from '../services/time';

interface Props {
  link: LinkModel;
  index: number;
}

export default function Link({ link, index }: Props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const handleVote = useCallback(() => {
    console.log('Clicked vote button');
  }, []);

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
