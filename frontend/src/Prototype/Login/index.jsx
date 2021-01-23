import styled from 'styled-components';

import { Center, Box } from '@/shared/components/Layout';
import { Text, Link, Button, Input, Image } from '@/shared/components/Element';

import logoTextImage from '@/assets/logo_text.png';

export const LoginWrapper = styled(Center)`
  color: white;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) => props.theme.palette.primary.base};
`;

const LoginPage = () => {
  return (
    <LoginWrapper>
      <Center flex="1 0 auto" flexDirection="column">
        <Center width="360px" height="120px">
          <Image src={logoTextImage} />
        </Center>
        <Center width="360px" bg="white" px="48px" py={4} flexDirection="column" borderRadius="2px">
          <Text.H6 color="#555" mb="32px">
            Welcome to CxTasks
          </Text.H6>
          <Input placeholder="Email" mb="28px" />
          <Input type="password" placeholder="password" mb="28px" />
          <Button width="100%" mb="30px">
            Submit
          </Button>
          <Box>
            <Link color="primary" fontSize="14px" fontWeight={700} mr="14px">
              Cann't log in?
            </Link>
            <Link color="primary" fontSize="14px" fontWeight={700} mr={2}>
              Sign up for the account
            </Link>
          </Box>
        </Center>
        <Center height="40px"></Center>
      </Center>
      <Center flexShrink={0} height="48px" mt="36px">
        <Link color="white" fontSize="14px" mr="14px">
          Privacy policy
        </Link>
        <Link color="white" fontSize="14px">
          Term of use
        </Link>
      </Center>
    </LoginWrapper>
  );
};

export default LoginPage;
