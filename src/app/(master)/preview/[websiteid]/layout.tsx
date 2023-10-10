import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import * as React from 'react';

import '@/styles/globals.css';

import { getWebsiteDetails } from '@/lib/api/blogs-master';

import { MainNav } from '@/components/main-nav';
import { SiteFooter } from '@/components/site-footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

// If loading a variable font, you don't need to specify the font weight
const defaultFont = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
  variable: '--font-default',
});

interface LayoutProps {
  children: React.ReactNode;

  params: {
    websiteid: string;
  };
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const websiteDetails = await getWebsiteDetails(params.websiteid);

  return {
    title: {
      default: websiteDetails?.title + ' Preview',
      template: `%s | ${websiteDetails?.title}`,
    },
    description: websiteDetails?.summary,
    // keywords: siteConfig.keywords,
    robots: { index: true, follow: true },
    // icons: {
    //   icon: siteConfig.favicon,
    // },
    openGraph: {
      title: websiteDetails?.title,
      description: websiteDetails?.summary,
      siteName: websiteDetails?.title,
      images: [`/images/og.jpg`],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: websiteDetails?.title + ' Preview',
      description: websiteDetails?.summary,
      images: [`/images/og.jpg`],
    },
    themeColor: 'black',
  };
}

export default async function MarketingLayout({
  children,
  params,
}: LayoutProps) {
  const websiteDetails = await getWebsiteDetails(params.websiteid);

  return (
    <html>
      <body className={`${defaultFont.variable}`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='flex min-h-screen flex-col'>
            <header className='bg-background container z-40'>
              <div className='flex h-20 items-center justify-between py-6'>
                <MainNav
                  items={[
                    {
                      title: 'Home',
                      href: `/preview/${params.websiteid}`,
                    },
                    {
                      title: 'All Blogs',
                      href: `/preview/${params.websiteid}/blogs`,
                    },
                  ]}
                  basePath={`/preview/${params.websiteid}`}
                  websiteDetails={websiteDetails}
                />
              </div>
            </header>
            <main className='container flex-1'>{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
