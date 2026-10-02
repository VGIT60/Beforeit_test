# Your first portfolio website

A complete sample personal portfolio built with **HTML, CSS, and JavaScript**. It includes a responsive layout, mobile menu, light/dark themes, and three working mini-projects: a task planner, color palette generator, and bill calculator.

**Alex Morgan, the biography, skills, project descriptions, and `hello@example.com` are fictional sample content. Replace them before using this as your own portfolio.** The email link opens your email application; no contact messages are sent or stored by this website. Mini-project changes reset when you reopen a preview. Only the color theme is saved in your browser.

## 1. Open your website

Download the project and double-click `index.html`. It opens in your browser. No installation, account, or build command is needed.

For a local server, if Python is installed, run this inside the project folder:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000. Stop the server with Ctrl+C.

## 2. Understand the files

| File | What it does |
| --- | --- |
| `index.html` | Your name, page sections, text, and project cards |
| `styles.css` | Colors, spacing, layout, and mobile styles |
| `script.js` | Theme switch, mobile menu, and working project previews |
| `README.md` | These instructions; GitHub shows this below your files |

**Frontend** means the part of a website people see and interact with in their browser. **GitHub** stores your project files and their history. A **repository** is a project folder on GitHub. A **commit** is a saved version of changes.

## 3. Make it yours

1. Open `index.html` in a text editor such as VS Code.
2. Replace `Alex Morgan` and `alex` with your name; update the browser title and description near the top too.
3. Replace the introduction, About text, and skills with your own information.
4. Replace both instances of `hello@example.com` with your real email and remove the sample-contact label.
5. Replace the sample project content with work you can demonstrate. The supplied interactive demos are ready to experiment with.
6. In `styles.css`, edit the colors under `:root` and `:root[data-theme="light"]` to change both themes.
7. Save your files and refresh your browser.

## 4. Add the files to GitHub — no terminal needed

This workspace is connected to `VGIT60/Beforeit_test`. These instructions also work with a new repository.

1. Sign in to [GitHub](https://github.com).
2. Open [Beforeit_test](https://github.com/VGIT60/Beforeit_test), or select **New repository** and name it `my-portfolio`.
3. Choose **Add file → Upload files**. For an empty repository, use **uploading an existing file**.
4. Upload `index.html`, `styles.css`, `script.js`, and `README.md` directly to the repository, not inside an extra folder.
5. Enter a commit message such as `Add my first portfolio website`.
6. Select **Commit changes**.

If these files already appear on GitHub, skip uploading them again.

## 5. Publish with GitHub Pages

1. In your repository, open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the branch containing your files (usually `main`) and **/ (root)**.
4. Select **Save** and wait for GitHub to finish publishing.
5. GitHub displays your live website address on the same page.

For the `VGIT60/Beforeit_test` repository, the default address would be `https://vgit60.github.io/Beforeit_test/` after successful publication. This is an expected address, not confirmation that publishing has been enabled.

GitHub Pages is available for public repositories on GitHub Free. Private-repository Pages availability depends on your plan. A Pages website can be public even when its source repository is private, so check its visibility before publishing.

## Quick check after editing

- Try the page at a narrow phone-sized width and on desktop.
- Use the navigation links and mobile menu.
- Switch between light and dark themes.
- Open each mini-project, try its controls, and close it with Escape.
- Tab through the controls to check keyboard navigation.
- Confirm that your contact link uses your actual email.

This project has no backend, paid services, dependencies, or API keys.
