import MoviesList from '@/components/MoviesList';
import Sidebar from '@/components/layout/Sidebar';

const Home = () => {
  return (
    <main>
      <h1 className="bold text-[48px] my-5">Фильмы</h1>
      <div className="flex gap-4 items-start justify-between">
        <Sidebar />
        <MoviesList />
      </div>
    </main>
  );
};

export default Home;
