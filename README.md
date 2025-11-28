# fast-text-table

![npm bundle size](https://img.shields.io/bundlephobia/min/fast-text-table) ![npm](https://img.shields.io/npm/v/fast-text-table) ![NPM](https://img.shields.io/npm/l/fast-text-table) ![npm downloads](https://img.shields.io/npm/dt/fast-text-table)  

Rewrite of [text-table](https://www.npmjs.com/package/text-table) in TypeScript, making it faster and smaller.

## Install

```sh
npm install fast-text-table
```

## Usage

```js
import table from "fast-text-table";
// or
const table = require("fast-text-table");

const t = table([
  ["master", "0123456789abcdef"],
  ["staging", "fedcba9876543210"],
]);
console.log(t);
```

Output:

```txt
master   0123456789abcdef
staging  fedcba9876543210
```

### left-right align

```js
table(
  [
    ["beep", "1024"],
    ["boop", "33450"],
    ["foo", "1006"],
    ["bar", "45"],
  ],
  { align: ["l", "r"] }
);
```

```txt
beep   1024
boop  33450
foo    1006
bar      45
```

### dotted align

```js
table(
  [
    ["beep", "1024"],
    ["boop", "334.212"],
    ["foo", "1006"],
    ["bar", "45.6"],
    ["baz", "123."],
  ],
  { align: ["l", "."] }
);
```

```txt
beep  1024
boop   334.212
foo   1006
bar     45.6
baz    123.
```

### centered

```js
table(
  [
    ["beep", "1024", "xyz"],
    ["boop", "3388450", "tuv"],
    ["foo", "10106", "qrstuv"],
    ["bar", "45", "lmno"],
  ],
  { align: ["l", "c", "l"] }
);
```

```txt
beep    1024   xyz
boop  3388450  tuv
foo    10106   qrstuv
bar      45    lmno
```

## API

### `table(rows, [opts])`

- `rows` `any[][]` - Array of rows to format.
- `opts` `object` - Optional options object.
  - `opts.hsep` `string` - Horizontal separator. Default: `"  "`.
  - `opts.align` `string[]` - Array of alignment types for each column. Default: `["l", "l", ..., "l"]`.
    - `l` - Left
    - `r` - Right
    - `c` - Center
    - `.` - Dotted
  - `opts.stringLength` `function` - Custom string length function. Default: `s => s.length`.

## Benchmarks

```
clk: ~4.02 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 24.11.1 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• table - small dataset
------------------------------------------- -------------------------------
fast-text-table                4.95 µs/iter   4.85 µs   5.92 µs ▂█▆▁▁▁▁▁▂▂▂
text-table-fast                6.95 µs/iter   7.01 µs   7.58 µs ▃▃▂▆██▄▁▁▁▃
text-table                    20.53 µs/iter  20.69 µs  20.94 µs █▁▅▁█▅▅█▅▁▅

summary
  fast-text-table
   1.41x faster than text-table-fast
   4.15x faster than text-table

• table - middle dataset
------------------------------------------- -------------------------------
fast-text-table              270.59 µs/iter 286.70 µs 395.00 µs ▁▇█▅▇▃▃▂▂▁▂
text-table-fast              432.70 µs/iter 447.60 µs 571.40 µs ▂█▄▄▂▂▁▁▁▁▁
text-table                     7.03 ms/iter   7.13 ms   7.34 ms ▂▃▅▅█▆▅▄▃▂▂

summary
  fast-text-table
   1.6x faster than text-table-fast
   26x faster than text-table

• table - large dataset
------------------------------------------- -------------------------------
fast-text-table                9.69 ms/iter   9.86 ms  10.02 ms ▃▄▅█▅▃▅▅▆▅▂
text-table-fast               47.22 ms/iter  47.69 ms  47.97 ms ▃▆▁▆▆█▆█▆█▆
text-table                      5.42 s/iter    5.44 s    5.44 s ▃▁▁▁█▅▁▁▃▁▆

summary
  fast-text-table
   4.88x faster than text-table-fast
   559.9x faster than text-table
```

## License

MIT
