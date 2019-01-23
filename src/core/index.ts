import Parser from './parser';

export default class smath {
    private parser: Parser = undefined;
    private tokenizer: any = undefined;
    /**
     * Gives access to all the tools available
     * and that works on expressions
     */
    public get expression() {
        if (this.parser == undefined) this.parser = new Parser();
        //if (this.tokenizer == undefined) this.tokenizer = new Parser();
        return { parser: this.parser, tokenizer: this.tokenizer };
    }
}
