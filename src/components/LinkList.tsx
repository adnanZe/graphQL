import LinkComponent from './Link';
import { Link as LinkModel } from '../model/link';

const linksToRender: LinkModel[] = [
  {
    id: 'link-id-1',
    description: 'Prisma gives you a powerful database toolkit 😎',
    url: 'https://prisma.io',
  },
  {
    id: 'link-id-2',
    description: 'The best GraphQL client',
    url: 'https://www.apollographql.com/docs/react/',
  },
];

export default function LinkList() {
  return (
    <div>
      {linksToRender.map((link) => (
        <LinkComponent key={link.id} link={link} />
      ))}
    </div>
  );
}
