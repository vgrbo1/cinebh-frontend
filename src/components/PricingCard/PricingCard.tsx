import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export function PricingCard({
  title,
  price,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`border rounded-xl p-6 font-primary transition-all duration-300 flex flex-col justify-between ${
        highlighted
          ? "border-gray-400 shadow-lg bg-white transform -translate-y-6 pt-10 pb-16"
          : "border-gray-200 shadow-sm"
      }`}
    >
      <div>
        <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
        <p
          className={`text-3xl font-bold ${
            highlighted ? "text-secondary" : "text-primary"
          }`}
        >
          {price}
        </p>
        <p className="text-sm text-primary mb-6">*per ticket</p>

        <ul className="text-left space-y-4 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-secondary">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className="text-primary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`w-fit self-center rounded px-4 py-2 font-medium border mt-10 transition-colors duration-200 ${
          highlighted
            ? "bg-secondary text-white hover:bg-secondary/90 border-secondary"
            : "text-secondary border-secondary hover:bg-secondary hover:text-white"
        }`}
      >
        Explore Movies
      </button>
    </div>
  );
}
