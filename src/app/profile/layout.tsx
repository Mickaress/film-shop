import LinksGroup from '@/components/layout/LinksGroup';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const links = [
    {
      title: 'Информация',
      path: '/profile',
    },
    {
      title: 'Заказы',
      path: '/profile/orders',
    },
  ];

  return (
    <>
      <h1 className="bold text-[48px] my-5">Личный кабинет</h1>
      <LinksGroup links={links} />
      <div className="bg-white w-full h-[550px] rounded-bl-xl rounded-br-xl rounded-tr-xl p-5">
        {children}
      </div>
    </>
  );
};

export default Layout;
