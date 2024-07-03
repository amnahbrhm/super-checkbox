import { html, css, LitElement } from "lit";

export class SuperTreeCheckbox extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--super-tree-checkbox-text-color, #000);
    }
  `;

  static properties = {
    header: { type: String },
    counter: { type: Number },
    tree: { type: Array },
  };

  constructor() {
    super();
    this.header = "Hey there";
    this.counter = 5;
    this.tree = [];
  }

  __increment() {
    this.counter += 1;
  }

  render() {
    this.partialSelect();
    // console.log(this.tree)
    console.log(this.createDom())
    return html`${this.createDom()} `;
  }

  createDom(tree = this.tree, left = 0) {
    const dom = document.createElement("div");
    dom.style.position = `relative`;
    dom.style.left = `${left}px`;
    for (const treeNode of tree) {
      const div = document.createElement("div");
      const node = document.createElement("input");
      const label = document.createElement("label");
      node.setAttribute("type", "checkbox");
      node.setAttribute("id", treeNode.key);
      node.checked = treeNode.selected;
      console.log(node.checked , treeNode.value)
      label.setAttribute("for", treeNode.key);
      label.append(treeNode.value);
      div.append(node);
      div.append(label);
      dom.append(div);
      node.onclick = this.nodeClicked.bind(this, treeNode);
      if (treeNode.children) {
        dom.append(this.createDom(treeNode.children, 10));
      }
    }
    return dom;
  }
  nodeClicked(node) {
    node.selected = !node.selected
    if(node.selected && node.children)
      for (const child of node.children) {
        child.selected = true
      }
    this.render();
  }
  partialSelect(nodeTree = this.tree) {
    for (const treeNode of nodeTree) {
      this.select(treeNode);
    }
  }
  select(node) {
    let count = 0;
    if (node.children)
      for (let child of node.children) {
        if (this.select(child)) count++;
      }

    node.selected = node.selected || count == node?.children?.length
    return node.selected
  }
}
