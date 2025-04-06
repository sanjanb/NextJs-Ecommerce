"use client";

const shippingInfo = [
  {
    title: "Standard Shipping",
    description:
      "Our standard shipping option typically takes 3-7 business days for delivery. Orders are processed within 1-2 business days.",
    price: "Free for orders over $50, otherwise $5.99",
  },
  {
    title: "Express Shipping",
    description:
      "For faster delivery, choose our express shipping option. Delivery typically takes 2-3 business days.",
    price: "$12.99",
  },
  {
    title: "International Shipping",
    description:
      "We ship to most countries worldwide. Delivery times vary by destination and customs processing.",
    price: "Calculated at checkout based on destination",
  },
];

const Shipping = () => {
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-semibold mb-8">Shipping Information</h1>
      <div className="space-y-8">
        {shippingInfo.map((info, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{info.title}</h2>
            <p className="text-gray-600 mb-4">{info.description}</p>
            <p className="font-medium">Price: {info.price}</p>
          </div>
        ))}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Important Notes</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>All shipping times are estimates and may vary.</li>
            <li>
              Orders placed on weekends or holidays will be processed on the next
              business day.
            </li>
            <li>
              International orders may be subject to customs fees and import
              duties.
            </li>
            <li>
              For tracking information, please check your order confirmation email.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shipping; 