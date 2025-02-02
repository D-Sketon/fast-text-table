import { describe, it, expect } from "vitest";
import table from "./index";
import color from "cli-color";

const ansiTrim = (s: string) => {
  return s.replace(/\u001b\[\d+m/g, "");
};

describe("table", () => {
  it("align", () => {
    const result = table(
      [
        ["beep", "1024"],
        ["boop", "33450"],
        ["foo", "1006"],
        ["bar", "45"],
      ],
      { align: ["l", "r"] }
    );
    expect(result).toBe(
      ["beep   1024", "boop  33450", "foo    1006", "bar      45"].join("\n")
    );
  });

  it("center", () => {
    const result = table(
      [
        ["beep", "1024", "xyz"],
        ["boop", "3388450", "tuv"],
        ["foo", "10106", "qrstuv"],
        ["bar", "45", "lmno"],
      ],
      { align: ["l", "c", "l"] }
    );

    expect(result).toBe(
      [
        "beep    1024   xyz",
        "boop  3388450  tuv",
        "foo    10106   qrstuv",
        "bar      45    lmno",
      ].join("\n")
    );
  });

  it("dot align", () => {
    const result = table(
      [
        ["beep", "1024"],
        ["boop", "334.212"],
        ["foo", "1006"],
        ["bar", "45.6"],
        ["baz", "123."],
      ],
      { align: ["l", "."] }
    );

    expect(result).toBe(
      [
        "beep  1024",
        "boop   334.212",
        "foo   1006",
        "bar     45.6",
        "baz    123.",
      ].join("\n")
    );
  });

  it("double dot", () => {
    const result = table(
      [
        ["0.1.2"],
        ["11.22.33"],
        ["5.6.7"],
        ["1.22222"],
        ["12345."],
        ["5555."],
        ["123"],
      ],
      { align: ["."] }
    );

    expect(result).toBe(
      [
        "  0.1.2",
        "11.22.33",
        "  5.6.7",
        "    1.22222",
        "12345.",
        " 5555.",
        "  123",
      ].join("\n")
    );
  });

  it("ansi-colors", () => {
    const options = {
      align: ["l", "c", "l"],
      stringLength: function (s: string) {
        return ansiTrim(s).length;
      },
    };
    const result = table(
      [
        [color.red("Red"), color.green("Green"), color.blue("Blue")],
        [
          color.bold("Bold"),
          color.underline("Underline"),
          color.italic("Italic"),
        ],
        [
          color.inverse("Inverse"),
          color.strike("Strike"),
          color.blink("Blink"),
        ],
        ["bar", "45", "lmno"],
      ],
      options
    );
    expect(ansiTrim(result)).toBe(
      [
        "Red        Green    Blue",
        "Bold     Underline  Italic",
        "Inverse    Strike   Blink",
        "bar          45     lmno",
      ].join("\n")
    );
  });
});
