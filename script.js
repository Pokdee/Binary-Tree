class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

//fn to build bn tree
const buildTree = function (arr) {
  if (arr.length <= 1) {
    if (arr[0]) {
      return new Node(arr[0], null, null);
    } else {
      return null;
    }
  }

  let sortArr = [];
  if (arr.length > 1) {
    sortArr = arr.sort((a, b) => a - b);
    sortArr = sortArr.filter((e, i, ar) => {
      if (e !== ar[i + 1]) {
        return e;
      }
    });
  }
  let midIdx = Math.floor(sortArr.length / 2);
  let mid = sortArr[midIdx];
  let leftHalf = sortArr.slice(0, midIdx);
  let rightHalf = sortArr.slice(midIdx + 1, sortArr.length);

  return new Node(mid, buildTree(leftHalf), buildTree(rightHalf));
};

//tree class
class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }

  //add node to tree
  insert(value) {
    let current = this.root;
    while (current) {
      if (current.data === value) break;
      if (current.data > value) {
        if (current.left === null) {
          current.left = new Node(value, null, null);

          break;
        }
        current = current.left;
      }
      if (current.data < value) {
        if (current.right === null) {
          current.right = new Node(value, null, null);
          break;
        }
        current = current.right;
      }
    }
  }

  //fn remove node with double child node
  removeNodeMultiChild(delNode) {
    let replaceNodePar = delNode.right;
    let replaceNode = replaceNodePar.left;
    while (replaceNode.left) {
      replaceNodePar = replaceNode;
      replaceNode = replaceNode.left;
    }

    replaceNodePar.left = replaceNode.left;
    replaceNode.right = delNode.right;
    replaceNode.left = delNode.left;
    return replaceNode;
  }

  //delete node from tree
  delete(value) {
    if (!value) {
      return;
    }
    //if value equal to root data
    if (this.root.data === value) {
      let delNode = this.root;
      let replaceNodePar = delNode.right;
      let replaceNode = replaceNodePar.left;
      while (replaceNode.left) {
        replaceNodePar = replaceNode;
        replaceNode = replaceNode.left;
      }

      this.root = replaceNode;
      replaceNodePar.left = replaceNode.left;
      replaceNode.right = delNode.right;
      replaceNode.left = delNode.left;

      return;
    }
    let current = this.root;
    while (current) {
      ///if value smaller than node data
      if (value < current.data) {
        if (current.left === null || current.left.data === value) {
          if (current.left === null) {
            console.log("Value not found");
            return;
          }
          let delNode = current.left;
          if (delNode.left && !delNode.right) {
            current.left = delNode.left;
          }
          if (delNode.right && !delNode.left) {
            current.right = delNode.right;
          }
          if (delNode.left && delNode.right) {
            current.left = this.removeNodeMultiChild(delNode);
          }
          if (!delNode.left && !delNode.right) {
            current.left = null;
          }

          break;
        }
        current = current.left;
      }
      //if value greater then node data
      if (value > current.data) {
        if (current.right === null || current.right.data === value) {
          if (current.right === null) {
            console.log("Value not found");
            return;
          }
          let delNode = current.right;
          console.log(delNode);
          if (delNode.right && !delNode.left) {
            current.left = delNode.right;
          }
          if (delNode.left && !delNode.right) {
            current.right = delNode.left;
          }
          if (delNode.left && delNode.right) {
            current.right = this.removeNodeMultiChild(delNode);
          }
          if (!delNode.left && !delNode.right) {
            current.right = null;
          }

          break;
        }

        current = current.right;
      }
    }
  }
  //find node
  find(value) {
    let current = this.root;
    while (current && current.data !== value) {
      if (value > current.data) {
        current = current.right;
      }

      if (current) {
        if (value < current.data) {
          current = current.left;
        }
      }
    }
    if (current) {
      return current;
    }
    return null;
  }
  //breath first traversal
  breadthFirst(node) {
    if (!node) return;
    let queue = [];
    let visited = [];

    queue.push(node);

    while (queue.length > 0) {
      let node = queue.shift();
      if (node.left && node.right) {
        queue.push(node.left);
        queue.push(node.right);
      }
      if (node.left && !node.right) {
        queue.push(node.left);
      }
      if (node.right && !node.left) {
        queue.push(node.right);
      }
      visited.push(node.data);
    }
    return visited;
  }

  //breath first traversal output
  levelOrder(node) {
    return node;
  }

  //Depth first inOrder   //L D R
  #inOrdertreversal(node) {
    if (!node) return;

    if (!node.left && !node.right) {
      return [node];
    }

    let stack = [];

    if (node.left && node.right) {
      stack.push(node);
      stack.push(...this.#inOrdertreversal(node.left));
    }
    if (node.left && !node.right) {
      stack.push(node);

      stack.push(...this.#inOrdertreversal(node.left));
    }

    let data = [];
    while (stack.length > 0) {
      let n = stack.pop();
      if (n.length !== 0) {
        data.push(n.data);
        console.log(n.data);
      }

      if (n.right) {
        stack.push(...this.#inOrdertreversal(n.right));
      }
    }

    return stack;
  }

  //inOrder Output
  inOrder() {
    this.#inOrdertreversal(this.root);
  }

  //postOrder       //L R D
  #postOrderTraversal(node) {
    if (!node) return;

    if (!node.right && !node.left) {
      return [node];
    }

    let stack = [];
    stack.push(node);

    if (node.left && node.right) {
      stack.push(...this.#postOrderTraversal(node.left));
    }
    if (node.left && !node.right) {
      stack.push(...this.#postOrderTraversal(node.left));
    }
    if (node.right && !node.left) {
      stack.push(...this.#postOrderTraversal(node.right));
    }

    while (stack.length !== 0) {
      let n = stack.pop();
      if (!n.right && n.data) {
        console.log(n.data);
      }
      if (n.right) {
        stack.push(...this.#postOrderTraversal(n.right));
        console.log(n.data);
      }
    }
    return stack;
  }

  //postOrder output
  postOrder() {
    this.#postOrderTraversal(this.root);
  }

  //preOrder traversal  //D L R
  #preOrderTraversal(node) {
    if (!node) return;

    if (!node.left && !node.right) {
      console.log(node.data);
      return;
    }

    if (node.left && node.right) {
      console.log(node.data);
      this.#preOrderTraversal(node.left);
      this.#preOrderTraversal(node.right);
    }
    if (node.left && !node.right) {
      console.log(node.data);
      this.#preOrderTraversal(node.left);
    }
    if (!node.left && node.right) {
      console.log(node.data);
      this.#preOrderTraversal(node.right);
    }
  }

  //preOrder
  preOrder() {
    this.#preOrderTraversal(this.root);
  }

  //height
  height(node) {
    if (node === null) {
      return -1;
    }

    let leftHei = this.height(node.left);
    let rightHei = this.height(node.right);

    let height = Math.max(leftHei, rightHei) + 1;
    return height;
  }

  //depth
  depth(node) {
    if (!node) return null;
    let current = this.root;
    let depth = 0;
    while (current && current.data !== node.data) {
      if (node.data > current.data) {
        depth++;
        current = current.right;
      }
      if (node.data < current.data) {
        depth++;
        current = current.left;
      }
    }
    if (current) {
      return depth;
    } else {
      return null;
    }
  }

  // check balanced
  isBalanced(node) {
    if (node === null) {
      return -1;
    }

    let leftHei, rightHei;
    let height, heiDiff;

    //we get heights from here
    leftHei = this.isBalanced(node.left);
    if (Number.isInteger(leftHei)) {
      rightHei = this.isBalanced(node.right);
    }
    if (Number.isInteger(rightHei)) {
      height = Math.max(leftHei, rightHei) + 1;
      heiDiff = Math.abs(leftHei - rightHei);
    }

    if (heiDiff > 1) {
      return;
    }

    if (Number.isInteger(height) && node === this.root) {
      return "The tree is balanced 😊";
    }
    if (Number.isInteger(height)) {
      return height;
    }
    return "The tree is not balanced ⚠️";
  }
}

const tree = new Tree(array);

console.log(tree.isBalanced(tree.root));

////Tree printing method
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);
