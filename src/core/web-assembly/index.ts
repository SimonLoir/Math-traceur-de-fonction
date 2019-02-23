// Great resource : https://dev.to/jtenner/an-assemblyscript-primer-for-typescript-developers-lf1
export async function getCode(exp: string) {
    //@ts-ignore
    let a = await WebAssembly.instantiateStreaming(
        fetch(
            "http://localhost:5000/smath-webassembly/us-central1/buildWasm?exp=" +
                encodeURIComponent(exp) +
                "&parse=true"
        ),
        {
            env: { Math_cos: Math.cos, Math_sin: Math.sin }
        }
    );
    //@ts-ignore
    let e = a.instance.exports;
    return e.add;
}
