# Next.js E-commerce Store

A modern, full-featured e-commerce platform built with Next.js 14, TypeScript, and Wix as the backend. This project demonstrates how to build a scalable e-commerce solution with a beautiful user interface and robust functionality.

![E-commerce Store](public/screenshot.png)

## Features

- 🛍️ **Product Catalog**
  - Product listings with images
  - Product details pages
  - Category-based filtering
  - Search functionality
  - Pagination

- 🛒 **Shopping Cart**
  - Add/remove products
  - Quantity management
  - Real-time cart updates
  - Cart persistence

- 👤 **User Features**
  - User authentication
  - Profile management
  - Order history
  - Wishlist functionality

- 💳 **Checkout Process**
  - Secure checkout
  - Multiple payment options
  - Order confirmation
  - Order tracking

- 🎨 **Modern UI/UX**
  - Responsive design
  - Beautiful animations
  - Dark/Light mode
  - Mobile-first approach

## Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Wix
- **Authentication**: Wix Auth
- **Image Optimization**: Next.js Image
- **Form Handling**: React Hook Form
- **Data Fetching**: Wix SDK

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- npm or yarn
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanjanb/NextJs-Ecommerce.git
   cd NextJs-Ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_WIX_CLIENT_ID=your_client_id
   NEXT_PUBLIC_WIX_APP_ID=your_app_id
   FEATURED_PRODUCTS_FEATURED_CATEGORY_ID=your_category_id
   FEATURED_PRODUCTS_NEW_CATEGORY_ID=your_category_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Visit `http://localhost:3000` to see your application running.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── [slug]/            # Dynamic product pages
│   ├── cart/              # Cart related pages
│   ├── profile/           # User profile pages
│   ├── shop/              # Shop listing pages
│   └── ...                # Other pages
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── context/              # React context providers
└── styles/               # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Wix](https://www.wix.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/sanjanb/NextJs-Ecommerce/issues) on GitHub.

## Author

- **Sanjan B** - [GitHub](https://github.com/sanjanb)

---

Made with ❤️ by Sanjan B 