import { ref, toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { useElementSize, watchDebounced } from "@vueuse/core";

export interface Format {
  width: number;
  height: number;
  depth: number;
}

export default function useFormat(
  el: Readonly<Ref<HTMLElement | null>>,
  width: MaybeRefOrGetter<number>,
  height: MaybeRefOrGetter<number>,
  depth: MaybeRefOrGetter<number>,
) {
  const { width: elWidth } = useElementSize(el);
  const format = ref<Format>({ width: 0, height: 0, depth: 0 });

  watchDebounced(
    [
      elWidth,
      () => toValue(width),
      () => toValue(height),
      () => toValue(depth),
    ],
    () => {
      const offsetWidth = elWidth.value;
      if (offsetWidth <= 0) return;
      const w = toValue(width);
      const h = toValue(height);
      const d = toValue(depth);
      format.value = {
        width: offsetWidth,
        height: Math.round(offsetWidth * (h / w)),
        depth: Math.round(d * (offsetWidth / w)),
      };
    },
    { debounce: 150, immediate: true },
  );

  return { format };
}
