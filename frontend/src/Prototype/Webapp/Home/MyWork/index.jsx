import React from 'react';
import styled from 'styled-components';
//import { Tabs, List } from 'antd';
import { grommet, Grommet, Box as BBox, Tab, Tabs, List } from 'grommet';

import { Box, Flex, Center } from '@/shared/components/Layout';
import { Text, Link } from '@/shared/components/Element';
//import { Text, Link, Avatar, SquareShapeIcon } from '@/shared/components/Element';

//const { TabPane } = Tabs;

export const MyWorkWrapper = styled.div``;

const MyWorkPage = () => {
  const [index, setIndex] = React.useState();
  const onActive = (nextIndex) => setIndex(nextIndex);
  const listData = [
    { name: 'Decide the design colors' },
    { name: 'Redesign the kanban page this week' },
    { name: 'Test the cover of the card' },
  ];
  const listData2 = [
    { name: 'Design the new logo' },
    { name: 'Deploy the postgresql database service' },
  ];
  return (
    <MyWorkWrapper>
      <Box mb="10px">
        <Text.H6 color="text.base">My Work</Text.H6>
      </Box>
      <Box bg="background.lightest" px={3} py={2} mb={3}>
        <Text.Subtitle2 color="text.base" fontSize="10px" mb="4px">
          Recent projects
        </Text.Subtitle2>
        <Box flexDirection="row" display="flex">
          <Flex minHeight="100px" width="200px" bg="white" mr={3} mb={2} borderRadius="3px">
            <Box bg="#ce93d8" width="24px" height="100%" borderRadius="3px"></Box>
            <Flex p={2} flexDirection="column" justifyContent="space-between" width="100%">
              <Text color="text.base" fontSize="14px" fontWeight="600">
                Project1
              </Text>
              <Box
                fontSize="14px"
                fontWeight="400"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text color="text.base">My Open Tasks</Text>
                <Center
                  color="text.base"
                  bg="background.light"
                  minWidth="16px"
                  borderRadius="9999px"
                  fontSize="14px"
                  height="16px"
                >
                  1
                </Center>
              </Box>
              <Link fontSize="13px">QUICK LINKS</Link>
            </Flex>
          </Flex>
          <Flex minHeight="100px" width="200px" bg="white" mr={3} mb={2} borderRadius="3px">
            <Box bg="#ffe082" width="24px" height="100%" borderRadius="3px"></Box>
            <Flex p={2} flexDirection="column" justifyContent="space-between" width="100%">
              <Text color="text.base" fontSize="14px" fontWeight="600">
                Project2
              </Text>
              <Box
                fontSize="14px"
                fontWeight="400"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text color="text.base">My Open Tasks</Text>
                <Center
                  color="text.base"
                  bg="background.light"
                  minWidth="14px"
                  borderRadius="9999px"
                  fontSize="14px"
                  height="16px"
                >
                  1
                </Center>
              </Box>
              <Link fontSize="13px">QUICK LINKS</Link>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Grommet theme={grommet}>
          <Tabs activeIndex={index} onActive={onActive} justify="start">
            <Tab title="Worked on">
              <BBox margin="small" gap="small">
                <List primaryKey="name" data={listData} />
              </BBox>
            </Tab>
            <Tab title="Assigned to me">
              <BBox margin="small">
                <List primaryKey="name" data={listData2} />
              </BBox>
            </Tab>
          </Tabs>
        </Grommet>
      </Box>
    </MyWorkWrapper>
  );
};

export default MyWorkPage;
