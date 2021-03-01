import React, { useRef, useCallback } from 'react';
import tw, { styled } from 'twin.macro';
import { Link, NavLink } from 'react-router-dom';
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

// === components ===
export const RouteLink = styled(Link)`
  display: inline-flex;
`;

export const RouteTabLink = styled(NavLink)`
  ${tw`flex relative py-2 cursor-pointer text-gray-600 hover:text-blue-500 mr-4 last:mr-0`}
  &.active {
    ${tw`text-blue-600`}
  }
`;

export const Label = ({ value, color, rounded, className }) => {
  return (
    <div
      className={`flex items-center truncate text-xs ${
        color ? 'bg-' + color + '-600 text-white' : 'text-gray-600 bg-gray-200'
      } text-sm px-1.5 select-none ${rounded ? 'rounded-full' : 'rounded'} ${className}`}
      style={{ minWidth: '20px' }}
    >
      {value}
    </div>
  );
};
export const Priority = ({ value }) => {
  if (value === 'Block') {
    return <BlockedIcon size={18} className="text-red-500" />;
  } else if (value === 'High') {
    return <ChevronUpIcon size={18} className="text-red-500" />;
  } else if (value === 'Low') {
    return <ChevronDownIcon size={18} className="text-gray-500" />;
  } else {
    return <EqualIcon size={18} className="text-blue-500" />;
  }
};
export const Kind = ({ value }) => {
  if (value === 'Story') {
    return <SingleBookmarkIcon size={18} className="mr-1 text-green-500 flex flex-shrink-0" />;
  } else if (value === 'Bug') {
    return <BugIcon size={18} className="mr-1 text-red-500 flex flex-shrink-0" />;
  } else {
    return <BoxCheckmarkSolidIcon size={18} className="mr-1 text-blue-500 flex flex-shrink-0" />;
  }
};

const StyledButton = styled.button(({ variant, color, selected, hidden, disabled }) => [
  tw`flex items-center justify-center px-3 py-1.5 rounded font-normal text-sm focus:outline-none cursor-pointer select-none truncate`,
  variant === 'text' &&
    color === 'light' &&
    !selected &&
    tw`text-gray-600 bg-transparent hover:bg-gray-200 active:bg-gray-300`,
  variant === 'text' && color === 'light' && selected && tw`bg-gray-300`,
  variant === 'text' && color === 'light' && hidden && tw`invisible`,
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
  tw`flex items-center justify-center px-3 py-1.5 rounded font-normal text-sm font-medium focus:outline-none cursor-pointer select-none truncate`,
  tw`transition ease-out duration-200`,
  color === 'primary' &&
    tw`bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 hover:text-white`,
  disabled && tw`cursor-not-allowed pointer-events-none bg-opacity-60`,
]);

const StyledInput = styled.input(({ isError }) => [
  tw`block px-2 py-1.5 w-full rounded bg-white border-none resize-none overflow-y-auto overflow-x-hidden focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500`,
  tw`text-sm bg-gray-100 text-gray-700`,
  tw`transition ease-out duration-200`,
  isError && tw`ring-2 ring-red-600`,
]);

export const Input = React.forwardRef(({ children, type, ...props }, ref) => {
  return (
    <StyledInput type={type} inputRef={ref} {...props} style={{ maxHeight: '320px' }}>
      {children}
    </StyledInput>
  );
});

const StyledTextArea = styled.textarea(({ isBgWhite, isError }) => [
  tw`block p-1 w-full rounded border-none resize-none overflow-y-auto overflow-x-hidden focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500`,
  tw`text-sm bg-gray-100 text-gray-700`,
  tw`transition ease-out duration-200`,
  isBgWhite && tw`bg-white`,
  isError && tw`ring-2 ring-red-600`,
]);

export const TextArea = React.forwardRef(
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
      <StyledTextArea
        ref={el}
        inputRef={ref}
        rows={rows || (isMulti ? 2 : 1)}
        {...props}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          onNewChange && onNewChange(e);
          handleOnChange();
        }}
        style={{ maxHeight: '320px' }}
      >
        {children}
      </StyledTextArea>
    );
  }
);

export const RenderProjectOption = (project) => {
  return (
    <div className="truncate" key={project.id} style={{ maxWidth: '160px' }}>
      {project.title}
    </div>
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
      <Priority value={priority.title} />
      <span className="ml-1.5">{priority.title}</span>
    </div>
  );
};

// Error Component
export const ErrorMessage = ({ field, className }) => {
  return (
    <div
      className={`text-xs text-red-600 px-2 my-1 text-left truncate truncate${className}`}
      style={{ minHeight: '20px' }}
    >
      {field && field.message}
    </div>
  );
};

const statusClass = (status) => {
  if (status === 'Backlog' || status === 'Todo') {
    return 'bg-gray-200 text-gray-700';
  } else if (status === 'Done') {
    return 'bg-green-600 text-white';
  } else {
    return 'bg-blue-600 text-white';
  }
};
export const Status = ({ title }) => {
  return (
    <div
      className={`text-center font-semibold text-xs rounded px-2 py-0.5 uppercase select-none ${statusClass(
        title
      )}`}
    >
      {title}
    </div>
  );
};
