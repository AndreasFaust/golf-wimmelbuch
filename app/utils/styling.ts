export default {
  paragraph:
    "hyphens-auto leading-[1.5rem] sm:leading-[1.6rem] md:leading-[1.9rem] text-base sm:text-lg md:text-xl font-serif",
  children: {
    strong: "font-bold",
    em: "italic",
    link: "underline decoration-transparent hover:decoration-primary decoration-1 underline-offset-4 text-primary transition-all",
  },
  list: {
    ul: cn(
      "hyphens-auto",
      "[&>li]:pl-[1em] [&>li]:relative",
      "[&>li]:hyphenation",
      "[&>li]:before:absolute [&>li]:before:left-0",
      "[&>li]:before:content-['•']",
      "[&>li]:leading-[1.7rem] [&>li]:md:leading-[1.9rem] [&>li]:text-base [&>li]:md:text-xl"
    ),
    ol: cn(
      "hyphens-auto",
      "[counter-reset:list]",
      "[&>li]:pl-[1.5em] [&>li]:relative",
      "[&>li]:hyphenation",
      "[&>li]:before:absolute [&>li]:before:left-0",
      "[&>li]:before:content-[counter(list)_'.']",
      "[&>li]:before:[counter-increment:list]",
      "[&>li]:leading-[1.7rem] [&>li]:md:leading-[1.9rem] [&>li]:text-base [&>li]:md:text-xl"
    ),
  },
  headline: {
    h2: "h2 font-sans mt-[1.5em] first:mt-0",
    h3: "h3 mt-[1em] first:mt-0",
  },
  blockquote: "pl-2em",
  image: {
    wrapper: "relative overflow-hidden",
    img: "absolute inset-0 h-full w-full object-cover",
  },
};

export type TStyling = {
  paragraph: string;
  children: {
    link: string;
    strong: string;
    em: string;
  };
  list: {
    ul: string;
    ol: string;
  };
  headline: Record<string, string>;
  blockquote: string;
  image: {
    wrapper: string;
    img: string;
  };
};
