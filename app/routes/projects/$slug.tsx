import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getProject } from "~/project";

export const loader: LoaderFunction = async ({
  params
}) => {
    if (!params.slug) throw new Error('Missing slug');
    return getProject(params.slug);
};

export default function ProjectSlug() {
  const post = useLoaderData();
  return (
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  );
}