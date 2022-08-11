import { serve } from "https://deno.land/std@0.144.0/http/server.ts";

const port = 8080;

function handler(_request: Request): Response {
    const body = 'Hellow world from Deno server!';
    return new Response(body, {status: 200});
}

await serve(handler, {port});