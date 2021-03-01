import { useSelector } from 'react-redux';
import { MainFrame } from '@/components/Layout';
import { selectCurrentUser } from '@/features/auth/authSlice';

export const PageProfile = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <MainFrame>
      <div className="px-8 py-4 relative">
        <div className="flex items-center justify-start h-11 w-full">
          <h2 className="text-gray-600 font-medium text-lg">
            <div>{`User-${user.id}`}</div>
          </h2>
        </div>
        <div className="bg-white text-gray-700">
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      </div>
    </MainFrame>
  );
};
