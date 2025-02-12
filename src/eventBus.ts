import mitt from "mitt";

export type Events = {
  storageUpdate: null;
  spaceUpdate: null;
  productUpdate: null;
};

export const emitter = mitt<Events>();
