import type { PropType } from "vue";

export default defineComponent({
  name: "PageContainer",
  props: {
    as: {
      type: String,
      required: false,
      default: "div",
    },
    size: {
      type: String as PropType<"xl" | "2xl" | "sm" | "full">,
      required: false,
      default: "xl",
    },
  },
  render() {
    // change this into a switch if more are needed
    let screenSize: string;
    switch (this.$props.size) {
      case "xl":
        screenSize = "max-w-screen-xl lt-xlp:px-4";
        break;
      case "2xl":
        screenSize = "max-w-screen-2xl lt-2xlp:px-4";
        break;
      case "sm":
        screenSize = "max-w-screen-sm px-4";
        break;
      case "full":
        screenSize = "px-4";
        break;
    }

    const className = `mx-auto ${screenSize} lt-sm:px-2`;

    return h(this.$props.as, { class: className }, this.$slots);
  },
});
