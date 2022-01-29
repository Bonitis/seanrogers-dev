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
  logos: Record<string, string>;
  gallery?: string;
  sequence?: number
};

export interface ProjectMarkdownAttributes extends Omit<Project, 'logos'> {
    body: string;
};

export interface ProjectPage extends Omit<ProjectMarkdownAttributes, 'gallery'> {
    html: string;
    logos: Project['logos'];
    gallery: Record<string, string>;
}

// relative to the server output not the source!
const projectsPath = path.join(__dirname, "../../../../", "projects");
const assetsPath = path.join(__dirname, "../../../../", "assets");

const getStackLogos = async (stack: string): Promise<Record<string, string>> => {
    const technologies = stack.split(' | ');
    let logos: Record<string, string> = {};
    await Promise.all(technologies.map(async (tech) => {
        const imagePath = path.join(assetsPath, '/logos', `${tech}-logo.png`);
        const file = await fs.readFile(imagePath, { encoding: 'base64' });
        logos[tech] = file;
    }))
    return technologies.reduce((acc, tech) => {
        return { ...acc, [tech]: logos[tech] };
    }, {});
}

const getGalleryImages = async (imgs: string): Promise<Record<string, string>> => {
  const images = imgs.split(', ');
  let gallery: Record<string, string> = {};
  await Promise.all(images.map(async (img) => {
      const imagePath = path.join(assetsPath, '/screenshots', `${img}.png`);
      const file = await fs.readFile(imagePath, { encoding: 'base64' });
      gallery[img] = file;
  }))
  return images.reduce((acc, img) => {
      return { ...acc, [img]: gallery[img] };
  }, {});
}

const getThumbnail = async (thumbnail:string): Promise<string> => {
    const thumbPath = path.join(assetsPath, '/screenshots', `${thumbnail}.png`)
    console.log(thumbPath);
    const file = await fs.readFile(thumbPath, { encoding: 'base64' });
    return file;
}

export async function getProjects() {
  console.log(__dirname)
  console.log(projectsPath)
  const dir = await fs.readdir(projectsPath);
  return Promise.all(
    dir.map(async filename => {
      const file = await fs.readFile(
        path.join(projectsPath, filename)
      );
      const { attributes } = parseFrontMatter<ProjectMarkdownAttributes>(
        file.toString()
      );
      const logos = await getStackLogos(attributes.stack);
      const thumbnail = attributes.thumbnail && await getThumbnail(attributes.thumbnail);
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title,
        description: attributes.description,
        stack: attributes.stack,
        thumbnail,
        logos,
        sequence: attributes.sequence,
      };
    })
  );
}

export async function getProject(slug: string) {
    const filepath = path.join(projectsPath, slug + ".md");
    const file = await fs.readFile(filepath);
    const { attributes, body } = parseFrontMatter<ProjectMarkdownAttributes>(file.toString());
    const html = marked(body);
    const logos = await getStackLogos(attributes.stack);
    const thumbnail = attributes.thumbnail && await getThumbnail(attributes.thumbnail);
    const gallery = attributes.gallery && await getGalleryImages(attributes.gallery);
    return { html, logos, ...attributes, thumbnail, gallery };
  }