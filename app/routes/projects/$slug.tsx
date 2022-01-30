import { MetaFunction, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getProject, ProjectPage } from "~/project";
import Gallery from "~/components/Gallery";
import StackLogos from "~/components/StackLogos";

export const loader: LoaderFunction = async ({
  params
}) => {
    if (!params.slug) throw new Error('Missing slug');
    return getProject(params.slug);
};

export const meta: MetaFunction = ({ data, params }) => {
    console.log(data || 'HEY NO DATA')
    if (!data) return { title: params.slug || '', description: '', keywords: '' };
    return {
        title: data.title,
        description: data.description || '',
        keywords: data.stack ? data.stack.split(' | ').join(',') : ""
    };
  };

export default function ProjectSlug() {
  const project = useLoaderData<ProjectPage>();
  return (
    <div className="w-10/12 max-w-5xl mx-auto mb-8 flex flex-col items-center justify-between py-4 dark:text-white text-slate-800">
        <h1 className="text-indigo-800 dark:text-white text-7xl mb-2 font-bold">{project.title}</h1>
        <div className="flex border-t-1 border-slate-500 pt-2">
            <StackLogos logos={project.logos} size={36} />
        </div>
        <img src={`data:image/png;base64, ${project.thumbnail}`} alt={project.thumbnail} className="m-8 h-auto w-full" />
        <hr className="border-t-1 mb-8 w-full border-solid border-slate-500" />
        <div className="md-body" dangerouslySetInnerHTML={{ __html: project.html }} />
        <Gallery gallery={project.gallery} />
    </div>
  );
}