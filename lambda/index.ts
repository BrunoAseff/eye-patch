import { targets } from "./targets"

(async () => {
    const responses = await Promise.all(
        targets.map(target => fetch(target.url))
    );
    console.log(responses.map(response => response.status));
})();