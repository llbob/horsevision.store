import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "../../lib/api";
import Container from "../_components/container";
import Header from "../_components/header";
import { PostBody } from "../_components/post-body";
import markdownToHtml from "../../lib/markdownToHtml";
import { Page } from "@/interfaces/page";

export default async function Info() {
  const page: Page | null = getPage("info");

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const page = getPage("info");

  if (!page) {
    return notFound();
  }

  const title = `${page.title} | Info`;

  return {
    title,
  };
}