import { bench, group, run, summary } from "mitata";

import table from "./index.ts";
import textTable from "text-table";
import { textTable as textTableFast } from "text-table-fast";

const testTextSmall = Array.from({ length: 10 }, (_, i) => [
  "beep".repeat(i),
  `${i}.${i}`,
  "boop".repeat(i),
  `${i}.${i}`,
]);

const testTextMiddle = Array.from({ length: 100 }, (_, i) => [
  "beep".repeat(i),
  `${i}.${i}`,
  "boop".repeat(i),
  `${i}.${i}`,
  "boop".repeat(i),
  `${i}.${i}`,
]);

const testTextLarge = Array.from({ length: 1000 }, (_, i) => [
  "beep".repeat(i),
  `${i}.${i}`,
  "boop".repeat(i),
  `${i}.${i}`,
  "boop".repeat(i),
  `${i}.${i}`,
  "boop".repeat(i),
  `${i}.${i}`,
]);

summary(() => {
  group("table - small dataset", () => {
    bench("fast-text-table", () => {
      table(testTextSmall, { align: ["l", "r", "c", "."] });
    }).gc("inner");

    bench("text-table-fast", () => {
      textTableFast(testTextSmall, { align: ["left", "right", "center"] });
    }).gc("inner");

    bench("text-table", () => {
      textTable(testTextSmall, { align: ["l", "r", "c", "."] });
    }).gc("inner");
  });
});

summary(() => {
  group("table - middle dataset", () => {
    bench("fast-text-table", () => {
      table(testTextMiddle, { align: ["l", "r", "c", "."] });
    }).gc("inner");

    bench("text-table-fast", () => {
      textTableFast(testTextMiddle, { align: ["left", "right", "center"] });
    }).gc("inner");


    bench("text-table", () => {
      textTable(testTextMiddle, { align: ["l", "r", "c", "."] });
    }).gc("inner");
  });
});

summary(() => {
  group("table - large dataset", () => {
    bench("fast-text-table", () => {
      table(testTextLarge, { align: ["l", "r", "c", "."] });
    }).gc("inner");

    bench("text-table-fast", () => {
      textTableFast(testTextLarge, { align: ["left", "right", "center"] });
    }).gc("inner");


    bench("text-table", () => {
      textTable(testTextLarge, { align: ["l", "r", "c", "."] });
    }).gc("inner");
  });
});

(async () => {
  await run();
})();
