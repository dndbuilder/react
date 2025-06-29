export function generateDropCap(dropCap?: boolean) {
  if (!dropCap) {
    return {};
  }
  return {
    "&::first-letter": {
      float: "left",
      fontSize: "2.5rem",
      lineHeight: "1.5rem",
      marginRight: "0.5rem",
      marginTop: "0.5rem",
    },
  };
}
