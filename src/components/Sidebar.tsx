import GenreFilter from './filter/GenreFilter';
import CountryFilter from './filter/CountryFilter';
import YearRangeFilter from './filter/YearRangeFilter';
import TitleFilter from './filter/TitleFilter';

export default function Sidebar() {
  return (
    <aside className="min-w-[300px] bg-white rounded-lg p-5">
      <p className="text-base bold font-bold">Название</p>
      <TitleFilter />
      <p className="text-base bold font-bold mt-3">Жанр</p>
      <GenreFilter />
      <p className="text-base bold font-bold mt-3">Страна</p>
      <CountryFilter />
      <p className="text-base bold font-bold mt-3">Годы</p>
      <YearRangeFilter />
    </aside>
  );
}
