export async function getCode(exp: string) {
    //@ts-ignore
    let a = await WebAssembly.instantiateStreaming(
        fetch(
            'http://localhost:5000/smath-webassembly/us-central1/buildWasm?exp=' +
                exp
        ),
        {}
    );
    //@ts-ignore
    let e = a.instance.exports;
    return e.add;
}
