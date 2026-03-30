 
 Standard Protocol To Make changes in Portfolio Website :
 
 Open Github Desktop
 
 Select the smv-portfolio website
 
 click on open in vscode
 
 open app.jsx.jsx file
 
 make edits
 
 ctrl+s
 
 go back to github desktop
 
 click on commit changes and then push origin
 
 now open command prompt and give these commands one by one
 
 cd C:\Users\HP\smv-portfolio
 
 npm run build
 
 npx gh-pages -d dist -f


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
