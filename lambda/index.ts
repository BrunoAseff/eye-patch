import { targets } from "./targets";

export const handler = async () => {
  const responses = await Promise.all(
    targets.map(target => fetch(target.url))
  );

  console.log(responses.map(response => response.status));
};