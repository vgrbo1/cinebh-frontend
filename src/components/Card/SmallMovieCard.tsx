export interface SmallMovieCardProps {
  imageUrl: string;
  title: string;
}

export function SmallMovieCard({ imageUrl, title }: SmallMovieCardProps) {
  return (
    <div className="rounded-2xl border border-customGray shadow-light-100 bg-white w-full p-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-full aspect-square object-cover rounded-xl mb-2"
      />
      <h3 className="text-base text-primary font-semibold">{title}</h3>
    </div>
  );
}
