import { definePreset } from "unocss";

export default definePreset(() => {
  return {
    name: "g-button",
    shortcuts: {
      "btn-solid": `bg-[color:--btn-normal-color]
        text-[color:--btn-text-normal-color]
        hover:bg-[color:--btn-hover-color]
        hover:text-[color:--btn-text-hover-color]
        active:bg-[color:--btn-pressed-color]

        outline
        outline-1
        outline-transparent

        disabled:text-[color:--btn-disabled-text-color]
        disabled:outline-[color:--btn-disabled-ring-color]
        disabled:bg-[color:--btn-disabled-color]
        disabled:hover:bg-[color:--btn-disabled-color]
        disabled:active:bg-[color:--btn-disabled-color]

        loading:outline-transparent
        loading:text-[color:--btn-text-normal-color]
        loading:bg-[color:--btn-loading-color]
        loading:hover:bg-[color:--btn-loading-color]
        loading:active:bg-[color:--btn-loading-color]`,
      "btn-outlined": `bg-transparent
        outline
        outline-1

        outline-[color:--btn-outlined-normal-color]
        text-[color:--btn-text-outlined-color]
        hover:text-[color:--btn-outlined-hover-color]
        hover:outline-[color:--btn-outlined-hover-color]
        active:text-[color:--btn-outlined-pressed-color]
        active:outline-[color:--btn-outlined-pressed-color]

        disabled:bg-[color:--btn-disabled-color]
        disabled:outline-[color:--btn-disabled-ring-color]
        disabled:text-[color:--btn-disabled-text-color]
        disabled:hover:outline-[color:--btn-disabled-ring-color]
        disabled:hover:text-[color:--btn-disabled-text-color]
        disabled:active:outline-[color:--btn-disabled-ring-color]
        disabled:active:text-[color:--btn-disabled-text-color]

        loading:text-[color:--btn-outlined-pressed-color]
        loading:outline-[color:--btn-outlined-pressed-color]
        loading:bg-transparent
        loading:hover:outline-[color:--btn-outlined-pressed-color]
        loading:hover:text-[color:--btn-outlined-pressed-color]
        loading:active:text-[color:--btn-outlined-pressed-color]
        loading:active:outline-[color:--btn-outlined-pressed-color]`,
    },
    rules: [
      [/^btn-default$/, ([], { theme }) => {
        const t: { [key: string]: any } = theme;
        return {
          "--btn-disabled-color": t.colors["gray"][5],
          "--btn-disabled-ring-color": t.colors["gray"][6],
          "--btn-disabled-text-color": t.colors["gray"][7],
          "--btn-loading-color": t.colors["primary"][3],
          "--btn-hover-color": t.colors["primary"][4],
          "--btn-normal-color": t.colors["primary"][5],
          "--btn-pressed-color": t.colors["primary"][6],
          "--btn-outlined-normal-color": t.colors["gray"][5],
          "--btn-outlined-hover-color": t.colors["primary"][4],
          "--btn-outlined-pressed-color": t.colors["primary"][6],
          "--btn-text-outlined-color": t.colors["gray"][13],
          "--btn-text-normal-color": t.colors["gray"][1],
          "--btn-text-hover-color": t.colors["gray"][1],
          "--btn-text-link-color": t.colors["primary"][5],
        };
      }],
      [/^btn-(.*)$/, ([, c], { theme }) => {
        const t: { [key: string]: any } = theme;
        if (Object.keys(t.colors).includes(c)) {
          const cc = t.colors[c];
          return {
            "--btn-disabled-color": t.colors["gray"][5],
            "--btn-disabled-ring-color": t.colors["gray"][6],
            "--btn-disabled-text-color": t.colors["gray"][7],
            "--btn-loading-color": cc[3],
            "--btn-hover-color": cc[4],
            "--btn-normal-color": cc[5],
            "--btn-pressed-color": cc[6],
            "--btn-outlined-normal-color": cc[5],
            "--btn-outlined-hover-color": cc[4],
            "--btn-outlined-pressed-color": cc[6],
            "--btn-text-outlined-color": cc[5],
            "--btn-text-normal-color": t.colors["gray"][1],
            "--btn-text-hover-color": t.colors["gray"][1],
            "--btn-text-link-color": cc[5],
          };
        }
      }],
    ],
  };
});
