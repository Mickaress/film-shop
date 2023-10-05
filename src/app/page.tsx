import MoviesList from '@/components/MoviesList';
import Sidebar from '@/components/layout/Sidebar';

const Home = () => {
  return (
    <main>
      <h1 className="bold text-[48px] my-5">Фильмы</h1>
      <div className="flex gap-4">
        <aside className="min-w-[300px] bg-white rounded-lg p-5">
          <Sidebar />
        </aside>
        <div className="bg-white w-full h-full rounded-lg p-5 flex flex-col items-center">
          <MoviesList />
        </div>
      </div>
    </main>
  );
};

export default Home;
