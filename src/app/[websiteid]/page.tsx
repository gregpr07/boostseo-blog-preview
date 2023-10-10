import Link from 'next/link';

import { fetchLatestBlogs, getWebsiteDetails } from '@/lib/api/blogs-master';

import { BlogPreviewCard } from '@/components/blogs/blog-preview-card';
import { Button } from '@/components/ui/button';

interface BlogPageProps {
  params: {
    websiteid: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const [websiteDetails, blogs] = await Promise.all([
    getWebsiteDetails(params.websiteid),
    fetchLatestBlogs(5, params.websiteid),
  ]);

  return (
    <div className='container max-w-4xl py-6 lg:py-6'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
        <div className='flex-1 space-y-4'>
          <h1 className='font-heading inline-block text-3xl font-semibold tracking-tight lg:text-4xl'>
            {websiteDetails?.name + ' - Blog Preview'}
          </h1>
          <p className='text-muted-foreground text-lg'>
            {websiteDetails?.summary}
          </p>
        </div>
      </div>
      {/* <hr className='my-8' /> */}
      {blogs?.length ? (
        <div>
          <div className='my-8 md:mb-16'>
            <BlogPreviewCard
              blog={blogs[0]}
              basePath={`/${params.websiteid}`}
            />
          </div>

          <div className='grid gap-10 pb-16 md:grid-cols-2'>
            {blogs.slice(1).map((blog) => (
              <BlogPreviewCard
                blog={blog}
                key={blog.id}
                basePath={`/${params.websiteid}`}
              />
            ))}
          </div>

          <div className='flex justify-center py-6'>
            <Link href={`/${params.websiteid}/blogs`}>
              <Button className='btn btn-primary' variant='outline'>
                Read More Blogs
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Such empty. Many wow.</p>
      )}
    </div>
  );
}
