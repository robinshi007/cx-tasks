import { useLocation, useRouteMatch } from 'react-router-dom';
import { MainFrame } from '@/components/Layout';

export const Page404 = () => {
  let requestPath;
  const location = useLocation();
  const { path } = useRouteMatch();
  if (location.state && location.state.path) {
    requestPath = location.state.path;
  } else {
    requestPath = path;
  }
  return (
    <MainFrame>
      <div className="px-8 py-4 relative">
        <div className="flex items-center justify-start h-11 w-full">
          <h2 className="text-gray-600 font-medium text-lg">{`The request item is not found: ${requestPath}`}</h2>
        </div>
      </div>
    </MainFrame>
  );
};
