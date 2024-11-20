export interface Review {
    id: number;
    title: string;
    rating: number;
    comment: string;
    user: string; // Or a more detailed user object if needed
    created_at: string; // Date as a string, adjust to your date format
  }