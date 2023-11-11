import { Mark } from "@tiptap/core";


const Underline = Mark.create({
    name: 'underline',
});

export default Underline.extend({
    /**
     * @return {{markdown: MarkdownMarkSpec}}
     */
    addStorage() {
        return {
            markdown: {
                serialize: {open: '__', close: '__', expelEnclosingWhitespace: true},
                parse: {
                    // handled by markdown-it
                },
            },
        }
    }
});
