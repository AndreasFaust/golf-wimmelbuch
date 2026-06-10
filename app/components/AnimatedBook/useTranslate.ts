import { computed, type Ref } from "vue";
import type { Format } from "./useFormat";

export default function useTranslate(format: Ref<Format>) {
  return computed(() => {
    const f = format.value;
    if (!f) return "";
    return `-${f.width / 2}px, -${f.height / 2}px, ${f.depth / 2}px`;
  });
}
