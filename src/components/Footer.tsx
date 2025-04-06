import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/" className="group">
            <div className="text-2xl tracking-wide transition-colors duration-300 group-hover:text-FTT">FTT</div>
          </Link>
          <p className="text-gray-600 leading-relaxed">
            Discover the freshest organic produce, farm-fresh dairy, and
            sustainable products delivered straight to your doorstep.
          </p>
          <div className="flex flex-col gap-2">
            <a href="mailto:niranjannshaiva@gmail.com" className="font-semibold text-gray-700 hover:text-FTT transition-colors duration-300">niranjannshaiva@gmail.com</a>
            <a href="tel:+918123539252" className="font-semibold text-gray-700 hover:text-FTT transition-colors duration-300">+91 81235 39252</a>
          </div>
          <div className="flex gap-6">
            {['facebook', 'instagram', 'youtube', 'pinterest', 'x'].map((social) => (
              <a
                key={social}
                href="#"
                className="hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src={`/${social}.png`}
                  alt={social}
                  width={16}
                  height={16}
                  className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            ))}
          </div>
        </div>
        {/* CENTER */}
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg text-gray-800">COMPANY</h1>
            <div className="flex flex-col gap-4">
              <Link href="/about" className="text-gray-600 hover:text-FTT transition-colors duration-300">About Us</Link>
              <Link href="/contact" className="text-gray-600 hover:text-FTT transition-colors duration-300">Contact Us</Link>
              <Link href="/faq" className="text-gray-600 hover:text-FTT transition-colors duration-300">FAQ</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-FTT transition-colors duration-300">Privacy Policy</Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg text-gray-800">SHOP</h1>
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-600 hover:text-FTT transition-colors duration-300">New Arrivals</Link>
              <Link href="/" className="text-gray-600 hover:text-FTT transition-colors duration-300">Accessories</Link>
              <Link href="/" className="text-gray-600 hover:text-FTT transition-colors duration-300">Men</Link>
              <Link href="/" className="text-gray-600 hover:text-FTT transition-colors duration-300">Women</Link>
              <Link href="/" className="text-gray-600 hover:text-FTT transition-colors duration-300">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg text-gray-800">HELP</h1>
            <div className="flex flex-col gap-4">
              <Link href="/shipping" className="text-gray-600 hover:text-FTT transition-colors duration-300">Shipping Information</Link>
              <Link href="/returns" className="text-gray-600 hover:text-FTT transition-colors duration-300">Returns & Refunds</Link>
              <Link href="/faq" className="text-gray-600 hover:text-FTT transition-colors duration-300">Customer Service</Link>
              <Link href="/contact" className="text-gray-600 hover:text-FTT transition-colors duration-300">Find a Store</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex flex-col gap-8">
          <h1 className="font-medium text-lg text-gray-800">SUBSCRIBE</h1>
          <p className="text-gray-600">
            Be the first to get the latest news about spices, veggies, and much
            more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4 focus:outline-none focus:ring-2 focus:ring-FTT/50"
            />
            <button className="w-1/4 bg-FTT text-white hover:bg-FTT/90 transition-colors duration-300">JOIN</button>
          </div>
          <span className="font-semibold text-gray-800">Secure Payments</span>
          <div className="flex justify-between">
            {['discover', 'skrill', 'paypal', 'mastercard', 'visa'].map((payment) => (
              <div
                key={payment}
                className="hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src={`/${payment}.png`}
                  alt={payment}
                  width={40}
                  height={20}
                  className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16 pt-8 border-t border-gray-200">
        <div className="text-gray-600">© 2024 FarmToTable Shop</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex items-center">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium text-gray-700">India | English</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium text-gray-700">₹ Rupees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
