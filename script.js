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

    // return new Node(arr[0] ? arr[0] : null, null, null);
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
    console.log(value);
    //go through binary tree till you find the value from its parent
    //if you found delete it from its parent
    //else return not exitst
  }
}

const tree = new Tree(array);
tree.delete(9);

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
