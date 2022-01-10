import { useLoaderData, Link } from "remix";
import { getProjects, Project } from "~/project";

export const loader = () => {
    return getProjects();
};

export default function Projects() {
    const projects = useLoaderData<Project[]>();
    return (
      <div>
        <h1>Projects</h1>
        <ul>
        {projects.map(project => (
          <li key={project.slug}>
            <Link to={project.slug}>{project.title}</Link>
            <p>{project.stack}</p>
          </li>
        ))}
      </ul>
      </div>
    );
  }