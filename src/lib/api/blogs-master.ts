import { REVALIDATE_TIME } from '@/config';
import { blogApiMasterClient } from '@/packages/api';
import { BasicBlogView } from '@/packages/apigen';

export const getWebsiteDetails = async (websiteId: string) => {
  try {
    const companyInfo =
      await blogApiMasterClient.api.websiteDetailsApiV1MasterWebsiteDetailsGet(
        {
          websiteId,
        },
        {
          next: { revalidate: REVALIDATE_TIME },
        }
      );
    return companyInfo;
  } catch (error) {
    //
  }
};

export const fetchLatestBlogs = async (pageSize: number, websiteId: string) => {
  let blogs: BasicBlogView[] = [];
  try {
    const blogsRes =
      await blogApiMasterClient.api.latestBlogsApiV1MasterLatestBlogsGet(
        {
          pageSize: pageSize,
          websiteId,
        },
        { next: { revalidate: REVALIDATE_TIME } }
      );

    blogs = blogsRes;
  } catch (error) {
    //
  }

  return blogs;
};

export const fetchLatestBlogsPaginated = async (
  pageSize: number,
  page: number,
  websiteId: string
) => {
  try {
    const res =
      await blogApiMasterClient.api.latestBlogsPaginatedApiV1MasterLatestBlogsPaginatedGet(
        {
          pageSize: pageSize,
          page: page,
          websiteId,
        },
        { next: { revalidate: REVALIDATE_TIME } }
      );

    return res;
  } catch (error) {
    //
  }
};

export const listBlogs = async (websiteId: string) => {
  try {
    const blogs = websiteId;
    await blogApiMasterClient.api.listBlogsApiV1MasterListBlogsGet(
      {
        websiteId,
      },
      {
        next: { revalidate: REVALIDATE_TIME },
      }
    );
    return blogs;
  } catch (error) {
    //
  }
};

export const fetchBlog = async (blogSlug: string, websiteId: string) => {
  try {
    const blog =
      await blogApiMasterClient.api.blogDetailsApiV1MasterBlogDetailsGet(
        {
          blogSlug,
          websiteId,
        },
        { next: { revalidate: REVALIDATE_TIME } }
      );
    return blog;
  } catch (error) {
    return null;
  }
};

export const fetchAuthors = async (websiteId: string) => {
  try {
    const authors =
      await blogApiMasterClient.api.listAuthorsApiV1MasterListAuthorsGet(
        {
          websiteId,
        },
        {
          next: { revalidate: REVALIDATE_TIME },
        }
      );
    return authors;
  } catch (error) {
    return null;
  }
};

export const fetchAuthor = async (authorSlug: string, websiteId: string) => {
  try {
    const author =
      await blogApiMasterClient.api.authorDetailsApiV1MasterAuthorDetailsGet(
        {
          authorSlug,
          websiteId,
        },
        { next: { revalidate: REVALIDATE_TIME } }
      );
    return author;
  } catch (error) {
    return null;
  }
};

export const fetchTags = async (websiteId: string) => {
  try {
    websiteId;
    const tags = await blogApiMasterClient.api.listTagsApiV1MasterListTagsGet(
      {
        websiteId,
      },
      {
        next: { revalidate: REVALIDATE_TIME },
      }
    );
    return tags;
  } catch (error) {
    return null;
  }
};

export const fetchTag = async (tagSlug: string, websiteId: string) => {
  try {
    const tag =
      await blogApiMasterClient.api.tagDetailsApiV1MasterTagDetailsGet(
        {
          tagSlug,
          websiteId,
        },
        { next: { revalidate: REVALIDATE_TIME } }
      );
    return tag;
  } catch (error) {
    return null;
  }
};
