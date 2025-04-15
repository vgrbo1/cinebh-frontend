export interface CardProps {
  imageUrl: string;
  title: string;
  secondaryText: string;
}

export function Card({ imageUrl, title, secondaryText }: CardProps) {
  return (
    <div className="rounded-xl shadow-md bg-white w-full p-4">
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
