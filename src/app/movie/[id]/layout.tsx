import LinksGroup from '@/components/layout/LinksGroup';
import Title from '@/components/Title';

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const Layout: React.FC<Props> = ({ children, params }) => {
  const filmId = parseInt(params.id);

  const links = [
    {
      title: 'О фильме',
      path: `/movie/${filmId}`,
    },
    {
      title: 'Предметы',
      path: `/movie/${filmId}/products`,
    },
    {
      title: 'Статистика',
      path: `/movie/${filmId}/statistics`,
    },
  ];

  return (
    <>
      <Title id={filmId} />
      <LinksGroup links={links} />
      <div className="bg-white w-full h-[550px] rounded-bl-xl rounded-br-xl rounded-tr-xl p-5">
        {children}
      </div>
    </>
  );
};

export default Layout;
