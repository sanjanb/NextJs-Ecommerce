"use client";

const returnPolicy = [
  {
    title: "30-Day Return Policy",
    description:
      "We offer a 30-day return policy for most items. Items must be unused, in their original packaging, and accompanied by proof of purchase.",
  },
  {
    title: "How to Return an Item",
    description:
      "To return an item, please contact our customer service team to initiate the return process. You will receive a return authorization number and instructions for shipping the item back to us.",
  },
  {
    title: "Refund Process",
    description:
      "Once we receive your returned item, we will inspect it and process your refund within 5-7 business days. Refunds will be issued to the original payment method.",
  },
  {
    title: "Exclusions",
    description:
      "Some items are not eligible for return, including personalized or custom-made products, digital downloads, and items marked as final sale.",
  },
];

const Returns = () => {
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-semibold mb-8">Returns & Refunds</h1>
      <div className="space-y-8">
        {returnPolicy.map((policy, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{policy.title}</h2>
            <p className="text-gray-600">{policy.description}</p>
          </div>
        ))}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about our return policy or need assistance
            with a return, please contact our customer service team:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Email: support@example.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Hours: Monday-Friday, 9am-5pm EST</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Returns; 