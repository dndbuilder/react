import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Latest News and Updates from DnD Builder',
  description:
    'Stay updated with the latest news, feature announcements, tutorials, and tips from the DnD Builder team.',
  keywords: [
    'blog',
    'news',
    'updates',
    'tutorials',
    'tips',
    'announcements',
  ],
  alternates: {
    canonical: 'https://dndbuilder.com/posts',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Blog - Latest News and Updates from DnD Builder',
    description:
      'Stay updated with the latest news, feature announcements, tutorials, and tips from the DnD Builder team.',
  },
};