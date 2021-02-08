import React from 'react';
import { useSelector } from 'react-redux';

import { selectFilteredAllOrderedLists } from '@/features/project/projectSlice';

import Lists from './Lists';
import Filters from '../Filters';

// const Badge = ({ value, color }) => {
//   return (
//     <div
//       className={`flex items-center text-xs ${
//         color ? 'bg-' + color + '-600 text-white' : 'text-gray-600 bg-gray-200'
//       } text-sm rounded-full px-1.5 ml-1 select-none`}
//       style={{ minWidth: '20px' }}
//     >
//       {value}
//     </div>
//   );
// };

// const Content = () => (
//   <div className="px-8 pb-4">
//     <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
//       <h2 className="text-gray-600 font-medium text-lg">Backlog</h2>
//     </div>
//     <div className="w-full bg-white mb-4">
//       <div className="py-2 flex items-center justify-between text-sm">
//         <div>
//           <label htmlFor="search" className="sr-only">
//             Search
//           </label>
//           <div className="relative rounded">
//             <div className="absolute left-0 pl-2 pt-1.5 flex items-center pointer-events-none">
//               <span className="text-gray-500">
//                 <SearchIcon size={20} />
//               </span>
//             </div>
//             <input
//               id="search"
//               className="w-42 rounded py-1.5 pl-8 px-4.5 bg-gray-100 border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:bg-white transition ease-out duration-200"
//               type="text"
//               placeholder="Search"
//             />
//           </div>
//         </div>
//         <button className="hover:bg-green-500 focus:bg-green-700 group flex items-center rounded-md bg-green-600 text-white text-sm font-medium px-3 py-1.5 cursor-pointer select-none transition ease-out duration-200">
//           <svg width="16" height="20" fill="currentColor" className="group-hover:text-white">
//             <path d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
//           </svg>
//           Create section
//         </button>
//       </div>
//     </div>
//     <div className="w-full">
//       <div className="header relative">
//         <div className="flex items-center justify-between w-full text-sm font-normal">
//           <div className="flex items-center justify-start">
//             <div
//               className="flex cursor-pointer py-2 text-gray-600 font-semibold mr-2 relative"
//               href="/"
//             >
//               Backlog
//             </div>
//             <div className="text-gray-500 text-sm tracking-tight">3 tasks</div>
//           </div>
//           <div className="flex items-center justify-right">
//             <Badge value={1} />
//             <Badge value={2} color="blue" />
//             <Badge value={1} color="green" />
//           </div>
//         </div>
//         <div className="absolute bg-gray-200 w-full h-px bottom-0 left-0 right-0 z-0"></div>
//       </div>
//       <div className="content ">
//         <ul className="border-gray-200">
//           <Row title="Decide the design color" dueDate="2021/1/29" status="Done" />
//           <Row
//             title="Redesign the kanban page this week"
//             dueDate="2021/2/4"
//             status="Dev"
//             selected
//           />
//           <Row title="Test the cover of the card" dueDate="2021/2/20" status="Testing" />
//           <Row title="Test the cover of the card" dueDate="2021/3/20" status="Todo" />
//         </ul>
//       </div>
//     </div>
//   </div>
// );

const Backlog = () => {
  const lists = useSelector(selectFilteredAllOrderedLists);
  return (
    <div className="px-8 pb-4">
      <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
        <h2 className="text-gray-600 font-medium text-lg">Board</h2>
      </div>
      <div className="w-full bg-white mb-4">
        <div className="py-2 flex items-center justify-between text-sm">
          <Filters />
        </div>
      </div>
      <div className="">
        <div className="flex flex-col items-start justify-start">
          <Lists lists={lists} />
        </div>
      </div>
    </div>
  );
};
export default Backlog;
