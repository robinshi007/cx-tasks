import {
  BoxCheckmarkSolidIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BlockedIcon,
  BugIcon,
  SingleBookmarkIcon,
} from '@/shared/components/Element';

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
    return <ChevronDownIcon size={18} className="text-blue-500" />;
  } else {
    return '';
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
