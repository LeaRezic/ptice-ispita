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

interface BirdLinksProps {
  bird: Bird;
}

const BirdLinks: React.FC<BirdLinksProps> = ({ bird }) => {
  return (
    <>
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
    </>
  );
};

export default BirdLinks;
