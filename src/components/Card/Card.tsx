export interface CardProps {
  imageUrl: string;
  title: string;
  secondaryText: string;
  badgeText?: string;
}

export function Card({ imageUrl, title, secondaryText, badgeText }: CardProps) {
  return (
    <div className="relative rounded-xl shadow-md bg-white w-full p-4">
      {badgeText && (
        <div className="absolute top-6 right-2 bg-secondary text-white text-sm font-semibold px-2 py-1.5 rounded-sm h-8">
          {badgeText}
        </div>
      )}
      <img
        src={imageUrl}
        alt={title}
        className="w-full aspect-square object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg text-primary font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{secondaryText}</p>
    </div>
  );
}
