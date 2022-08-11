import {
    assert,
    assertStrictEquals
} from "https://deno.land/std@0.144.0/testing/asserts.ts"

Deno.test("Hello Test", () => {
    assert("Hello");
})

Deno.test({
    name: "Testing example",
    fn() {
        assertStrictEquals("World", "World");
    },
});

Deno.test("Test 3", () => {
    assertStrictEquals("World", "Not World")
})