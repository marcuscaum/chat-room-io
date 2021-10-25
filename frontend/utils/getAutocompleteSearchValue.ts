export interface IAutocompleteQuery {
  word: string;
  range: [number, number];
}

function autocompleteQuery(value: string, cursorPosition: number) {
  if (!cursorPosition) return undefined;

  const autocompleteQuery = value
    .split(/[\s\n]/)
    .reduce((acc: IAutocompleteQuery[], word, index) => {
      const previous: any = acc[index - 1];
      const startPos = index === 0 ? index : previous.range[1] + 1;
      const endPos = startPos + word.length;
      const searchObj = {
        word,
        range: [startPos, endPos],
      } as IAutocompleteQuery;

      return acc.concat([searchObj]);
    }, []);

  // return the word based on cursor position between start and end position
  const currentValue = autocompleteQuery.find(
    ({ range }: { range: IAutocompleteQuery["range"] }) =>
      range[0] < cursorPosition && range[1] >= cursorPosition
  );

  return currentValue;
}

export default autocompleteQuery;
