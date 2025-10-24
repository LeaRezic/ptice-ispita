import * as React from 'react';

interface Bird {
  id: string;
  name: string;
  nameEnglish: string;
  nameLatin: string;
  description: string;
  thumbnail: string;
  lecture: string;
  category: string;
  pictureExam: boolean;
  audioExam: boolean;
  images: string[];
  audio: string[];
  birdBookLink: string;
  birdsOfTheWorldLink: string;
  textbookPage: number;
  xenoCantoLink: string;
}

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
      <div className="absolute top-2 right-2 z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-1">
        {bird.birdBookLink && (
          <a
            href={bird.birdBookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 bg-orange-400 hover:bg-orange-500 text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-md"
            title="Bird Book"
          >
            📖
          </a>
        )}

        {bird.birdsOfTheWorldLink && (
          <a
            href={bird.birdsOfTheWorldLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 bg-green-400 hover:bg-green-500 text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-md"
            title="Birds of the World"
          >
            🌍
          </a>
        )}

        {bird.xenoCantoLink && (
          <a
            href={bird.xenoCantoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 bg-teal-400 hover:bg-teal-500 text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-md"
            title="Xeno-Canto"
          >
            🎵
          </a>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-full items-center text-center gap-2 p-2">
        <div className="flex-1 flex justify-center items-center">
          <img
            className="object-contain w-full h-auto max-w-24 lg:max-w-40 max-h-24 lg:max-h-40"
            src={bird.thumbnail}
            alt={bird.name}
          />
        </div>
        <div>
          <p className="text-sm lg:text-base">{bird.name}</p>
          <p className="text-tiny lg:text-xs text-gray-500">{bird.nameEnglish}</p>
          <p className="text-tiny lg:text-xs text-gray-500">{bird.nameLatin}</p>
        </div>
      </div>
    </div>
  );
};

export default BirdCard;
