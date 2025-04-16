# Deployment Playbook

## Notes

### **1. Vercel + Node.js Golden Rules**

- **Always** define `build` scripts in `package.json`
- **Always** configure `vercel.json` for:

  ```json
  {
    "builds": [
      { "src": "package.json", "use": "@vercel/static-build" }, // For static files
      { "src": "index.js", "use": "@vercel/node" } // For server
    ]
  }
  ```

### **2. Tailwind CSS Must-Dos**

- Use **absolute paths** (`/output.css`) in HTML
- Commit built CSS **or** ensure deployment runs `build:css`
- Test with `--minify` locally before deploying

### **3. Pro Tip for Debugging**

When styles break:

1. Open DevTools → **Network** tab → Check if CSS loads (status `200`)
2. Run `vercel dev` locally to simulate production
3. Check `vercel-build.log` in deployment logs

---

### **Your Next Project Checklist**

1. Clone this **foolproof starter template**:

   ```bash
   git clone https://github.com/vercel/examples/tree/main/express/express-tailwind my-project
   ```

2. Run:

   ```bash
   npm install
   vercel dev
   ```

---

**P.S.** Bookmark this conversation—it’s your personal deployment playbook now. 😉
