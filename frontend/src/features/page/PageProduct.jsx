import { MainFrame } from '@/components/Layout';

export const PageProduct = () => (
  <MainFrame>
    <div className="px-8 py-4 relative">
      <div className="flex items-center justify-start h-11 w-full">
        <h2 className="text-gray-700 font-medium text-lg">Product Information</h2>
      </div>
      <div className="flex items-center justify-start h-11 w-full mt-2">
        <h3 className="text-gray-700 font-medium text-lg">
          CxTasks: a task management webapp just like simplified Jira and Asana
        </h3>
      </div>
      <div>
        <h6 className="text-gray-700 text-base mt-4">Tech Stack</h6>
        <p className="text-gray-700 text-sm">Frontend: React, Redux Toolkit, Tailwind CSS</p>
        <p className="text-gray-700 text-sm">Backend: Golang, Postgres</p>
      </div>
      <div>
        <h6 className="text-gray-700 text-base mt-4">Note:</h6>
        <p className="text-gray-700 text-sm">
          Current deploy only contains frontend with indexedDB for offline support.
        </p>
        <p className="text-gray-700 text-sm">Only user created data are saved to local.</p>
      </div>
    </div>
  </MainFrame>
);
