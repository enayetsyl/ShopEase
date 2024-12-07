import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

const ReviewSubmitForm = () => {
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission here
    setNewReviewText("");
    setNewReviewRating(5);
  };
  return (
    <form onSubmit={handleSubmitReview} className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold">Add a review</h3>

      <div>
        <Label>Rating</Label>
        <div className="flex gap-1 mt-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setNewReviewRating(i + 1)}
                className="p-1"
              >
                <Star
                  className={`w-6 h-6 ${
                    i < newReviewRating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted-foreground"
                  }`}
                />
              </button>
            ))}
        </div>
      </div>

      <div>
        <Label htmlFor="review">Your review</Label>
        <Textarea
          id="review"
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          className="mt-2"
          rows={4}
        />
      </div>

      <Button type="submit">Submit Review</Button>
    </form>
  );
};

export default ReviewSubmitForm;
