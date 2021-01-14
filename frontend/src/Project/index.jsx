import { Button } from 'antd';
import { ProjectPage } from './Styles';
import { HomeIcon } from '@/shared/components/Icon';

const Project = () => {
  return (
    <ProjectPage>
      ProjectPage
      <Button type="primary">New</Button>
      <HomeIcon size={24} color="red" />
    </ProjectPage>
  );
};

export default Project;
