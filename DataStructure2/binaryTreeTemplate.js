class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinaryTree {
    constructor() {
      this.root = null;
    }
  
    insert(value) {
      const node = new Node(value);
  
      if (this.root === null) {
        this.root = node;
        return this;
      }
  
      let current = this.root;
  
      while (true) {
        if (value === current.value) return undefined;
  
        if (value < current.value) {
          if (current.left === null) {
            current.left = node;
            return this;
          }
          current = current.left;
        } else {
          if (current.right === null) {
            current.right = node;
            return this;
          }
          current = current.right;
        }
      }
    }
  
    search(value) {
      if (this.root === null) return false;
  
      let current = this.root;
      let found = false;
  
      while (current && !found) {
        if (value < current.value) {
          current = current.left;
        } else if (value > current.value) {
          current = current.right;
        } else {
          found = true;
        }
      }
  
      if (!found) return false;
      return current;
    }
  }
  
  // Example usage
  const tree = new BinaryTree();
  
  tree.insert(10);
  tree.insert(5);
  tree.insert(15);
  tree.insert(12);
  tree.insert(20);
  
  console.log(tree.search(15)); // prints the node with value 15
  console.log(tree.search(25)); // prints false
  