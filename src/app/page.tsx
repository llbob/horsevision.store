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
  const page = getIndexPage();

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  return (
    <main>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 animate-fadeIn"
        style={{ animation: 'fadeOut 2s forwards' }}>
        {page.pageLoadImage && (
          <div className="mb-8 flex justify-center relative">
            <div className="relative overflow-hidden w-[300px]">
              <Image
                src={page.pageLoadImage}
                alt="Loading"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
              <div className="absolute inset-0 bg-background animate-revealFromLeft opacity-70 blur-md" 
                   style={{ 
                     width: '300%', 
                     left: '-100%'
                   }} />
            </div>
          </div>
        )}
      </div>

      <Container>
        <Header text="" />
        <article className="mb-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-4xl tracking-tighter leading-tight mb-0">
              {page.title}
            </h1>
            <div className="text-base">
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
                  <span className="mr-2 text-2xl">﹂</span>
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