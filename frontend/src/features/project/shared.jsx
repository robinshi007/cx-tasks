import React, { useRef, useCallback } from 'react';
import { formatDistance } from 'date-fns';
import tw, { styled } from 'twin.macro';
import {
  BoxCheckmarkSolidIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BlockedIcon,
  BugIcon,
  EqualIcon,
  SingleBookmarkIcon,
  Avatar,
} from '@/shared/components/Element';

export const timeAgo = (timeString) => {
  const time = Date.parse(timeString);
  return formatDistance(time, new Date(), { addSuffix: true });
};

export const Label = ({ value, color, rounded }) => {
  return (
    <div
      className={`flex items-center text-xs ${
        color ? 'bg-' + color + '-600 text-white' : 'text-gray-600 bg-gray-200'
      } text-sm px-1.5 select-none ${rounded ? 'rounded-full' : 'rounded'}`}
      style={{ minWidth: '20px' }}
    >
      {value}
    </div>
  );
};
export const Priority = ({ value }) => {
  if (value === 31) {
    return <BlockedIcon size={18} className="text-red-500" />;
  } else if (value === 32) {
    return <ChevronUpIcon size={18} className="text-red-500" />;
  } else if (value === 34) {
    return <ChevronDownIcon size={18} className="text-gray-500" />;
  } else {
    return <EqualIcon size={18} className="text-blue-500" />;
  }
};
export const Kind = ({ value }) => {
  if (value === 'Story') {
    return <SingleBookmarkIcon size={18} className="mr-1 text-green-500" />;
  } else if (value === 'Bug') {
    return <BugIcon size={18} className="mr-1 text-red-500" />;
  } else {
    return <BoxCheckmarkSolidIcon size={18} className="mr-1 text-blue-500" />;
  }
};

const StyledButton = styled.button(({ variant, color, selected, hidden }) => [
  tw`flex items-center justify-center px-3 py-1.5 rounded font-normal text-sm focus:outline-none cursor-pointer select-none truncate`,
  variant === 'text' &&
    color === 'light' &&
    !selected &&
    tw`text-gray-600 bg-white hover:bg-gray-200 active:bg-gray-300`,
  variant === 'text' && color === 'light' && selected && tw`bg-gray-300`,
  variant === 'text' && color === 'light' && hidden && tw`hidden`,
  variant === 'contained' &&
    color === 'primary' &&
    tw`bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 hover:text-white`,
  tw`transition ease-out duration-200`,
]);
export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
const StyledTextArea = styled.textarea(() => [
  tw`p-1 w-full h-full rounded bg-white resize-none overflow-y-auto overflow-x-hidden hover:bg-gray-100 focus:bg-gray-200 focus:outline-none`,
  tw`text-gray-700`,
  tw`transition ease-out duration-200`,
]);
// textarea with auto resize
export const TextArea = ({ children, onChange: onNewChange, ...props }) => {
  // refer https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
  const elRef = useRef(null);
  const el = useCallback((node) => {
    if (node !== null) {
      node.style.height = `${node.scrollHeight}px`;
    }
    elRef.current = node;
  }, []);
  const handleOnChange = () => {
    elRef.current.style.height = '0';
    elRef.current.style.height = `${elRef.current.scrollHeight}px`;
  };
  return (
    <StyledTextArea
      ref={el}
      onChange={(e) => {
        onNewChange && onNewChange(e);
        handleOnChange();
      }}
      {...props}
      style={{ maxHeight: '320px' }}
    >
      {children}
    </StyledTextArea>
  );
};

export const RenderUserOption = (user) => {
  return (
    <div className="flex items-center" key={user.id}>
      <Avatar initials={user.name} bg="purple" color="white" size={24} />
      <span className="ml-1.5">{user.name}</span>
    </div>
  );
};
export const RenderPriorityOption = (priority) => {
  return (
    <div className="flex items-center" key={priority.id}>
      <Priority value={priority.id} />
      <span className="ml-1.5">{priority.title}</span>
    </div>
  );
};
