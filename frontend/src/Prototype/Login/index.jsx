import { Button } from 'antd';
import { LoginPage } from './Styles';
import { HomeIcon } from '@/shared/components/Icon';

const Login = () => {
  return (
    <LoginPage>
      LoginPage
      <Button type="primary">New</Button>
      <HomeIcon size={24} color="red" />
    </LoginPage>
  );
};

export default Login;
