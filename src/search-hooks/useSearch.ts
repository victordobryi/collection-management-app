import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

interface IUseSearchProps<T> {
  dataSet: T[];
  keys: string[];
}

const SCORE_THRESHOLD = 0.4;

// const highlight = (fuseSearchResult: any, highlightClassName = 'highlight') => {
//   const set = (obj: object, path: string, value: any) => {
//     const pathValue = path.split('.');
//     let i;

//     for (i = 0; i < pathValue.length - 1; i++) {
//       obj = obj[pathValue[i]];
//     }

//     obj[pathValue[i]] = value;
//   };

//   const generateHighlightedText = (
//     inputText: string,
//     regions: number[] = []
//   ) => {
//     let content = '';
//     let nextUnhighlightedRegionStartingIndex = 0;

//     regions.forEach((region) => {
//       const lastRegionNextIndex = region[1] + 1;

//       content += [
//         inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
//         `<mark>`,
//         inputText.substring(region[0], lastRegionNextIndex),
//         '</mark>'
//       ].join('');

//       nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
//     });

//     content += inputText.substring(nextUnhighlightedRegionStartingIndex);

//     return content;
//   };

//   return fuseSearchResult
//     .filter(({ matches }: any) => matches && matches.length)
//     .map(({ item, matches }: any) => {
//       const highlightedItem = { ...item };

//       matches.forEach((match: any) => {
//         set(
//           highlightedItem,
//           match.key,
//           generateHighlightedText(match.value, match.indices)
//         );
//       });

//       return highlightedItem;
//     });
// };

export default function useSearch<T>({ dataSet, keys }: IUseSearchProps<T>) {
  const [searchValue, setSearchValue] = useState('');

  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      keys,
      includeMatches: true,
      useExtendedSearch: false
    };

    return new Fuse(dataSet, options);
  }, [dataSet, keys]);

  const results = useMemo(() => {
    if (!searchValue) return dataSet;

    const searchResults = fuse.search(searchValue);

    // console.log(searchResults, 'search');
    return searchResults
      .filter((fuseResult) =>
        fuseResult.score ? fuseResult.score < SCORE_THRESHOLD : null
      )
      .map((fuseResult) => fuseResult.item);
  }, [fuse, searchValue, dataSet]);

  return {
    searchValue,
    setSearchValue,
    results
  };
}
