import site from "./tumnus-docs/site.built.json";
import { generatePage } from "./main.generatePage";

if (!site.pages) {
  throw new Error("site must be pre-built prior to running the server");
}
export interface Env {
  API_HOST: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);

    // console.log(pathname);
    // console.log(site.pages);

    if (pathname == "/") {
      //@ts-ignore
      return new Response(generatePage("/readme.md", site), {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    }
    //@ts-ignore
    if (site.pages[pathname]) {
      //@ts-ignore
      return new Response(generatePage(pathname, site), {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    }
    // Example routing
    switch (pathname) {
      case "/":
        return new Response(JSON.stringify(site), {
          status: 200,
          headers: { "Content-Type": "text/json" },
        });
      case "/about":
        return new Response("About Page", {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      case "/api/data":
        // Example of parsing query params if needed
        const queryParams = url.searchParams;
        const param = queryParams.get("param"); // Example: ?param=value
        return new Response(`API Data for param: ${param}`, {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      default:
        return new Response("Not Found", {
          status: 404,
          headers: { "Content-Type": "text/plain" },
        });
    }
  },
};
