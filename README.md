# fast-text-table

![npm bundle size](https://img.shields.io/bundlephobia/min/fast-text-table) ![npm](https://img.shields.io/npm/v/fast-text-table) ![NPM](https://img.shields.io/npm/l/fast-text-table)  

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
clk: ~4.03 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 24.1.0 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• table - small dataset
------------------------------------------- -------------------------------
table                          4.83 µs/iter   4.94 µs           █ ▃        
                        (4.52 µs … 5.25 µs)   5.19 µs   ▇  ▇   ▇█ █▇
                    (  1.28 kb …   1.36 kb)   1.30 kb ▆▆█▆▆█▆▁▁██▁██▆▆▁▆▁▁▆

text-table                    19.93 µs/iter  19.80 µs      █  █
                      (19.15 µs … 22.90 µs)  20.61 µs ▅ ▅▅ █▅ █▅▅         ▅
                    (  3.07 kb …   3.16 kb)   3.11 kb █▁██▁██▁███▁▁▁▁▁▁▁▁▁█

summary
  table
   4.12x faster than text-table

• table - large dataset
------------------------------------------- -------------------------------
table                         81.14 µs/iter  78.60 µs  █
                       (67.80 µs … 1.44 ms) 204.10 µs  █▂
                    ( 65.80 kb … 505.29 kb) 319.85 kb ███▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

text-table                     4.12 ms/iter   4.20 ms    █
                        (3.64 ms … 7.11 ms)   6.18 ms    █▃
                    (  1.36 mb …   1.41 mb)   1.37 mb ▅▆▇███▃▃▂▁▁▁▁▁▁▁▁▁▁▁▁

summary
  table
   50.83x faster than text-table
```

## License

MIT
