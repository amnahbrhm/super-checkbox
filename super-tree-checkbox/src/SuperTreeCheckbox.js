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
    return html`${this.createDom(this.tree)} `;
  }

  createDom(tree, left = 0) {
    const dom = document.createElement("div");
    //TODO add click event to reflect parent check
    dom.style.position = `relative`
    dom.style.left = `${left}px`
    console.log(tree);
    for (const treeNode of tree) {
      const node = document.createElement("input");
      const label = document.createElement("label");
      node.setAttribute("type", "checkbox");
      node.setAttribute("id", treeNode.key);
      label.setAttribute("for", treeNode.key);
      label.append(treeNode.value);
      dom.append(node);
      dom.append(label);
      if (treeNode.children) {
        dom.append(this.createDom(treeNode.children, 10));
      }
    }
    return dom;
  }
}
