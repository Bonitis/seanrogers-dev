import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getProject, ProjectPage } from "~/project";

export const loader: LoaderFunction = async ({
  params
}) => {
    if (!params.slug) throw new Error('Missing slug');
    return getProject(params.slug);
};

export default function ProjectSlug() {
  const project = useLoaderData<ProjectPage>();
  return (
    <div className="w-10/12 max-w-5xl mx-auto mb-8 flex flex-col items-center justify-between py-4 dark:text-white text-slate-800">
        <h1 className="text-indigo-800 dark:text-white text-7xl mb-2 font-bold">{project.title}</h1>
        <div className="flex border-t-1 border-slate-500 pt-2">
            {Object.keys(project.logos).length > 0 && Object.keys(project.logos).map((key: string) => {
                return project.logos[key] && (
                    <div key={key} data-tooltip aria-description={key}>
                        <img
                            src={`data:image/png;base64, ${project.logos[key]}`}
                            alt={key}
                            height="36px"
                            width="36px"
                            style={{ padding: '4px' }}
                        />
                    </div>
                )
            })}
        </div>
        <img src={`data:image/png;base64, ${project.thumbnail}`} alt={project.thumbnail} className="m-8 h-auto w-full" />
        <hr className="border-t-1 mb-8 w-full border-solid border-slate-500" />
        <div className="md-body" dangerouslySetInnerHTML={{ __html: project.html }} />
        <div className="flex flex-wrap justify-center">
            {Object.keys(project.gallery).length > 0 && Object.keys(project.gallery).map((key: string) => {
                return project.gallery[key] && (
                    <img
                        src={`data:image/png;base64, ${project.gallery[key]}`}
                        alt={key}
                        className="w-full lg:w-72 h-fit m-4 rounded-md p-2 bg-slate-300 object-scale-down hover:shadow-md lg:hover:scale-150 transition-transform"
                    />
                )
            })}
        </div>
    </div>
  );
}