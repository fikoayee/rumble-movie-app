export default interface Recommendation {
    id: string;
    imageURL: string;
    title: string;
    summary: string;
    rating: number;
    isAccepted?: boolean;
  }
  