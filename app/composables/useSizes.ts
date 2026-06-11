function getBreakpoint(breakpoint: string) {
  switch (breakpoint) {
    case "max-sm":
      return "(max-width: 639px)";
    case "max-md":
      return "(max-width: 767px)";
    case "max-lg":
      return "(max-width: 1023px)";
    case "max-xl":
      return "(max-width: 1279px)";
    case "max-2xl":
      return "(max-width: 1535px)";
    case "max-3xl":
      return "(max-width: 1689px)";
  }
}

export default function getSizes(sizes: string) {
  const sizesArray = sizes.split(" ");

  const sizesNormalized = computed(() =>
    sizesArray
      .map((size) => {
        const sizeArray = size.split(":");
        if (sizeArray.length === 1) {
          return sizeArray[0];
        }
        return `${getBreakpoint(sizeArray[0] || "")} ${sizeArray[1]}`;
      })
      .join(", ")
  );

  return sizesNormalized;
}
