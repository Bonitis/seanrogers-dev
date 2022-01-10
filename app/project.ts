import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import { marked } from "marked";

export interface Project {
  slug: string;
  title: string;
  thumbnail: string;
  description: string;
  stack: string;
};

export interface ProjectMarkdownAttributes extends Project {
    body: string;
};

// relative to the server output not the source!
const postsPath = path.join(__dirname, "..", "projects");

export async function getProjects() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      const file = await fs.readFile(
        path.join(postsPath, filename)
      );
      const { attributes } = parseFrontMatter<ProjectMarkdownAttributes>(
        file.toString()
      );
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title,
        description: attributes.description,
        stack: attributes.stack,
        thumbnail: attributes.thumbnail,
      };
    })
  );
}

export async function getProject(slug: string) {
    const filepath = path.join(postsPath, slug + ".md");
    const file = await fs.readFile(filepath);
    const { attributes, body } = parseFrontMatter<ProjectMarkdownAttributes>(file.toString());
    const html = marked(body);
    return { slug, html, title: attributes.title };
  }