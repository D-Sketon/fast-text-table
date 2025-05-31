import { bench, group, run, summary } from "mitata";

import table from "./index.ts";
import textTable from "text-table";

const testText = Array.from({ length: 10 }, (_, i) => [
  "beep".repeat(i),
  `${i}.${i}`,
  "boop".repeat(i),
  `${i}.${i}`,
]);

const testTextLarge = Array.from({ length: 100 }, (_, i) => [
  "beep".repeat(i),
  `${i}.${i}`,
  "boop".repeat(i),
  `${i}.${i}`,
]);

summary(() => {
  group("table - small dataset", () => {
    bench("table", () => {
      table(testText, { align: ["l", "r", "c", "."] });
    });

    bench("text-table", () => {
      textTable(testText, { align: ["l", "r", "c", "."] });
    });
  });
});

summary(() => {
  group("table - large dataset", () => {
    bench("table", () => {
      table(testTextLarge, { align: ["l", "r", "c", "."] });
    });

    bench("text-table", () => {
      textTable(testTextLarge, { align: ["l", "r", "c", "."] });
    });
  });
});

(async () => {
  await run();
})();
