import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Preview - View Your Created Page',
  description:
    'Preview your page as it will appear to visitors. See how your design looks before publishing.',
  alternates: {
    canonical: 'https://dndbuilder.com/preview',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Page Preview - View Your Created Page',
    description:
      'Preview your page as it will appear to visitors. See how your design looks before publishing.',
    images: [
      {
        url: '/images/preview-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Page Builder Preview',
      },
    ],
  },
};
