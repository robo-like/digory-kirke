export interface TreeNode {
  name: string;
  /** name without the file type */
  title?: string;
  /** the path acts like an ID */
  path?: string;
  children: TreeNode[];
  isIndex?: boolean;
}

// Function to extract the numeric prefix from a filename
function extractNumericPrefix(filename: string): number {
  const match = filename.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : -1;
}

// Function to build the tree
export function buildSidebar(paths: string[]): TreeNode {
  const root: TreeNode = { name: "root", children: [] };
  const pathMap = new Map<string, TreeNode>();

  for (const path of paths) {
    const parts = path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isIndex = part.toLowerCase() === "readme.md";
      let node: TreeNode;

      if (pathMap.has(part)) {
        node = pathMap.get(part)!;
      } else {
        node = {
          name: part,
          path,
          title: part.replace(".md", ""),
          children: [],
          isIndex,
        };
        pathMap.set(part, node);
        current.children.push(node);
      }
      current = node;
    }
  }
  sortChildrenRecursively(root);
  return root;
}

// Recursive function to sort each node's children by numeric prefix
function sortChildrenRecursively(node: TreeNode): void {
  if (!node.children) {
    return;
  }
  // Sort the current node's children
  node.children.sort(
    (a, b) => extractNumericPrefix(a.name) - extractNumericPrefix(b.name),
  );
  // Recursively sort the children of the current node's children
  node.children.forEach(sortChildrenRecursively);
}
