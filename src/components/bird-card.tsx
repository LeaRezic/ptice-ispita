import * as React from 'react';
import BirdLinks from './bird-links';
import { Bird } from '@/types/bird';

interface BirdCardProps {
  bird: Bird;
}

const BirdCard: React.FC<BirdCardProps> = ({ bird }) => {
  return (
    <div className="relative group min-h-full flex">
      <div className="absolute top-2 left-2 z-20 text-gray-400 text-xs font-medium">
        {bird.textbookPage}
      </div>
      <div className="absolute top-5 left-2 z-20 text-gray-400 text-xs font-medium">
        {bird.pictureExam && 'i'}{bird.audioExam && 'g'}
      </div>
      <div className="hidden xs:flex absolute top-2 right-2 z-20 opacity-100 xs:pointer-fine:opacity-0 xs:pointer-fine:group-hover:opacity-100 xs:pointer-fine:group-focus-within:opacity-100 transition-opacity duration-300 flex-col gap-1">
        <BirdLinks bird={bird} />
      </div>

      <div className="flex-1 flex flex-row xs:flex-col min-h-full xs:items-center text-center gap-2 p-2">
        <div className="pl-8 xs:pl-0 xs:flex-1 flex justify-center items-center">
          <img
            className="object-contain w-full h-auto max-w-32 lg:max-w-40 max-h-32 lg:max-h-40"
            src={bird.thumbnail}
            alt={bird.name}
            loading="lazy"
          />
        </div>
        <div className="flex-1 xs:flex-initial flex flex-col justify-between">
          <div className="text-right xs:text-center">
            <p className="text-base">{bird.name}</p>
            <p className="text-tiny lg:text-xs text-gray-500">{bird.nameEnglish}</p>
            <p className="text-tiny lg:text-xs text-gray-500">{bird.nameLatin}</p>
          </div>
          <div className="xs:hidden mt-2 flex justify-end gap-1">
            <BirdLinks bird={bird} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirdCard;
