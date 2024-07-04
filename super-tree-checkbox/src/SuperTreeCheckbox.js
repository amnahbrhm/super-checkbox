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
      !treeNode.selected && (node.indeterminate = treeNode.partialSelect);
      node.checked = treeNode.selected;
      label.setAttribute("for", treeNode.key);
      label.append(treeNode.value);
      div.append(node);
      div.append(label);
      dom.append(div);
      node.onclick = this.nodeClicked.bind(this, treeNode);
      if (treeNode.children) {
        treeNode.leaf = false;
        dom.append(this.createDom(treeNode.children, 10));
      } else treeNode.leaf = true;
    }
    return dom;
  }
  nodeClicked(node) {
    node.selected = !node.selected;
    this.clickNode(node, node.selected);
    // this.partialSelect()
    this.requestUpdate();
  }
  clickNode(node, select) {
    node.selected = select;
    node.partialSelect = false;
    if (node.children)
      for (const child of node.children) {
        this.clickNode(child, select);
      }
  }
  partialSelect(nodeTree = this.tree) {
    for (const treeNode of nodeTree) {
      this.select(treeNode);
    }
  }
  select(node) {
    let count = 0;
    let partialChild = false;
    if (node.children)
      for (let child of node.children) {
        let obj = this.select(child);
        partialChild = obj.partial;
        if (obj.select) count++;
      }
    if (!node?.children) node.selected = node.selected;
    else node.selected = count == node?.children?.length;
    if (node?.children && !node.selected) node.partialSelect = partialChild;
    if (count < node.children?.length && count > 0) node.partialSelect = true;
    return { select: node.selected, partial: node.partialSelect };
  }
}
ƒ