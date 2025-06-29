export type Media = {
  id: string;
  url: string;
  source?: "library" | "url" | "local";
  base64Data?: string;
  height?: number;
  width?: number;
  name?: string;
  path?: string;
  altText?: string;
  caption?: string;
  updatedAt: string;
  size?: number;
  sizes?: {
    thumbnail?: {
      height: number;
      path: string;
      size: number;
      url: string;
      width: number;
    };
    medium?: {
      height: number;
      path: string;
      size: number;
      url: string;
      width: number;
    };
  };
};
