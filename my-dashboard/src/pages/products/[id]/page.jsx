import { toast } from "sonner";
import { useParams } from "react-router-dom";
import ProductDetails from "../ProductDetails";

// Sample product data (in a real app, this would come from an API or database)
const productsData = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    description:
      "High-quality wireless headphones with noise cancellation. These headphones feature premium audio drivers for crystal clear sound, active noise cancellation to block out ambient noise, and a comfortable over-ear design for extended listening sessions. With up to 30 hours of battery life and quick charging capabilities, these headphones are perfect for travel, work, or everyday use.",
    image:
      "https://www.bhphotovideo.com/images/images2500x2500/sony_mdr1a_b_mdr1ab_headphones_black_1080926.jpg",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium audio drivers",
      "Comfortable over-ear design",
      "Quick charging (3 hours of playback from 10 minutes of charging)",
    ],
    specs: {
      connectivity: "Bluetooth 5.2",
      weight: "250g",
      colors: ["Black", "Silver", "Blue"],
    },
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    description:
      "Feature-rich smartwatch with health monitoring capabilities. This smartwatch combines style with functionality, offering comprehensive health tracking including heart rate monitoring, sleep analysis, and activity tracking. With a vibrant AMOLED display and water resistance up to 50 meters, it's designed for all-day wear in any condition. The watch also offers smart notifications, music control, and contactless payments.",
    image:
      "https://www.bhphotovideo.com/images/images2500x2500/ematic_esw454w_smart_watch_white_1039958.jpg",
    features: [
      "Health monitoring (heart rate, sleep, activity)",
      "AMOLED display",
      "Water resistant (50m)",
      "Smart notifications",
      "7-day battery life",
    ],
    specs: {
      display: '1.4" AMOLED',
      connectivity: "Bluetooth 5.0, Wi-Fi",
      weight: "45g",
      colors: ["Black", "Silver", "Rose Gold"],
    },
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 129.99,
    description:
      "Compact wireless earbuds with amazing sound quality. These earbuds deliver immersive audio in a truly wireless form factor. Featuring custom-designed drivers and adaptive EQ, they automatically tune music to the shape of your ear for a rich, consistent listening experience. With active noise cancellation and transparency mode, you can control how much of the outside world you hear.",
    image:
      "http://i5.walmartimages.com/seo/SAMSUNG-Galaxy-Buds-2-Graphite_08f01bc4-db66-4182-86a2-0d0c5955b2cc.e58b07d6276c766f70348554ee17b306.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    features: [
      "Custom high-excursion drivers",
      "Active Noise Cancellation",
      "Transparency mode",
      "Sweat and water resistant",
      "24-hour total battery life with charging case",
    ],
    specs: {
      connectivity: "Bluetooth 5.0",
      weight: "5.4g per earbud",
      colors: ["White", "Black", "Green"],
    },
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 89.99,
    description:
      "Portable speaker with 20 hours of battery life. This compact Bluetooth speaker delivers surprisingly powerful, room-filling sound with deep bass. Its durable, waterproof design makes it perfect for outdoor adventures, while the long battery life ensures your music keeps playing all day long. With built-in microphone, you can also take calls directly through the speaker.",
    image:
      "https://i5.walmartimages.com/seo/LENRUE-Bluetooth-Portable-Speaker-IPX7-Waterproof-Speakerphone-20H-Playtime-Black_1b778b1e-d865-4c7c-913c-2bed5c97e3f2.be20e0318c2e6772945edc152c58025d.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    features: [
      "360° sound",
      "Waterproof (IPX7)",
      "20-hour battery life",
      "Built-in microphone",
      "Compact design",
    ],
    specs: {
      connectivity: "Bluetooth 5.1",
      weight: "540g",
      colors: ["Black", "Blue", "Red", "Teal"],
    },
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 49.99,
    description:
      "Ergonomic laptop stand for better posture and comfort. This adjustable laptop stand elevates your screen to eye level, promoting better posture and reducing neck and back strain during long work sessions. Made from premium aluminum, it's both lightweight and sturdy, supporting laptops up to 17 inches. The open design promotes airflow to keep your device cool.",
    image:
      "https://m.media-amazon.com/images/I/61z7IoxTqAL._AC_UL640_FMwebp_QL65_.jpg",
    features: [
      "Adjustable height and angle",
      "Premium aluminum construction",
      "Foldable design for portability",
      'Compatible with laptops up to 17"',
      "Enhanced airflow for cooling",
    ],
    specs: {
      material: "Aluminum alloy",
      weight: "310g",
      colors: ["Silver", "Space Gray", "Rose Gold"],
    },
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 149.99,
    description:
      "Tactile mechanical keyboard for gaming and typing. This mechanical keyboard features premium switches for a satisfying typing experience and faster response times for gaming. With customizable RGB backlighting and programmable keys, you can personalize your setup to match your style and workflow. The durable construction and detachable USB-C cable ensure this keyboard will last for years.",
    image: "/placeholder.svg?height=400&width=400",
    features: [
      "Mechanical switches",
      "RGB backlighting",
      "Programmable keys",
      "N-key rollover",
      "Detachable USB-C cable",
    ],
    specs: {
      switchType: "Cherry MX Brown",
      layout: "Full-size (104 keys)",
      weight: "960g",
      colors: ["Black", "White"],
    },
  },
];

export default function ProductPage() {
  const { id } = useParams();
  console.log("params : ", id);
  const product = productsData.find((p) => p.id == Number.parseInt(id));

  if (!product) {
    toast.error("Product not found.");
  }

  // Find related products (excluding current product)
  const relatedProducts = productsData
    .filter((p) => p.id !== product.id)
    .slice(0, 3); // Limit to 3 related products

  console.log("product : ", product);

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
