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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail({ product, relatedProducts }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} added to your wishlist`,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Link
        href="/products"
        className="inline-flex items-center text-sm mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-muted/20 rounded-lg p-6 flex items-center justify-center">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-bold mb-4">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.specs.colors.map((color) => (
              <Badge key={color} variant="outline">
                {color}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <div className="flex items-center justify-center w-12">
                {quantity}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>

            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            <Button variant="outline" size="icon" onClick={handleAddToWishlist}>
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="features">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="pt-4">
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specs" className="pt-4">
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2">
                    <div className="font-medium capitalize">{key}</div>
                    <div>{Array.isArray(value) ? value.join(", ") : value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <p>
                Free shipping on orders over $50. Standard delivery 3-5 business
                days.
              </p>
              <p className="mt-2">
                Express delivery available (1-2 business days) for an additional
                fee.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id}>
                <CardHeader className="p-4">
                  <div className="aspect-square relative overflow-hidden rounded-md mb-2">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardTitle className="text-xl">
                    {relatedProduct.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground line-clamp-2">
                    {relatedProduct.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-lg font-bold">
                    ${relatedProduct.price.toFixed(2)}
                  </span>
                  <Link href={`/products/${relatedProduct.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
