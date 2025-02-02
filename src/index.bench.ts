import { bench, describe } from "vitest";

import _table from "./index";
import _textTable from "text-table";

const table = _table;
const textTable = _textTable;

describe("table", () => {
  const testText = Array.from({ length: 10 }, (_, i) => [
    "beep".repeat(i),
    `${i}.${i}`,
    "boop".repeat(i),
    `${i}.${i}`,
  ]);

  bench("table", () => {
    table(testText, { align: ["l", "r", "c", "."] });
  });

  bench("text-table", () => {
    textTable(testText, { align: ["l", "r", "c", "."] });
  });
});

describe("table-large", () => {
  const testText = Array.from({ length: 100 }, (_, i) => [
    "beep".repeat(i),
    `${i}.${i}`,
    "boop".repeat(i),
    `${i}.${i}`,
  ]);

  bench("table", () => {
    table(testText, { align: ["l", "r", "c", "."] });
  });

  bench("text-table", () => {
    textTable(testText, { align: ["l", "r", "c", "."] });
  });
});
