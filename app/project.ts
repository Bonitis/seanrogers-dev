import path from "path";
import { promises as fs } from "fs";
import parseFrontMatter from "front-matter";
import { marked } from "marked";

export interface Project {
  slug: string;
  title: string;
  thumbnail: string;
  description: string;
  stack: string;
  logos: string[];
  gallery?: string;
  sequence?: number
};

export interface ProjectMarkdownAttributes extends Omit<Project, 'logos'> {
    body: string;
};

export interface ProjectPage extends Omit<ProjectMarkdownAttributes, 'gallery'> {
    html: string;
    logos: Project['logos'];
    gallery?: string[];
}

// relative to the server output not the source!
const projectsPath = path.join(__dirname, "../../..", "projects");

const getStackLogos = (stack: string): string[] => {
    return stack.split(' | ').map((name) => `${name}`);
}

export async function getProjects() {
  const dir = await fs.readdir(projectsPath);
  return Promise.all(
    dir.map(async filename => {
      const file = await fs.readFile(
        path.join(projectsPath, filename)
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
        logos: getStackLogos(attributes.stack),
        sequence: attributes.sequence,
      };
    })
  );
}

export async function getProject(slug: string): Promise<ProjectPage> {
    const filepath = path.join(projectsPath, slug + ".md");
    const file = await fs.readFile(filepath);
    const { attributes, body } = parseFrontMatter<ProjectMarkdownAttributes>(file.toString());
    const html = marked(body);
    const gallery = attributes.gallery?.split(', ').map((name) => `screenshots/${name}.png`);
    return { html, logos: getStackLogos(attributes.stack), ...attributes, gallery };
  }