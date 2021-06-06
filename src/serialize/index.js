import { defaultMarkdownSerializer, MarkdownSerializer } from 'prosemirror-markdown';


function getNodes() {
    const { nodes } = defaultMarkdownSerializer;
    return {
        blockquote: nodes.blockquote,
        codeBlock: nodes.code_block,
        heading: nodes.heading,
        horizontalRule: nodes.horizontal_rule,
        bulletList: nodes.bullet_list,
        orderedList: nodes.ordered_list,
        listItem: nodes.list_item,
        paragraph: nodes.paragraph,
        image: nodes.image,
        hardBreak: nodes.hard_break,
        text: nodes.text,
        table(state, node) {
            node.content.content.forEach((row, i) => {
                row.content.content.forEach((col, j) => {
                    if(j) {
                        state.write(' | ');
                    }
                    const cellContent = col.content.content[0];
                    if(cellContent.textContent.trim()) {
                        state.renderInline(cellContent);
                    } else {
                        state.write('&nbsp;');
                    }
                });
                state.ensureNewLine();
                if(!i) {
                    const delimiterRow = row.content.content.map(() => '---').join(' | ');
                    state.write(delimiterRow);
                    state.ensureNewLine();
                }
            });
            state.closeBlock(node);
        },
    }
}

function getMarks() {
    const { marks } = defaultMarkdownSerializer;
    return {
        bold: marks.strong,
        italic: marks.em,
        underline: {open:'<u>', close:'</u>'},
        strike: {open:'~~', close:'~~'},
    }
}

export function serialize(content) {
    const serializer = new MarkdownSerializer(getNodes(), getMarks());
    return serializer.serialize(content);
}
