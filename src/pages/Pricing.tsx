import Layout from "../components/Layout";
import PricingCard from "../components/PricingCard";

const SEAT_OPTIONS = [
  {
    title: "Regular Seats",
    price: "7 KM",
    features: [
      "Comfortable seating",
      "Affordable pricing",
      "Wide selection",
      "Accessible locations",
      "Suitable for everyone",
    ],
  },
  {
    title: "Love Seats",
    price: "24 KM",
    highlighted: true,
    features: [
      "Side-by-side design",
      "Comfortable padding",
      "Adjustable armrests",
      "Cup holders",
      "Reserved for couples",
    ],
  },
  {
    title: "Vip Seats",
    price: "10 KM",
    features: [
      "Enhanced comfort",
      "Priority seating",
      "Prime viewing",
      "Personal space",
      "Luxury extras",
    ],
  },
];

function Pricing() {
  return (
    <Layout>
      <section className="bg-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Pricing</h2>
        <p className="text-primary max-w-xl mx-auto mb-20">
          Welcome to our cinema ticket pricing options! We offer three tiers to
          suit everyone’s preferences. Explore our pricing options below and
          treat yourself to a cinematic adventure like never before!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto items-start">
          {SEAT_OPTIONS.map((option) => (
            <PricingCard
              key={option.title}
              title={option.title}
              price={option.price}
              features={option.features}
              highlighted={option.highlighted}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Pricing;
