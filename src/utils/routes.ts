import router from "next/router";

export const navigateToPage = (url: string) => {
  router.push(url);
};
