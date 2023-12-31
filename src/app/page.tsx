import { LandingView } from 'src/sections/view/landing-view';
import projectsServices from 'src/services/project-services';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Home',
};

const getActiveProjects = () => {

  const projects = projectsServices().getInProgressProjects()
  return projects

}

export default async function LandingPage() {

  let activeProjects: any = await getActiveProjects()

  return <LandingView activeProjects={activeProjects} />;
}
