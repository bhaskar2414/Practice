"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Sample product data
const productsData = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    description: "High-quality wireless headphones with noise cancellation.",
    image:
      "https://www.bhphotovideo.com/images/images2500x2500/sony_mdr1a_b_mdr1ab_headphones_black_1080926.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    description: "Feature-rich smartwatch with health monitoring capabilities.",
    image:
      "https://www.bhphotovideo.com/images/images2500x2500/ematic_esw454w_smart_watch_white_1039958.jpg",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 129.99,
    description: "Compact wireless earbuds with amazing sound quality.",
    image:
      "http://i5.walmartimages.com/seo/SAMSUNG-Galaxy-Buds-2-Graphite_08f01bc4-db66-4182-86a2-0d0c5955b2cc.e58b07d6276c766f70348554ee17b306.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 89.99,
    description: "Portable speaker with 20 hours of battery life.",
    image:
      "https://i5.walmartimages.com/seo/LENRUE-Bluetooth-Portable-Speaker-IPX7-Waterproof-Speakerphone-20H-Playtime-Black_1b778b1e-d865-4c7c-913c-2bed5c97e3f2.be20e0318c2e6772945edc152c58025d.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 49.99,
    description: "Ergonomic laptop stand for better posture and comfort.",
    image:
      "https://m.media-amazon.com/images/I/61z7IoxTqAL._AC_UL640_FMwebp_QL65_.jpg",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 149.99,
    description: "Tactile mechanical keyboard for gaming and typing.",
    image:
      "https://m.media-amazon.com/images/I/81-WrT0-7gL._AC_UL640_FMwebp_QL65_.jpg",
  },
];

export default function ProductsList() {
  const [products, setProducts] = useState(productsData);
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle sorting
  const handleSort = (value) => {
    setSortBy(value);
    let sortedProducts = [...productsData];

    if (value === "price-low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "price-high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (value === "name") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Apply search filter to sorted results
    if (searchTerm) {
      sortedProducts = sortedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProducts(sortedProducts);
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    let filteredProducts = [...productsData];

    if (term) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Apply current sort to filtered results
    if (sortBy === "price-low") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(filteredProducts);
  };

  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="text-left">
          <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="w-full sm:w-64">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              id="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col h-full">
              <CardHeader className="p-4">
                <div className="aspect-square relative overflow-hidden rounded-md mb-2">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <Link to={`/products/${product.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No products found. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
