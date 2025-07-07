import BlogCard from "@/components/blogs/page";
import { Heart, MessageCircle, Share, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";

interface BlogItem {
  img: string;
  fulltext: string;
  header: string;
}

const fetchBlogData = async (): Promise<BlogItem[]> => {
  const res = await fetch("/api/blog");
  if (!res.ok) {
    throw new Error("Failed to fetch blog data.");
  }
  const data = await res.json();
  return data as BlogItem[];
};

const BlogCardSkeleton = () => (
  <div className="rounded-xl border-2 bg-slate-200 p-2 shadow-md md:p-10">
    <Skeleton className="mb-4 h-8 w-3/4" />
    <Skeleton className="h-48 w-full" />
    <div className="mt-4 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

const Blog = () => {
  const {
    data: blogContainer,
    isLoading,
    isError,
  } = useQuery<BlogItem[]>({ queryKey: ["blogData"], queryFn: fetchBlogData });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: any) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy(); // Cleanup on unmount
  }, []);

  return (
    <>
      <div
        id="main"
        className="flex min-h-screen w-full items-start justify-center gap-3 bg-gray-100 py-14"
      >
        <div className="min-h-30 sticky top-20 hidden w-[250px] gap-7 rounded-xl bg-slate-200 py-10 pt-[3rem] opacity-0 shadow-md lg:block">
          <div className="m-wun flex w-full items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300">
              MT
            </div>
            <h1>Muchkund Thote</h1>
          </div>
        </div>
        <div className="min-h-screen w-[600px] rounded-xl border-2 bg-slate-200 p-2 shadow-md md:w-[700px] md:p-10">
          <h1 className="md;ml-0 ml-2 text-3xl font-bold"> Blogs</h1>
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-red-400 bg-red-50 p-6 text-center text-red-700 shadow-sm">
              <TriangleAlert className="mb-4 h-12 w-12 text-red-500" />
              <span className="text-xl font-semibold">
                Error loading blog posts.
              </span>
              <p className="mt-2 text-sm">
                We couldn't load the blog posts. Please try again later.
              </p>
            </div>
          ) : blogContainer && blogContainer.length > 0 ? (
            blogContainer.map((blog, index: number) => (
              <BlogCard
                key={index}
                text={blog.fulltext || ""}
                imgurl={blog.img || ""}
                header={blog.header || ""}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
              <Typography
                variant="h3"
                className="text-xl font-semibold text-foreground"
              >
                No blog posts found
              </Typography>
              <p className="max-w-md text-sm text-muted-foreground">
                There are no blog posts to display at the moment.
              </p>
            </div>
          )}
        </div>

        <div className="sticky top-20 ml-2 hidden h-[330px] w-[370px] overflow-hidden rounded-xl bg-slate-200 lg:block">
          <div className="w-full p-3">
            <h1 className="text-xl">
              <b> What is Engineering India Blogs ?</b>
            </h1>
            <p>
              Engineering India Blogs keeps the engineering community updated on
              events, guides, and current affairs, fostering innovation and
              technical excellence.
            </p>
          </div>
          <Image src="/image/logo.png" alt="" width={50} height={50} />
          <hr />
          <div className="mt-2 flex w-full items-center justify-around">
            <Heart />
            <MessageCircle />
            <Share />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
