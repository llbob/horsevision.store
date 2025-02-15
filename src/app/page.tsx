import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndexPage } from "../lib/api";
import Container from "@/app/_components/container";
import Image from "next/image";
import { PostBody } from "@/app/_components/post-body";
import markdownToHtml from "@/lib/markdownToHtml";
import Header from "@/app/_components/header";
import { ArrowRight } from "lucide-react";

export default async function Index() {
  // Get the data first
  const page = getIndexPage();

  if (!page) {
    return notFound();
  }

  // Convert content after getting page data
  const content = await markdownToHtml(page.content || "");

  // Add artificial delay AFTER getting the data
  // This ensures the loading state is shown even if data fetching is fast
  await new Promise(resolve => setTimeout(resolve, 2000));

  return (
    <main>
      <Container>
        <Header text="" />
        <article className="mb-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl tracking-tighter leading-tight mb-1">
              {page.title}
            </h1>
            <div className="font-semibold">
              <p>{page.releaseCode}</p>
              <p>{page.duration}</p>
            </div>

            {page.coverImage && (
              <div className="mb-8 md:mb-16 sm:mx-0">
                <Image
                  src={page.coverImage}
                  alt={page.title}
                  width={1000}
                  height={1000}
                  className="w-full h-auto"
                />
              </div>
            )}

            <div className="mb-8 text-lg">


              <div className="mt-6 space-y-6">
                {page.infoBlock1 && (
                  <div className="prose">
                    <p><span className="mr-2">﹂</span>{page.infoBlock1}</p>
                  </div>
                )}

                {page.infoBlock2 && (
                  <div className="prose">
                    <p><span className="mr-2">﹂</span>{page.infoBlock2}</p>
                  </div>
                )}

                {page.infoBlock3 && (
                  <div className="prose">
                    <p><span className="mr-2">﹂</span>{page.infoBlock3}</p>
                  </div>
                )}
              </div>

              {page.buyButtonText && (
                <div className="mt-8 flex">
                  <span className="mr-2">﹂</span>
                  <div className="block">
                    <a href={page.buyButtonLink} className="lemonsqueezy-button"><p className="text-2xl font-bold inline-flex items-center">{page.buyButtonText}<ArrowRight className="w-10 h-7 mt-1" /></p></a>
                    {page.price && (
                      <p className="text-base-text">{page.price}</p>
                    )}
                  </div>
                </div>
              )}


            </div>

            <PostBody content={content} />

            {page.copyrightBody && (
              <footer className="mt-12 text-xs text-center">
                <p className="text-subtle">{page.copyrightBody}</p>
                <p className="text-subtle mt-2">{page.copyrightEndText}</p>
              </footer>
            )}
          </div>
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const page = getIndexPage();

  if (!page) {
    return notFound();
  }

  const title = `${page.title}`;

  return {
    title,
  };
}