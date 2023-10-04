// title
export const titleFilter = (title: string) => {
  const query = {
    OR: [
      {
        title: {
          startsWith: title,
          mode: 'insensitive',
        },
      },
      {
        title: {
          contains: ` ${title}`,
          mode: 'insensitive',
        },
      },
    ],
  };

  return query;
};

// genre
export const genreFilter = (genreList: number[]) => {
  const query =
    genreList.length > 0
      ? {
          genres: {
            some: {
              genreId: {
                in: genreList,
              },
            },
          },
        }
      : {};

  return query;
};

// country
export const countryFilter = (countryList: number[]) => {
  const query =
    countryList.length > 0
      ? {
          countryId: {
            in: countryList,
          },
        }
      : {};

  return query;
};

// year
export const yearFilter = (
  year_start: string | null,
  year_end: string | null,
) => {
  const query = [
    year_start
      ? {
          year: {
            gte: parseInt(year_start),
          },
        }
      : {},
    year_end
      ? {
          year: {
            lte: parseInt(year_end),
          },
        }
      : {},
  ];

  return query;
};
