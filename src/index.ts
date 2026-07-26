export interface TableOptions {
  hsep?: string | undefined;
  align?: ("l" | "r" | "c" | "." | null | undefined)[] | string[] | undefined;
  stringLength?: (s: string) => number;
}

const table = (
  rows: any[][],
  {
    hsep = "  ",
    align = [],
    stringLength = (s: string) => s.length,
  }: TableOptions = {},
) => {
  const dotSizes: number[] = [],
    colWidths: number[] = [],
    max = Math.max,
    repeatSpace = (n: number) => " ".repeat(n);

  return rows
    .map((row) =>
      row.map((cell, col) => {
        const str = cell + "";
        if (align[col] !== ".") {
          colWidths[col] = max(colWidths[col] || 0, stringLength(str));
        } else {
          const dot = str.lastIndexOf(".");
          const end =
            dot > -1 ? stringLength(str.slice(0, dot)) + 1 : stringLength(str);
          dotSizes[col] = max(dotSizes[col] || 0, end);
          colWidths[col] = max(
            colWidths[col] || 0,
            dotSizes[col] + (dot > -1 ? 0 : 1) + end,
            stringLength(str),
          );
        }
        return str;
      }),
    )
    .map((row) =>
      row
        .map((str, col) => {
          const len = stringLength(str);
          const width = colWidths[col];
          const a = align[col];
          const pad = width - len;
          let dot, effectiveLen;

          if (a === ".") {
            dot = str.lastIndexOf(".");
            effectiveLen = max(
              dotSizes[col] +
                (dot > -1
                  ? stringLength(str.slice(0, dot)) + 1
                  : stringLength(str) + 1),
              len,
            );
            return (
              repeatSpace(width - effectiveLen) +
              str +
              repeatSpace(effectiveLen - len)
            );
          }
          if (a === "r") {
            return repeatSpace(pad) + str;
          }
          if (a === "c") {
            dot = Math.ceil(pad / 2);
            return repeatSpace(dot) + str + repeatSpace(pad - dot);
          }
          return str + repeatSpace(pad);
        })
        .join(hsep)
        .trimEnd(),
    )
    .join("\n");
};

export default table;
