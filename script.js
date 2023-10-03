class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }
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
  delete(value) {
    let current = this.root;
    while (current) {
      if (current.data === value) break;
      if (value < current.data) {
        if (current.left === null || current.left.data === value) {
          if (current.left === null) {
            console.log("Value not found");
            return;
          }
          let delNode = current.left;
          if (delNode.left && !delNode.right) {
            current.right = delNode.left;
          }
          if (delNode.right && !delNode.left) {
            current.left = delNode.right;
          }
          if (delNode.left && delNode.right) {
            let replaceNode = delNode.right;
            while (replaceNode.left) {
              replaceNode = replaceNode.left;
            }
            delNode.right.left = replaceNode.left;
            replaceNode.right = delNode.right;
            replaceNode.left = delNode.left;
            current.left = replaceNode;
          }

          break;
        }
        current = current.left;
      }
      if (value > current.data) {
        if (current.right === null || current.right.data === value) {
          if (current.right === null) {
            console.log("Value not found");
            return;
          }
          let delNode = current.right;
          console.log(delNode);
          if (delNode.right) {
            current.left = delNode.right;
          }
          if (delNode.left) {
            current.right = delNode.left;
          }

          break;
        }

        current = current.right;
      }
    }
  }
}

const tree = new Tree(array);
tree.delete(4);

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
