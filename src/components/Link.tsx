import React from 'react';

interface Props {
  link: {
    description: string;
    url: string;
  };
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
