"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface CheckoutCardProps {
  userId: string;
}

export default function CheckoutCard({ userId }: CheckoutCardProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Mock order items - in real app, these would come from cart
  const orderItems: OrderItem[] = [
    { name: "Vestibulum suscipit", quantity: 1, price: 165.0 },
    { name: "Vestibulum dictum magna", quantity: 1, price: 50.0 },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = 10.0;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const { clientSecret } = await response.json();

      const { error: paymentError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        },
      );

      if (paymentError) {
        setError(paymentError.message ?? "An error occurred");
      } else {
        // Handle successful payment
        window.location.href = "/success";
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Your order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span>Product</span>
              <span>Total</span>
            </div>
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Subtotal */}
          <div className="flex justify-between text-sm">
            <span>Cart Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>Flat Rate: ${shippingCost.toFixed(2)}</span>
          </div>

          {/* Total */}
          <div className="flex justify-between text-lg font-semibold">
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Separator />

          {/* Payment */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-md border p-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#dc2626",
                    },
                  },
                }}
              />
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <Button
              type="submit"
              className="w-full"
              disabled={!stripe || isLoading}
            >
              {isLoading ? "Processing..." : "Place order"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
