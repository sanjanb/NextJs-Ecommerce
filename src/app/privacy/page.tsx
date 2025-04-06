"use client";

const privacyPolicy = [
  {
    title: "Information We Collect",
    content: [
      "Personal information (name, email, address, etc.)",
      "Payment information",
      "Browsing and purchase history",
      "Device and browser information",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "Process and fulfill your orders",
      "Communicate with you about your orders",
      "Improve our products and services",
      "Send marketing communications (with your consent)",
      "Prevent fraud and ensure security",
    ],
  },
  {
    title: "Information Sharing",
    content: [
      "We do not sell your personal information",
      "We may share information with service providers who assist in our operations",
      "We may disclose information when required by law",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "Access your personal information",
      "Correct inaccurate information",
      "Request deletion of your information",
      "Opt-out of marketing communications",
    ],
  },
];

const Privacy = () => {
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-semibold mb-8">Privacy Policy</h1>
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            This Privacy Policy describes how we collect, use, and protect your
            personal information when you use our website and services.
          </p>
        </div>
        {privacyPolicy.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about our Privacy Policy, please contact us:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Email: privacy@example.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Privacy Street, City, State, ZIP</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 