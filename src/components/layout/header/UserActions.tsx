import { ShoppingBasket, User } from 'lucide-react';
import { getServerSession } from 'next-auth';
import UserDropDownMenu from './UserDropDownMenu';
import Button from '../../ui/Button';
import { authOptions } from '@/lib/auth';

const UserActions = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex items-center gap-1">
      {session && (
        <Button variant="text" href="/cart" className="mr-3">
          <ShoppingBasket
            size={40}
            className="hover:bg-blue hover:stroke-white rounded-lg p-1"
          />
        </Button>
      )}
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
