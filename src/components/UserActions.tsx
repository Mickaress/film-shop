import { User } from 'lucide-react';
import { getServerSession } from 'next-auth';
import UserDropDownMenu from './UserDropDownMenu';
import Button from './ui/Button';

const UserActions = async () => {
  const session = await getServerSession();
  return (
    <div className="flex items-center gap-1">
      <User size={32} />
      {session ? (
        <div className="flex items-center gap-1">
          <p>{session.user?.email}</p>
          <UserDropDownMenu />
        </div>
      ) : (
        <Button variant="text" href="/sign-in">
          Войти
        </Button>
      )}
    </div>
  );
};

export default UserActions;
