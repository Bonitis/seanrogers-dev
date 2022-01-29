import { Link, useLoaderData } from "remix";
import { getProjects, Project } from "../project";
import StackLogos from '../components/StackLogos';

export const loader = () => {
    return getProjects();
};

const sortProjects = (a: Project, b: Project) => {
  return (a.sequence || 0) - (b.sequence || 0);
}

export default function Index() {
  const projects = useLoaderData<Project[]>();
  return (
    <div>
      <div className="bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white mx-auto mb-16 w-full py-16">
        <div className="w-10/12 max-w-5xl mx-auto">
          <h1 className="mb-4 text-5xl font-light">Hello, I am Sean 👋</h1>
          <p className="text-indigo-800 dark:text-indigo-200 text-2xl font-light">I am a self-taught software developer, ex-founder, and currently engineering at Ekos.</p>
        </div>
      </div>
      <div className="w-full md:w-10/12 mx-auto">
        <h2 className="text-center w-full text-2xl font-light mb-8 mt-2 dark:text-white">Projects</h2>
          <div className="max-w-5xl grid grid-cols-1 gap-24 mx-8 md:mx-auto">
            {projects.sort(sortProjects).map(project => (
              <div key={project.slug} className="flex flex-col md:flex-row rounded">
                <div className="flex flex-col md:h-72 mb-8 md:mb-0 md:mr-16 w-full md:w-4/12">
                  <div>
                    <h3 className="text-slate-700 dark:text-white font-bold text-3xl pb-1">{project.title}</h3>
                    <p className="mt-4 font-light text-slate-800 dark:text-white">{project.description}</p>
                    <div className="flex mt-4">
                      <StackLogos logos={project.logos} size={32} />
                    </div>
                  </div>
                  <Link prefetch="intent" to={`projects/${project.slug}`} className="text-indigo-800 dark:text-white hover:text-white dark:hover:text-indigo-800 hover:bg-indigo-800 dark:hover:bg-white cursor-pointer font-bold text-lg border-4 border-solid border-indigo-800 dark:border-white rounded-lg flex justify-center items-center mt-4 py-2 px-16 w-fit transition-colors">Details</Link>
                </div>
                <div className="rounded-lg bg-slate-100 dark:bg-slate-700 p-4 md:pb-0 md:pt-8 md:px-8 w-full md:w-8/12 h-36 sm:h-48 md:h-72 overflow-hidden">
                  <img src={`data:image/png;base64, ${project.thumbnail}`} alt={project.thumbnail} />
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
