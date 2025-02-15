import { Post } from "@/interfaces/post";
import { Page } from "@/interfaces/page";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");
const contactPath = join(process.cwd(), "contact.md");
const infoPath = join(process.cwd(), "info.md");

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
