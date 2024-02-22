import Image from 'next/image';

export default function Logo() {
  return (
    <div className={`flex w-full items-center justify-center`}>
      <Image
        src={'/assets/recipes2go.webp'}
        width={680}
        height={500}
        alt="Recipes2Go Logo"
        className="sm:w-4/5 md:w-full"
        priority
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAFElEQVR42mP8uLrtPwMewDgUFAAATUoSzSn9j6YAAAAASUVORK5CYII="
      />
    </div>
  );
}
