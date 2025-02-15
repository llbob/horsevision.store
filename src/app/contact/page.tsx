import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import Container from "../_components/container";
import Header from "../_components/header";

export default async function Contact() {
  const page = getPage("contact");

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
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const page = getPage("contact");

  if (!page) {
    return notFound();
  }

  return {
    title: `${page.title} | Contact`,
  };
}