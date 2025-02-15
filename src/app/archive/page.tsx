import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "../../lib/api";
import Container from "../_components/container";
import Header from "../_components/header";
import { PostBody } from "../_components/post-body";
import markdownToHtml from "../../lib/markdownToHtml";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "../../lib/api";

export default async function Archive() {
  const page = getPage("archive");

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);
  
  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const page = getPage("archive");

  if (!page) {
    return notFound();
  }

  const title = `${page.title} | Archive`;

  return {
    title,
  };
}