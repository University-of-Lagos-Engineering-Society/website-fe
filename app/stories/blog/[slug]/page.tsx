import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';

import { BLOG_ITEMS, SITE_URL } from '@/components/constants';
import { AboutAuthor } from '@/components/blog/AboutAuthor';
import { ContinueReading } from '@/components/blog/ContinueReading';
import { ShareNews } from '@/components/news/ShareNews';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleJsonLd, pageMetadata } from '@/lib/seo';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = BLOG_ITEMS.find((item) => item.slug === slug);
  if (!post) return {};

  return pageMetadata({
    title: post.details.title,
    description: post.details.description,
    path: `/stories/blog/${slug}`,
    image: post.imageUrl,
    type: 'article',
    authors: [post.details.author],
    keywords: ['ULES blog', post.category, post.details.title],
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = BLOG_ITEMS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const { details, imageUrl, imageAlt, blogLink } = post;
  const { title, author, longDate, authorBio, authorPfp, body } = details;

  // Plain prose, unlike the digest bodies — paragraphs only, no heading pass.
  // Lines that are nothing but a URL are dropped: the Substack link is the
  // call-to-action below, so leaving it inline would print the same address
  // twice, once as raw text mid-article.
  const paragraphs = body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !/^https?:\/\/\S+$/.test(line));

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title,
          description: details.description,
          path: `/stories/blog/${slug}`,
          image: imageUrl,
          author,
        })}
      />

      <div className="px-section py-6 md:py-8 lg:py-11">
        <Link
          href="/stories/blog"
          className="text-primary hover:text-accent inline-flex items-center gap-2 text-base/6 font-medium transition-colors"
        >
          <ArrowLeft className="size-5 shrink-0" aria-hidden="true" />
          Go back
        </Link>
      </div>

      <article className="px-section pb-8 md:pb-10 lg:pb-16">
        <div className="text-accent flex flex-wrap items-center gap-x-4 gap-y-1 text-sm/5 md:text-base/6">
          <p className="flex items-center gap-x-2">
            <User className="size-4 shrink-0 md:size-4.5" aria-hidden="true" />
            <span>{author}</span>
          </p>
          <p className="flex items-center gap-x-2">
            <Calendar className="size-4 shrink-0 md:size-4.5" aria-hidden="true" />
            <span>{longDate}</span>
          </p>
        </div>

        <h1 className="text-primary mt-4 text-3xl/9 font-medium md:text-4xl/11 lg:text-5xl/12">
          {title}
        </h1>

        {/* 1216 × 481 in the frame. */}
        <div className="relative mt-6 aspect-1216/481 w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1280px) 78vw, 100vw"
            priority
            className="object-cover"
          />
        </div>

        <div className="mt-8">
          <ContinueReading href={blogLink}>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mt-4 text-lg/7 text-gray-700 first:mt-0 lg:text-xl/[32.5px]"
              >
                {paragraph}
              </p>
            ))}
          </ContinueReading>
        </div>

        <ShareNews
          title={title}
          url={`${SITE_URL}/stories/blog/${slug}`}
          label="Share post"
        />

        <AboutAuthor name={author} bio={authorBio} pfp={authorPfp}  />
      </article>
    </>
  );
}
