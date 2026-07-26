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
clk: ~3.85 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 26.5.0 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• table - small dataset
------------------------------------------- -------------------------------
fast-text-table                4.87 µs/iter   5.34 µs   5.81 µs ▄█▄▂▁▁▁▂▂▂▂
text-table-fast                5.53 µs/iter   5.52 µs   6.29 µs ▆█▆▂▃▁▁▁▃▂▂
text-table                    20.81 µs/iter  20.90 µs  21.05 µs ▅▅▅▁▅▁██▅▅▅

summary
  fast-text-table
   1.14x faster than text-table-fast
   4.27x faster than text-table

• table - middle dataset
------------------------------------------- -------------------------------
fast-text-table              250.80 µs/iter 272.70 µs 414.30 µs ▁▅▆█▇▄▃▂▁▁▁
text-table-fast              313.86 µs/iter 321.10 µs 462.90 µs ▂█▆▅▂▂▂▁▁▂▁
text-table                     7.13 ms/iter   7.20 ms   8.36 ms ▃█▇▄▃▂▂▁▁▁▂

summary
  fast-text-table
   1.25x faster than text-table-fast
   28.42x faster than text-table

• table - large dataset
------------------------------------------- -------------------------------
fast-text-table                5.67 ms/iter   5.75 ms   6.89 ms ▂▆█▅▂▂▂▁▁▁▁
text-table-fast               26.08 ms/iter  26.53 ms  27.40 ms ▂█▇█▇▂▄▇▃▁▂
text-table                      5.77 s/iter    5.88 s    5.93 s ▆▆▁▁▁▁▁▃▆█▃

summary
  fast-text-table
   4.6x faster than text-table-fast
   1018.77x faster than text-table
```

## License

MIT
