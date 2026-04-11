export type MemoryItem = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export type MessageItem = {
  id: string;
  text: string;
};

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  description: string;
};
