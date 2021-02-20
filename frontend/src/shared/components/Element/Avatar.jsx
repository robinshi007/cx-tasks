import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flex from '../Layout/Flex';
import Text from './Text';

// import { Flex, Heading, Text } from '..'

//import { User } from 'pcln-icons'
import { UserFollowedIcon } from './Icons';

const StyledImage = styled(Flex)`
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: ${(props) => props.size || 40}px;
  height: ${(props) => props.size || 40}px;
  background-size: ${(props) => props.size || 40}px;
  background-image: url(${(props) => props.src});
`;

function Avatar({ className, title, subtitle, src, initials, size, color, bg }) {
  return (
    <Flex className={className}>
      <StyledImage src={src} size={size} color={color} bg={bg}>
        {!src && initials && <Text fontSize={2}>{initials.toUpperCase().slice(0, 2)}</Text>}
        {!src && !initials && <UserFollowedIcon size={size - 6} />}
      </StyledImage>
      {title && (
        <Flex flexDirection="column" justifyContent="center" ml={3}>
          <Text.H6 m={0}>{title}</Text.H6>
          <Text color="text.light" fontSize={0}>
            {subtitle}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  src: PropTypes.string,
  initials: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  bg: PropTypes.string,
};

Avatar.defaultProps = {
  className: '',
  color: 'primary',
};

export default Avatar;
