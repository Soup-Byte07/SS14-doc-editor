const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "public/txt/ss14-forms-txt");
let txtFiles = [];

function walk(dir, base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, relativePath);
    } else if (entry.name.endsWith(".txt")) {
      txtFiles.push(relativePath);
    }
  }
}

walk(rootDir);

fs.writeFileSync(
  path.join(__dirname, "public/txtManifest.json"),
  JSON.stringify(txtFiles, null, 2)
);
