import Sidebar from '@/components/layout/Sidebar';

const Home = () => {
  return (
    <main>
      <h1 className="bold text-[48px] my-5">Фильмы</h1>
      <div>
        <Sidebar />
      </div>
    </main>
  );
};

export default Home;
