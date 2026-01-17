import React, { useState } from "react";

interface Plan {
  title: string;
  price: string;
  features: string[];
}

const monthlyPlans: Plan[] = [
  {
    title: "Basic Plan",
    price: "$4.99",
    features: [
      "2TB additional storage",
      "Up to 1GB file size",
      "Up to 5 projects",
    ],
  },
  {
    title: "Standard Plan",
    price: "$9.99",
    features: [
      "10TB additional storage",
      "Unlimited file size",
      "Up to 10 projects",
    ],
  },
  {
    title: "Premium Plan",
    price: "$19.99",
    features: [
      "Unlimited storage",
      "Unlimited file size",
      "Permanent Membership",
    ],
  },
];

const yearlyPlans: Plan[] = [
  {
    title: "Basic Plan",
    price: "$49.99",
    features: [
      "2TB additional storage",
      "Up to 1GB file size",
      "Up to 5 projects",
    ],
  },
  {
    title: "Standard Plan",
    price: "$99.99",
    features: [
      "10TB additional storage",
      "Unlimited file size",
      "Up to 10 projects",
    ],
  },
  {
    title: "Premium Plan",
    price: "$199.99",
    features: [
      "Unlimited storage",
      "Unlimited file size",
      "Permanent Membership",
    ],
  },
];

const Subscription: React.FC = () => {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <section className="bg-gray-200 px-4 py-8 sm:py-12 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] px-4 sm:px-6 md:px-10 py-8 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Choose your plan
            </h2>
            <p className="mt-2 text-sm sm:text-base font-semibold text-gray-500">
              14 days free trial · Plans can be upgraded in the future.
            </p>
          </div>

          <div className="flex justify-center sm:justify-end">
            <div className="bg-gray-200 rounded-full p-1 flex w-full max-w-xs sm:w-auto">
              <button
                onClick={() => setPlan("monthly")}
                className={`flex-1 px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  plan === "monthly"
                    ? "bg-green-700 text-white"
                    : "text-gray-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPlan("yearly")}
                className={`flex-1 px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  plan === "yearly"
                    ? "bg-green-700 text-white"
                    : "text-gray-700"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[1px]">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-in-out
            ${
              plan === "monthly"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
            }`}
          >
            {monthlyPlans.map((planItem, index) => (
              <PlanCard
                key={index}
                plan={planItem}
                index={index}
                selected={selectedIndex === index}
                onSelect={() => setSelectedIndex(index)}
              />
            ))}
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-in-out
            ${
              plan === "yearly"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
            }`}
          >
            {yearlyPlans.map((planItem, index) => (
              <PlanCard
                key={index}
                plan={planItem}
                index={index}
                selected={selectedIndex === index}
                onSelect={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PlanCard: React.FC<{
  plan: Plan;
  index: number;
  selected: boolean;
  onSelect: () => void;
}> = ({ plan, index, selected, onSelect }) => {
  const titleColor =
    index === 0
      ? "text-blue-600"
      : index === 1
      ? "text-green-700"
      : "text-purple-600";

  const titlebgColor =
    index === 0
      ? "bg-blue-600"
      : index === 1
      ? "bg-green-700"
      : "bg-purple-600";

  return (
    <div
      onClick={onSelect}
      className={`rounded-2xl p-5 sm:p-6 md:p-8 cursor-pointer
      shadow-[0_20px_40px_rgba(0,0,0,0.05)]
      flex flex-col justify-between
      transition-transform duration-300 ease-out hover:scale-[1.03]
      border ${selected ? "border-green-700" : "border-[#E6ECE8]"} bg-white`}
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-3.5 h-3.5 rounded-full ${titlebgColor}`} />
          <h3 className={`text-base sm:text-lg font-medium ${titleColor}`}>
            {plan.title}
          </h3>
        </div>

        <div className="mb-5">
          <span className="text-3xl sm:text-4xl font-bold text-gray-900">
            {plan.price}
          </span>
          <span className="text-sm sm:text-md font-bold text-gray-400">
            {" "}
            / month
          </span>
        </div>

        <ul className="space-y-3 text-sm sm:text-base text-gray-700">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">✦</span>
              <span className="font-semibold">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`mt-6 sm:mt-8 w-full py-3 rounded-xl font-medium transition-all duration-300
        ${
          selected
            ? "bg-green-700 text-white hover:bg-green-800"
            : "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
        }`}
      >
        Get Plan
      </button>
    </div>
  );
};

export default Subscription;
