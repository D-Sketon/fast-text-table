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
    stringLength = (s: string) => String(s).length,
  }: TableOptions = {}
) => {
  const dotSizes: number[] = rows.reduce((acc, row) => {
    row.forEach((cell, index) => {
      acc[index] = Math.max(acc[index] || 0, dotIndex(cell));
    });
    return acc;
  }, [] as number[]);

  const formattedRows = rows.map((row) =>
    row.map((cell, index) => {
      const c = String(cell);
      if (align[index] === ".") {
        const size =
          dotSizes[index] +
          (c.includes(".") ? 0 : 1) -
          stringLength(c) +
          dotIndex(c);
        return c + " ".repeat(size);
      }
      return c;
    })
  );

  const sizes = formattedRows.reduce((acc, row) => {
    row.forEach((cell, index) => {
      acc[index] = Math.max(acc[index] || 0, stringLength(cell));
    });
    return acc;
  }, [] as number[]);

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

const dotIndex = (s: string) => {
  const index = s.lastIndexOf(".");
  return index > -1 ? index + 1 : s.length;
};

export default table;
