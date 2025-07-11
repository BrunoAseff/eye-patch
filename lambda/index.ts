import { targets } from "./targets";

export const handler = async () => {
  const responses = await Promise.all(
    targets.map(target => fetch(target.url))
  );

  return responses.map(response => response.status);
};

if (require.main === module) {
  handler();
}
