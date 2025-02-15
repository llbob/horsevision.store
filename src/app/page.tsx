import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndexPage } from "../lib/api";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Index() {
  const page = getIndexPage();

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
              {page.title}
            </h1>
            
            {page.coverImage && (
              <div className="mb-8 md:mb-16 sm:mx-0">
                <img
                  src={page.coverImage}
                  alt={page.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            <div className="mb-8 text-lg">
              <div className="font-semibold text-gray-600">
                <p>{page.releaseCode}</p>
                <p>{page.duration}</p>
              </div>
              
              <div className="mt-6 space-y-6">
                {page.infoBlock1 && (
                  <div className="prose">
                    <p>{page.infoBlock1}</p>
                  </div>
                )}
                
                {page.infoBlock2 && (
                  <div className="prose">
                    <p>{page.infoBlock2}</p>
                  </div>
                )}
                
                {page.infoBlock3 && (
                  <div className="prose">
                    <p>{page.infoBlock3}</p>
                  </div>
                )}
              </div>

              {page.price && (
                <div className="mt-8">
                  <p className="text-2xl font-bold">{page.price}</p>
                </div>
              )}

              {page.buyButtonText && (
                <div className="mt-8">
                  <a href={page.buyButtonLink} className="lemonsqueezy-button">{page.buyButtonText}</a>
                </div>
              )}
            </div>

            <PostBody content={content} />

            {page.copyright && (
              <footer className="mt-12 text-sm text-gray-500">
                <p>{page.copyright}</p>
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