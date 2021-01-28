import styled from 'styled-components';
import React, { useCallback, useContext, useState, useRef, useEffect } from 'react';
//import { Tabs, List } from 'antd';
import {
  grommet,
  Grommet,
  Button,
  DataTable,
  Menu,
  ResponsiveContext,
  Text,
  Box,
  TextInput,
  Header,
  Anchor,
  Select,
  Layer,
  Heading,
} from 'grommet';

import { Box as BBox } from '@/shared/components/Layout';
import {
  Text as BText,
  SearchIcon,
  ClearIcon,
  FilterIcon,
  MoreIcon,
} from '@/shared/components/Element';

const StyledButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;
const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

const allData = [
  {
    name: 'Product Design of CxTasks',
    status: 'InProgress',
    dueDate: '04/30/2020',
  },
  {
    name: 'Frontend develpment of CxTasks',
    status: 'Created',
    dueDate: '04/05/2020',
  },
  {
    name: 'Backend develpment of CxTasks',
    status: 'Created',
    dueDate: '03/04/2020',
  },
];

const defaultSelectValue = 'All';
const defaultFilters = {};

const onClickHandler = (record) => {
  // eslint-disable-next-line no-alert
  alert(`
    Record was clicked:
    { 
        name: ${record.name}
        status: ${record.status}
        dueDate: ${record.dueDate}
    }
  `);
};

const columns = [
  {
    property: 'name',
    header: 'Name',
    render: (datum) => (
      <Button onClick={() => onClickHandler(datum)}>
        <Text truncate>{datum.name}</Text>
      </Button>
    ),
  },
  {
    property: 'status',
    header: 'Status',
    render: (datum) => <Text truncate>{datum.status}</Text>,
  },
  {
    property: 'dueDate',
    header: 'Due Date',
    render: (datum) => datum.dueDate && new Date(datum.dueDate).toLocaleDateString(),
  },
  {
    property: 'action',
    header: '',
    render: (datum) => (
      <Menu
        size="small"
        icon={<MoreIcon size={18} />}
        hoverIndicator
        items={[{ label: 'Manage Host' }]}
      />
    ),
    align: 'end',
  },
];

export const ProjectsWrapper = styled.div``;

