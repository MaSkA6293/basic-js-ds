const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor(x) {
    this.tree = new Node(null);
    this.marker = this.tree;
  }

  root() {
    return this.tree.data === null ? null : this.tree;
  }

  add(data) {
    if (this.marker.data === null) {
      this.tree = new Node(data);
      this.marker = this.tree;
      return;
    }
    if (this.marker.data > data) {
      if (this.marker.left !== null) {
        this.marker = this.marker.left;
        this.add(data);
      } else {
        this.marker.left = new Node(data);
        this.marker = this.tree;
        return;
      }
    } else {
      if (this.marker.right !== null) {
        this.marker = this.marker.right;
        this.add(data);
      } else {
        this.marker.right = new Node(data);
        this.marker = this.tree;
        return;
      }
    }
  }

  has(data) {
    if (this.marker.data === data) {
      this.marker = this.tree;
      return true;
    }
    if (this.marker.data < data) {
      if (this.marker.right !== null) {
        this.marker = this.marker.right;
        return this.has(data);
      } else {
        this.marker = this.tree;
        return false;
      }
    } else {
      if (this.marker.left !== null) {
        this.marker = this.marker.left;
        return this.has(data);
      } else {
        this.marker = this.tree;
        return false;
      }
    }
  }

  find(data) {
    if (this.marker.data === data) {
      const obj = this.marker;
      this.marker = this.tree;
      return obj;
    } else {
      if (this.marker.data < data) {
        if (this.marker.right !== null) {
          this.marker = this.marker.right;
          return this.find(data);
        } else {
          this.marker = this.tree;
          return null;
        }
      } else {
        if (this.marker.left !== null) {
          this.marker = this.marker.left;
          return this.find(data);
        } else {
          this.marker = this.tree;
          return null;
        }
      }
    }
  }

  minNode(node) {
    if (node.left !== null) {
      return this.minNode(node.left);
    } else {
      return node;
    }
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      let newNode = this.minNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }

  remove(data) {
    this.tree = this.removeNode(this.tree, data);
  }

  min() {
    if (this.marker.left !== null) {
      this.marker = this.marker.left;
      return this.min();
    } else {
      const min = this.marker.data;
      this.marker = this.tree;
      return min;
    }
  }

  max() {
    if (this.marker.right !== null) {
      this.marker = this.marker.right;
      return this.max();
    } else {
      const max = this.marker.data;
      this.marker = this.tree;
      return max;
    }
  }
}

module.exports = {
  BinarySearchTree,
};
