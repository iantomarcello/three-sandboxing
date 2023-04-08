# THREEJS SANDBOXING
Lazy to recreate scenes from the scratch so made a small file system based routing *"meta framework"* for quickly scaffolding [ThreeJS](https://threejs.org/) apps in one place as a playground to experiment little things.

# Getting Started
1. Get them packages.
    ```
    npm i
    ```
1. Serve to http://localhost:5643
    ```
    npm start
    ```
    
1. Create a new sandboxing by duplicating `index.ts` and rename it anything and start coding!
# File System Routing, you say?
The server is configured in a way that any `.ts` files (except `index.ts`) within `src` folder can be served as a directory from localhost.

e.g. if you have a new sandboxing called `testing_obj.ts`, you can view the sandbox at http://localhost:5643/testing_obj

# Get rid of default Lights
The default scaffolding comes with a scene has lights set tup, if you need remove those lights in your sandboxing, add the below line at the top of the sandboxing to clear all everything in the scene.
```ts
import { defaultCube, renderer, scene, camera } from './utils/base';

scene.remove(...scene.children); // removes everything
scene.add(defaultCube); // add back default cube if you need it

// Code goes here

```

# TypeScript? What about JavaScript?
Sorry mates, this thing only support TypeScript for now. PRs to make this better or keep it updated with ThreeJS are welcomed.
