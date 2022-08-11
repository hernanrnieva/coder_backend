console.log(Deno.args)

const port = Number(Deno.env.get("PORT")) || 8080
console.log(port)