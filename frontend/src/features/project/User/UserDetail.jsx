import { useSelector } from 'react-redux';
import { useRouteMatch, Redirect } from 'react-router-dom';
import { selectUserById } from '@/features/entity';
import { selectCurrentUser } from '@/features/auth/authSlice';

const UserDetail = ({ id }) => {
  let assignee = useSelector(selectUserById(id));
  const currentUser = useSelector(selectCurrentUser);
  const user = assignee ? assignee : currentUser;

  const { url } = useRouteMatch();

  return (
    <>
      {user ? (
        <>
          <div className="flex items-center justify-between px-2 py-3 text-gray-600">
            <div className="flex items-center font-medium ml-2 text-base">
              <div>{`User-${id}`}</div>
            </div>
          </div>
          <div className="bg-white px-4 pt-2 pb-4 text-gray-700">
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        </>
      ) : (
        <Redirect to={{ pathname: '/not_found', state: { path: url } }} />
      )}
    </>
  );
};

export default UserDetail;
