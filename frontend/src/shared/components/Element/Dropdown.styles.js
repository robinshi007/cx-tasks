//import styled, { css } from 'styled-components';
import tw, { styled, css } from 'twin.macro';

import { ClearIcon as CIcon, ChevronDownIcon } from './Icons';

export const StyledSelect = styled.div(() => [
  tw`relative rounded cursor-pointer inline-block text-sm text-gray-700 focus:outline-none`,
]);

export const ValueContainer = styled.div((props) => [
  tw`flex items-center w-full py-1 px-4 rounded`,
  !props.isMulti &&
    !props.isValueEmpty &&
    tw`bg-gray-200 hover:bg-gray-300 transition ease-out duration-200`,
  css`
    min-height: 32px;
  `,
]);

export const Placeholder = styled.div(() => [tw`text-gray-500`]);

export const ValueMulti = styled.div(() => [tw`flex items-center flex-wrap`]);

export const ValueMultiItem = styled.div(() => [
  tw`relative mx-1 inline-flex items-center h-7 px-2 py-2 rounded cursor-pointer select-none text-gray-600 bg-gray-200 hover:bg-gray-300`,
]);

export const AddMore = styled.div(() => [
  tw`inline-flex items-center py-1 ml-1 text-sm cursor-pointer text-blue-600`,
]);
export const AddMoreLink = styled.div(() => [tw`hover:underline`]);

export const Dropdown = styled.div((props) => [
  tw`z-10 absolute left-0 rounded bg-white shadow py-0.5`,
  css`
    ${props.width ? `width: ${props.width}px;` : 'width: 100%;'}
  `,
]);
export const DropdownInput = styled.input((props) => [
  tw`p-2 w-full border-none text-gray-500 focus:outline-none`,
  css`
    ${props.withSearch ? '' : 'display: none;'}
  `,
]);

export const ClearIcon = tw(CIcon)`ml-1 p-0.5 text-sm text-gray-600 select-none cursor-pointer`;
export const ChevronIcon = tw(ChevronDownIcon)`ml-1 p-1 text-gray-600`;

export const Options = styled.div(() => [
  tw`overflow-y-auto overflow-x-hidden`,
  css`
    max-height: 200px;
  `,
]);

export const Option = styled.div(() => [
  tw`py-2 px-3 break-words cursor-pointer`,
  css`
    &:first-of-type {
      margin-top: 2px;
    }
    &:last-of-type {
      margin-bottom: 2px;
    }
    &.select-option-is-active {
      background: rgb(210, 229, 254);
    }
  `,
]);

export const OptionsNoResults = styled.div(() => [tw`pt-1 px-4 pb-4 text-gray-600`]);
