# Complete Beginner's Guide to Your Website

It makes perfect sense that you want to understand the codebase. Being able to independently add images, videos, and features like a WhatsApp integration will give you complete control!

Here is a simple, map-like guide explaining your **Next.js Frontend**, your **FastAPI Backend**, and practical tutorials on how to add features.

---

## 🗺️ 1. The Big Picture: How Your App Works

Your website is split into two halves:

1. **The Frontend (`/frontend`)**: What the user sees and interacts with. It is built using **Next.js** (a modern React framework). It handles the HTML/CSS/JavaScript.
2. **The Backend (`/backend`)**: The hidden "engine" of the website handling data processing, database interactions, and integrations (like WhatsApp or email). Built using **FastAPI** (Python).

They communicate via **APIs** (URLs that return data instead of physical websites).

---

## 🖥️ 2. The Next.js Frontend Guide

In Next.js, folders and files dictate your layout and web pages.

### Where is everything?
* **`app/`**: This is where your **Pages** and **Routing** happen. 
  * `app/page.js` = Your Homepage (`www.sunbow.com/`)
  * `app/offers/page.js` = Your Offers page (`www.sunbow.com/offers`)
  * `app/product/[id]/page.js` = Standard product page (`www.sunbow.com/product/123`)
* **`components/`**: These are reusable puzzle pieces to build the pages (e.g., `Hero.jsx`, `Navbar.jsx`, `ProductModal.jsx`).
* **`public/`**: This is where you put your static files like `.jpg`, `.png`, and `.svg` files. They can be accessed directly (e.g., `public/logo.png` is shown as `<img src="/logo.png" />`).

---

## 🐍 3. The FastAPI Backend Guide

Your Python backend follows an organized structure inside `/backend/app`:

* **`main.py`**: The entry point. It launches the API server.
* **`models/`**: Usually contains database "Tables" (SQLAlchemy architecture).
* **`schemas/`**: Contains Pydantic models. These check that the data sent to the backend has the correct shape (e.g., checking that an email has an `@` symbol).
* **`routers/`**: Think of these as "Controllers" that process the URLs, meaning if you request `GET /api/products`, a router file handles fetching the products and sending them back to the frontend.
* **`services/`**: Holds specialized business logic (like handling WhatsApp API setups).

---

## 🛠️ Step-by-Step: Adding Things Yourself

### 1. How to add images
1. Copy your `.png` or `.jpg` photo into the `frontend/public/` folder. (e.g., `frontend/public/product-1.jpg`).
2. Go to the Next.js component where you want the image to show.
3. Use the standard `<img>` tag or Next.js `<Image>` component.
```jsx
// Native HTML way
<img src="/product-1.jpg" alt="Silicone Wire" style={{ width: "100%", borderRadius: "8px" }} />

// Next.js Optimized Image (Faster loading)
import Image from 'next/image';

<Image 
  src="/product-1.jpg" 
  alt="Silicone Wire" 
  width={400} 
  height={300} 
  style={{ borderRadius: "8px" }}
/>
```

### 2. How to add a YouTube Video Link
To embed a YouTube video into any component or page:
1. Find your YouTube video, click **"Share"**, then click **"Embed"**, and copy the `<iframe ...>` code.
2. In your `.jsx` component, paste it but **remember React syntax**: `class` needs to be `className`, and inline styles `style="border: 0"` must be objects `style={{ border: 0 }}`.

```jsx
export default function VideoSection() {
    return (
        <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            ></iframe>
        </div>
    );
}
```

### 3. How to add a WhatsApp floating Icon
We can use a library called `lucide-react` (which is already installed) or an SVG. Or simply an Image!
Let's add a button that opens WhatsApp in the `components/FloatingContact.jsx` (or a similar location).

```jsx
import { MessageCircle } from 'lucide-react'; // Great icons!

export default function WhatsAppButton() {
    const phoneNumber = "919876543210"; // Replace with your number
    const message = "Hi, I want a bulk quote!";
    
    // Create WhatsApp Link
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                background: "#25D366", // WhatsApp Green
                color: "white",
                padding: "16px",
                borderRadius: "50%",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                cursor: "pointer",
                transition: "transform 0.2s"
            }}
        >
            {/* Displaying an icon */}
            <MessageCircle size={32} />
        </a>
    );
}
```
*Note: If you have your own WhatsApp `.svg` or `.png`, place it in the `public` folder and use `<img>` inside the `<a>` tag!*

### 4. How to create a Brand New Component
Let’s say you want to create an "FAQ" section.
1. Create a new file: `frontend/components/FaqSection.jsx`
2. Define your component:
```jsx
"use client"; // Add this if you rely on hooks like click events (useState)

export default function FaqSection() {
    return (
        <div style={{ padding: "40px 5%", background: "var(--card)" }}>
            <h2 className="title" style={{ fontSize: "32px", marginBottom: "20px" }}>
                 Frequently Asked Questions
            </h2>
            <div style={{ padding: "16px", border: "1px solid var(--border)", marginBottom: "10px" }}>
                 <strong style={{ color: "var(--orange)" }}>Do you ship worldwide?</strong>
                 <p style={{ color: "var(--muted)", marginTop: "8px" }}>Yes, we ship to over 50+ countries.</p>
            </div>
        </div>
    );
}
```
3. Show it on your homepage by importing it into `app/page.js`:
```jsx
// Inside app/page.js
import FaqSection from '../components/FaqSection';

export default function Home() {
    return (
        <main>
           <Hero />
           {/* Your new component */}
           <FaqSection />
        </main>
    )
}
```

---

## 🎯 Pro Tips for Exploring:
- **`npm run dev`**: Always keep this terminal command running. Any time you save a `.jsx` or `.js` file, it automatically updates your browser at `http://localhost:3000`.
- **"use client"**: If you are adding `onClick`, `useState()`, or `useEffect()`, the very first line of your file needs to be `"use client";`. If it's just pure HTML (like the product page layout), you don't need it!
- **CSS Variables**: Notice we use `var(--orange)` and `var(--card)`. We set those up earlier securely inside `components/GlobalStyles.jsx`. Use them to ensure your colors switch flawlessly between Light and Dark mode!
