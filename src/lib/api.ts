import { Post } from "@/interfaces/post";
import { Page } from "@/interfaces/page";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { IndexPage } from "@/interfaces/indexPage";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPage(slug: string): Page | null {
  const fullPath = join(process.cwd(), `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title,
      content,
    } as Page;
  } catch (error) {
    console.error(`Error reading page ${slug}:`, error);
    return null;
  }
}

export function getIndexPage(): IndexPage | null {
  const fullPath = join(process.cwd(), "index.md");
  
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    return {
      slug: "index", // If making more of these, make sure to update the slug to the actual slug of the page
      title: data.title,
      pageLoadImage: data.pageLoadImage,
      releaseCode: data.releaseCode,
      duration: data.duration,
      infoBlock1: data.infoBlock1,
      infoBlock2: data.infoBlock2,
      infoBlock3: data.infoBlock3,
      price: data.price,
      copyrightBody: data.copyrightBody,
      copyrightEndText: data.copyrightEndText,
      coverImage: data.coverImage,
      buyButtonText: data.buyButtonText,
      buyButtonLink: data.buyButtonLink,
      content,
    } as IndexPage;
  } catch (error) {
    console.error("Error reading index page:", error);
    return null;
  }
}
