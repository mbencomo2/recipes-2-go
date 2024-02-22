import { ImageData } from '@/app/lib/definitions';
import Image from 'next/image';

export default function ImageFromDB({
  image,
  altText,
  className,
  width,
  height,
}: {
  image: ImageData;
  altText: string;
  className: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={`data:${image.type};base64,${image.data}`}
      width={width}
      height={height}
      alt={`${altText}`}
      className={className}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAFElEQVR42mP8uLrtPwMewDgUFAAATUoSzSn9j6YAAAAASUVORK5CYII="
    />
  );
}
