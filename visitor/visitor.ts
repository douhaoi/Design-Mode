interface VisitorHandler {
  visitorImageBlock: (block: Block) => void;
  visitorVideoBlock: (block: Block) => void;
  visitorAuddioBlock: (block: Block) => void;
}

interface Block {
  block_id: number;
  accept: (visitor: VisitorHandler) => void;
}

interface BlockEditorClass {
  blocks: Block[];
  addBlock: (block: Block) => void;
  removeBlock: (block: Block) => void;
  visit: () => void;
}

class ImageBlock implements Block {
  block_id: number = new Date().getTime();
  accept(visitor: Visitor) {
    visitor.visitorImageBlock(this);
  }
}

class AudioBlock implements Block {
  block_id: number = new Date().getTime();
  accept(visitor: Visitor) {
    visitor.visitorAuddioBlock(this);
  }
}

class VideoBlock implements Block {
  block_id: number = new Date().getTime();
  accept(visitor: Visitor) {
    visitor.visitorVideoBlock(this);
  }
}

class Visitor implements VisitorHandler {
  visitorImageBlock(block: Block) {
    console.log("图片：", block);
  }

  visitorAuddioBlock(block: Block) {
    console.log("音频：", block);
  }

  visitorVideoBlock(block: Block) {
    console.log("视频：", block);
  }
}

class BlockEditor implements BlockEditorClass {
  blocks: Block[] = [];

  addBlock(block: Block) {
    this.blocks.push(block);
    return this;
  }

  removeBlock(block: Block) {
    const index = this.blocks.findIndex(
      (item) => item.block_id === block.block_id
    );
    if (index > -1) {
      this.blocks.splice(index, 1);
    }
  }

  visit() {
    this.blocks.forEach((block: Block) => {
      block.accept(visitor);
    });
  }
}

// 创建访问者
const visitor = new Visitor();

// 创建对象
const imageBlock = new ImageBlock();
const videoBlock = new VideoBlock();
const audioBlock = new AudioBlock();

// 进行访问
const blocks = new BlockEditor();

blocks.addBlock(imageBlock).addBlock(videoBlock).addBlock(audioBlock);

blocks.visit();
