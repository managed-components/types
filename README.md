# Typescript Definitions for Managed Components

Find out more about Managed Components [here.](https://managedcomponents.dev)
## Install

```bash
npm install -D @managed-components/types
-- Or
yarn add -D @managed-components/types
```

## Usage

The following is a minimal `tsconfig.json` for use alongside this package:

**`tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "lib": ["es2022"],
    "types": ["@managed-components/types"]
  }
}
```
