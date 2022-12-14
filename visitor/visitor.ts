interface Visitor {
  visitHeaderBlock: (block: Block) => string;
  visitParagraphBlock: (block: Block) => string;
  visitImageBlock: (block: Block) => string;
}

interface Block {
  type: string;
  data: Record<string, any>;
  accept: (visitor: Visitor) => string;
}

interface HeaderBlockData {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

interface ParagraphBlockData {
  text: string;
}

interface ImageBlockData {
  url: string;
}

class HeaderBlock implements Block {
  type = "header";

  constructor(public data: HeaderBlockData) {}

  accept(visitor: Visitor): string {
    return visitor.visitHeaderBlock(this);
  }
}

class ParagraphBlock implements Block {
  type = "paragraph";

  constructor(public data: ParagraphBlockData) {}

  accept(visitor: Visitor): string {
    return visitor.visitParagraphBlock(this);
  }
}

class ImageBlock implements Block {
  type = "image";

  constructor(public data: ImageBlockData) {}

  accept(visitor: Visitor): string {
    return visitor.visitImageBlock(this);
  }
}

class BlockEditor {
  blocks: Block[] = [];

  addBlock(block: Block) {
    this.blocks.push(block);
    return this;
  }

  removeBlock(block: Block) {
    const index = this.blocks.indexOf(block);
    if (index != -1) {
      this.blocks.splice(index, 1);
    }
  }

  accept(visitor: Visitor) {
    let str = '';
    this.blocks.forEach((block) => {
      str = block.accept(visitor);
    });

    return str;
  }
}

class HTMLVisitor implements Visitor {
  visitResult:string = '';

  visitHeaderBlock(block: Block) {
    return this.visitResult += `<h${block.data.level}>${block.data.text}</h${block.data.level}>` + "\n\r";
  }

  visitParagraphBlock(block: Block) {
    return this.visitResult += `<p>${block.data.text}</p>` + "\n\r";
  }

  visitImageBlock(block: Block) {
    return this.visitResult += `<img src="${block.data.url}" />` + "\n\r";
  }
}

class MarkDownVisitor implements Visitor {
  visitResult:string = '';
  
  visitHeaderBlock(block: Block) {
    return this.visitResult += `${new Array(block.data.level).fill("#").join("")} ${
      block.data.text
    }` + "\n\r";
  }

  visitParagraphBlock(block: Block) {
    return this.visitResult += `${block.data.text}` + "\n\r";
  }

  visitImageBlock(block: Block) {
    return this.visitResult += `![](${block.data.url})` + "\n\r";
  }
}

const blockEditor = new BlockEditor();

blockEditor
  .addBlock(new HeaderBlock({ text: "一级标题", level: 1 }))
  .addBlock(new ParagraphBlock({ text: "段落" }))
  .addBlock(
    new ImageBlock({
      url: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
    })
  );

const htmlVisitor = new HTMLVisitor();
const markDownVisitor = new MarkDownVisitor();
const htmlResult = blockEditor.accept(htmlVisitor);
const markdownResult = blockEditor.accept(markDownVisitor);

/**
 * <h1>一级标题</h1>
 * <p>段落</p>
 * <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
 */
console.warn(htmlResult);
/**
 * # 一级标题
 * 段落
 * ![](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png)
 */
console.warn(markdownResult);
