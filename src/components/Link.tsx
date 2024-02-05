import { Link as LinkModel } from '../model/link';

interface Props {
  link: LinkModel;
}

export default function Link({ link }: Props) {
  return (
    <div>
      <div>
        {link.description}
        {link.url}
      </div>
    </div>
  );
}
