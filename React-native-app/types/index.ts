export interface Article {
  id: string;
  title: string;
  summary: string;
  content?: string;
  imageUrl?: string;
  url?: string;
  publishedAt: string;
  source: string;
  category?: string;
}