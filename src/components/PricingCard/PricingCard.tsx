import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { Button } from "../Button/Button";
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
  const navigate = useNavigate();
  return (
    <div
      className={`border rounded-xl p-6 font-primary transition-all duration-300 flex flex-col justify-between ${
        highlighted
          ? "border-customDarkGray2 shadow-light-100 bg-white transform -translate-y-6 pt-10 pb-16"
          : "border-customGray shadow-sm"
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

      <Button
        variant={highlighted ? "secondary" : "outline"}
        className="w-fit self-center"
        onClick={() => navigate("/currently-showing")}
      >
        Explore Movies
      </Button>
    </div>
  );
}
