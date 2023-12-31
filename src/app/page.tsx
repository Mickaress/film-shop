import MoviesList from '@/components/movieList/MoviesList';
import Sidebar from '@/components/Sidebar';

const Home = () => {
  return (
    <main>
      <h1 className="bold text-[48px] my-5">Фильмы</h1>
      <div className="flex gap-4 items-start mb-5">
        <Sidebar />
        <MoviesList />
      </div>
    </main>
  );
};

export default Home;
