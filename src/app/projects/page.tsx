import { ProjectsView } from 'src/sections/view/project-list-view';
import projectsServices from 'src/services/project-services';
import { Project } from 'src/types/project';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Projects',
};

export async function getAllProjects(): Promise<Project[]> {
  try {
    // Perform the logic to fetch projects from your service or API
    const projects: Project[] = await projectsServices().getAllProjects(); // Replace with your actual fetch logic
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

export default async function ProjectsPage() {
  let allProjects: Project[] | null = null;
  let error: string | null = null;

  // Fetch projects when the component renders
  getAllProjects()
    .then((projects) => {
      // Assign fetched projects to the allProjects variable
      allProjects = projects;
    })
    .catch((err) => {
      // Handle errors if fetching projects fails
      error = 'Failed to fetch projects';
      console.error('Error fetching projects:', err);
    });

  // Render the UI based on the fetched data or error status
  if (error) {
    return <div>Error: {error}</div>; // Display an error message if fetching fails
  } else if (allProjects === null) {
    return <div>Loading...</div>; // Display a loading indicator while fetching
  } else {
    return <ProjectsView allProjects={allProjects} />; // Render ProjectsView component with fetched projects
  }
}
