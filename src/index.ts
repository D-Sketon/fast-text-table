interface TableOptions {
  hsep?: string | undefined;
  align?: ("l" | "r" | "c" | "." | null | undefined)[] | string[] | undefined;
  stringLength?: (s: string) => number;
}

const table = (
  rows: any[][],
  {
    hsep = "  ",
    align = [],
    stringLength = (s: string) => (s + "").length,
  }: TableOptions = {}
) => {
  const dotSizes: number[] = [];

  const cellData = rows.map((row) =>
    row.map((cell, index) => {
      const str = cell + "";
      const dotIdx = str.lastIndexOf(".");
      const dotSize = dotIdx > -1 ? dotIdx + 1 : str.length;
      dotSizes[index] = Math.max(dotSizes[index] || 0, dotSize);
      return { str, dotSize };
    })
  );

  const sizes: number[] = [];
  const formattedRows = cellData.map((row) =>
    row.map(({ str, dotSize }, index) => {
      let formatted: string;
      if (align[index] === ".") {
        const size =
          dotSizes[index] +
          (str.includes(".") ? 0 : 1) -
          stringLength(str) +
          dotSize;
        formatted = str + " ".repeat(size);
      } else {
        formatted = str;
      }
      sizes[index] = Math.max(sizes[index] || 0, stringLength(formatted));
      return formatted;
    })
  );

  return formattedRows
    .map((row) =>
      row
        .map((cell, index) => {
          const pad = sizes[index] - stringLength(cell);
          if (align[index] === "r" || align[index] === ".") {
            return " ".repeat(pad) + cell;
          }
          if (align[index] === "c") {
            return (
              " ".repeat(Math.ceil(pad / 2)) +
              cell +
              " ".repeat(Math.floor(pad / 2))
            );
          }
          return cell + " ".repeat(pad);
        })
        .join(hsep)
        .trimEnd()
    )
    .join("\n");
};

export default table;