const ProjectsPage = () => {
  const size = React.useContext(ResponsiveContext);
  const [selected, setSelected] = React.useState([]);

  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchFocused, setSearchFocused]);

  const filterData = useCallback(
    (array, criteria, searchValue = search) => {
      if (Object.keys(criteria).length) setFiltering(true);
      else setFiltering(false);
      setFilters(criteria);

      let filterResults;
      const filterKeys = Object.keys(criteria);
      filterResults = array.filter((item) => {
        // validates all filter criteria
        return filterKeys.every((key) => {
          // ignores non-function predicates
          if (typeof criteria[key] !== 'function') return true;
          console.log('item', item);
          console.log('key', key);
          return criteria[key](item[key]);
        });
      });
      if (searchValue) {
        filterResults = filterResults.filter((o) =>
          Object.keys(o).some(
            (key) =>
              typeof o[key] === 'string' && o[key].toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      }
      return filterResults;
    },
    [search]
  );

  useEffect(() => {
    if (filters !== defaultFilters) {
      setFiltering(true);
    } else {
      setFiltering(false);
    }
    const nextData = filterData(allData, filters, search);
    setData(nextData);
  }, [search, filterData, filters, setFiltering]);

  const filterProps = {
    data,
    setData,
    setSearch,
    filterData,
    filters,
    setFilters,
    filtering,
    setFiltering,
  };

  return (
    <ProjectsWrapper>
      <BBox mb="10px">
        <BText.H6 color="text.base">Projects</BText.H6>
      </BBox>
      <BBox>
        <Grommet theme={grommet}>
          <TableControls selected={selected} data={data} />
          <Box align="center" direction="row" gap="small">
            <Box width="medium">
              <StyledTextInput
                ref={inputRef}
                type="search"
                icon={<SearchIcon id="search-icon" />}
                placeholder="Search something"
                onBlur={() => setSearchFocused(false)}
                value={search}
                onChange={(event) => {
                  console.log('val', event.target.value);
                  setSearch(event.target.value);
                  const nextData = filterData(allData, filters, event.target.value);
                  setData(nextData);
                }}
              />
            </Box>
            <Filters {...filterProps} />
          </Box>
          <Box width="full">
            <DataTable
              data={data}
              primaryKey="name"
              columns={[...columns]}
              pin={size === 'small'}
              select={selected}
              onSelect={setSelected}
              sort={{ property: 'dueDate', direction: 'desc' }}
              sortable
            />
          </Box>
        </Grommet>
      </BBox>
    </ProjectsWrapper>
  );
};

const ActionsMenu = styled(Menu)`
  border: 1px solid ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
`;

const TableControls = ({ selected, data }) => {
  const demoActionHandler = (records) => {
    // eslint-disable-next-line no-alert
    alert(
      `
      Handler called to perform an action
      against these records:
      [${records}]
      `
    );
  };

  return (
    <Box direction="row" fill="horizontal" justify="between" pad={{ vertical: 'small' }}>
      <Box justify="center">
        <SelectionSummary selected={selected} data={data} />
      </Box>
      <ActionsMenu
        label="Actions"
        items={[
          {
            label: 'Export',
            onClick: () => {
              demoActionHandler(selected);
            },
          },
        ]}
      />
    </Box>
  );
};

const SelectionSummary = ({ selected, data }) => {
  return (
    <>
      {selected && (
        <>
          {selected.length > 0 ? (
            <Box direction="row" gap="xxsmall">
              <Text size="small" weight="bold">
                {selected.length}
              </Text>
              <Text size="small">of</Text>
              <Text size="small" weight="bold">
                {data.length}
              </Text>
              <Text size="small">items selected</Text>
            </Box>
          ) : (
            <Box direction="row" gap="xxsmall">
              <Text size="small" weight="bold">
                {data.length}
              </Text>
              <Text size="small">items</Text>
            </Box>
          )}
        </>
      )}
    </>
  );
};

const Filters = ({
  filtering,
  filters,
  setData,
  setSearch,
  filterData,
  setFilters,
  setFiltering,
}) => {
  const [selectValue, setSelectValue] = useState(defaultSelectValue);
  const [previousValues, setPreviousValues] = useState({});
  const [previousFilters, setPreviousFilters] = useState({});
  const [showLayer, setShowLayer] = useState(false);

  const size = useContext(ResponsiveContext);
  const resetFilters = () => {
    setData(allData);
    setSelectValue(defaultSelectValue);
    setFilters(defaultFilters);
    setFiltering(false);
    setSearch('');
  };

  // everytime the Filters layer opens, save a temp
  // of the previous filters and values in case user clicks "x"
  const storePreviousFilterInfo = () => {
    setPreviousFilters(filters);
    setPreviousValues({
      ...previousValues,
      selectValue,
    });
  };

  const restoreValues = (values) => {
    setSelectValue(values.selectValue);
  };

  const content = (
    <Select
      options={[defaultSelectValue, 'Created', 'InProgress']}
      value={selectValue}
      onChange={({ option }) => {
        const nextFilters = {
          status: option !== defaultSelectValue && ((nextValue) => nextValue === option),
        };
        const nextData = filterData(allData, nextFilters);
        setData(nextData);
        setSelectValue(option);
      }}
    />
  );
  return (
    <>
      <Box align="center" direction="row" gap="small">
        {size !== 'small' ? (
          content
        ) : (
          <StyledButton
            icon={<FilterIcon />}
            onClick={() => {
              setShowLayer(true);
              storePreviousFilterInfo();
            }}
          />
        )}
        {filtering && <Anchor label="Clear filters" onClick={resetFilters} />}
      </Box>
      {showLayer && (
        <Layer
          position={size !== 'small' ? 'right' : undefined}
          full={size !== 'small' ? 'vertical' : true}
          modal
          onClickOutside={() => {
            filterData(allData, previousFilters);
            restoreValues(previousValues);
            setShowLayer(!showLayer);
          }}
          onEsc={() => {
            filterData(allData, previousFilters);
            restoreValues(previousValues);
            setShowLayer(!showLayer);
          }}
        >
          <Box
            width={{ min: 'medium' }}
            pad={{ horizontal: 'medium', vertical: 'medium' }}
            gap="medium"
            fill="vertical"
          >
            <Header>
              <Heading as="p" color="text-strong" margin="none">
                Filters
              </Heading>
              <Button
                icon={<ClearIcon />}
                onClick={() => {
                  filterData(allData, previousFilters);
                  restoreValues(previousValues);
                  setShowLayer(!showLayer);
                }}
              />
            </Header>
            <Box pad="xsmall" overflow="auto" flex>
              {content}
            </Box>
            <Box align="center" direction="row" gap="small">
              <Button
                label="Apply Filters"
                onClick={() => {
                  const nextData = filterData(allData, filters);
                  setData(nextData);
                  setShowLayer(!showLayer);
                }}
                primary
              />
              <Button
                label="Reset Filters"
                onClick={() => {
                  resetFilters();
                  setShowLayer(!showLayer);
                }}
                secondary
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default ProjectsPage;
