await Deno.writeTextFile('./4.files.txt', 'Hello from Coder House, Deno!')

let content = await Deno.readTextFile('./4.files.txt')
content = `${content} <-- File content`
console.log(content)