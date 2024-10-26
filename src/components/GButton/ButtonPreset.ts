import { a } from "node_modules/@storybook/vue3/dist/render-0377a2e9";
import { definePreset } from "unocss";

export default definePreset(() => {
  return {
    name: "g-button",
    rules: [
      [/^btn-(.*)$/, ([, c], { theme }) => {
        const t: { [key: string]: any } = theme;
        if (Object.keys(t.colors).includes(c)) {
          const cc = t.colors[c];
          return {
            "--btn-disabled-color": cc["3"],
            "--btn-hover-color": cc["4"],
            "--btn-normal-color": cc["5"],
            "--btn-pressed-color": cc["6"],
          };
        }
      }],
      [/^btn-text-(.*)$/, ([, c], { t }) => {
        const colorA = c.split("-");
        let selected = t;
        colorA.forEach((a) => {
          selected = t[a];
        });
        if (t.colors[c]) {
          return {
            "--btn-text-normal-color": selected,
            "--btn-text-hover-color": selected,
          };
        }
      },
      ],
    ],
    shortcuts: [
      {
        "btn-solid":
           `bg-[color:--btn-normal-color]
            text-[color:--btn-text-normal-color]
            active:bg-[color:--btn-pressed-color]
            disabled:bg-[color:--btn-disabled-color]
            hover:bg-[color:--btn-hover-color]
            hover:text-[color:--btn-text-hover-color]`,
      },
    ],
  };
});
