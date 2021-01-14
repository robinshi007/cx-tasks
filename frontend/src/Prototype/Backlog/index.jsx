import { Button } from 'antd';
import { BacklogPage } from './Styles';
import { HomeIcon } from '@/shared/components/Icon';

const Backlog = () => {
  return (
    <BacklogPage>
      BacklogPage
      <Button type="primary">New</Button>
      <HomeIcon size={24} color="red" />
    </BacklogPage>
  );
};

export default Backlog;
