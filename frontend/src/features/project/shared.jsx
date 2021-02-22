import React, { useRef, useCallback } from 'react';
import { formatDistance } from 'date-fns';
import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';
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

// === utils ===
export const timeAgo = (timeString) => {
  const time = Date.parse(timeString);
  return formatDistance(time, new Date(), { addSuffix: true });
};
export const defaultSection = () => {
  const newDate = new Date();
  return {
    id: 0,
    title: '',
    description: '',
    order: Math.floor(newDate.getTime() / 100),
  };
};
export const defaultTask = () => {
  const newDate = new Date();
  return {
    id: 0,
    title: '',
    description: '',
    taskKind: 71,
    section: 0,
    priority: 33,
    status: 11,
    assignee: 0,
    tags: [],
    updated_at: newDate.toISOString(),
    due_date: '',
    order: Math.floor(newDate.getTime() / 100),
    bdorder: Math.floor(newDate.getTime() / 100),
  };
};

// === components ===
export const RouteLink = styled(Link)`
  display: inline-flex;
`;
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

const StyledButton = styled.button(({ variant, color, selected, hidden, disabled }) => [
  tw`flex items-center justify-center px-3 py-1.5 rounded font-normal text-sm focus:outline-none cursor-pointer select-none truncate`,
  variant === 'text' &&
    color === 'light' &&
    !selected &&
    tw`text-gray-600 bg-transparent hover:bg-gray-200 active:bg-gray-300`,
  variant === 'text' && color === 'light' && selected && tw`bg-gray-300`,
  variant === 'text' && color === 'light' && hidden && tw`hidden`,
  variant === 'text' && color === 'danger' && tw`text-red-600 hover:bg-red-100 active:bg-red-200`,
  variant === 'contained' &&
    color === 'primary' &&
    tw`bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 hover:text-white`,
  variant === 'contained' &&
    color === 'danger' &&
    tw`bg-red-600 text-white hover:bg-red-500 active:bg-red-700 hover:text-white`,
  disabled && tw`cursor-not-allowed pointer-events-none bg-opacity-60`,
  tw`transition ease-out duration-200`,
]);
export const Button = ({ children, className, ...props }) => {
  return (
    <StyledButton {...props} className={className} style={{ minWidth: '32px' }}>
      {children}
    </StyledButton>
  );
};
export const FormSubmit = styled.input(({ color, disabled }) => [
  tw`flex items-center justify-center px-3 py-1.5 rounded font-normal text-sm focus:outline-none cursor-pointer select-none truncate`,
  tw`transition ease-out duration-200`,
  color === 'primary' &&
    tw`bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 hover:text-white`,
  disabled && tw`cursor-not-allowed pointer-events-none bg-opacity-60`,
]);

const StyledInput = styled.textarea(() => [
  tw`block p-1.5 w-full rounded bg-white border-none resize-none overflow-y-auto overflow-x-hidden focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500`,
  tw`text-sm bg-gray-100 text-gray-700`,
  tw`transition ease-out duration-200`,
]);

export const Input = React.forwardRef(
  ({ children, isMulti, onChange: onNewChange, rows, ...props }, ref) => {
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

    const handleKeyDown = (e) => {
      if (!isMulti) {
        if (e.key === 'Enter') {
          // prevent "enter" key for title field
          e.preventDefault();
        }
      }
    };
    return (
      <StyledInput
        ref={el}
        inputRef={ref}
        rows={rows || 1}
        {...props}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          onNewChange && onNewChange(e);
          handleOnChange();
        }}
        style={{ maxHeight: '320px' }}
      >
        {children}
      </StyledInput>
    );
  }
);

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

// Error Component
export const ErrorMessage = ({ field }) => {
  return (
    <div className="text-xs text-red-600 pl-2 mt-1" style={{ minHeight: '20px' }}>
      {field && field.message}
    </div>
  );
};
