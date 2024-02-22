import Image from 'next/image';
import { alegreyaSansSC } from '../fonts';

export default function Highlight({
  imgURL,
  header,
  content,
  altText,
  reverse,
}: {
  imgURL: string;
  header: string;
  content: string;
  altText: string;
  reverse?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 pt-8">
      <div
        className={`flex w-full flex-col items-center justify-evenly gap-2 rounded-md p-4 md:${reverse ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <Image
          src={imgURL}
          width={1920}
          height={1080}
          className="w-full rounded-md object-cover md:w-1/2"
          alt={altText}
        />
        <div className="flex flex-col items-center md:w-1/3">
          <h2
            className={`${alegreyaSansSC.className} mt-4 text-center text-4xl font-bold`}
          >
            {header}
          </h2>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
