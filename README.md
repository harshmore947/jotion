
# Notion Clone

A full-featured document management and note-taking application built with **Next.js**, inspired by **Notion**.



---

## ✨ Features

- **Real-time Database**: Changes sync instantly across all clients using **Convex**
- **Elegant Document Editor**: Rich text editing with **BlockNote** editor
- **Intuitive Document Management**:
  - Create, archive, and restore documents
  - Nested document hierarchy
  - Document trash bin with recovery options
- **Cover Images**: Upload and manage document cover images via **Cloudinary**
- **Dark/Light Mode**: Full theme support with system preference detection
- **Authentication**: Secure user authentication with **Clerk**
- **Search Functionality**: Quickly find documents with the command menu (`⌘+K`)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Customizable Interface**: Resizable sidebar and collapsible components

---

## 🛠 Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) with App Router
- **Database**: [Convex](https://www.convex.dev/) for real-time data syncing
- **Authentication**: [Clerk](https://clerk.dev/)
- **Editor**: [BlockNote](https://blocknote.dev/) for rich text editing
- **UI**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com) components
- **Media Storage**: [Cloudinary](https://cloudinary.com/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** or **yarn**
- **Convex** account
- **Clerk** account
- **Cloudinary** account

### 🧪 Environment Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/notion-clone.git
   cd notion-clone
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create `.env.local`** in the root directory with the following variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Initialize Convex**:

   ```bash
   npx convex dev
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser** and navigate to:  
   [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

Deploy the app easily using **Vercel**:

1. Push your code to **GitHub**
2. Connect your repository to **[Vercel](https://vercel.com/)**
3. Add all environment variables in the Vercel dashboard
4. Click **Deploy**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Convex](https://www.convex.dev/)
- [Clerk](https://clerk.dev/)
- [BlockNote](https://blocknote.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com)
- [Cloudinary](https://cloudinary.com/)

---

> Built with ❤️ by **Harshvardhan More**
