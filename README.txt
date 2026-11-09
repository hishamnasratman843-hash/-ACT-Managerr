ACT MANAGER — MANUAL EMPLOYEE CODES, STORAGE PROTECTION & OFFLINE SHELL

Included: index.html, style.css, script.js, service-worker.js, manifest.json, icons/.

Changes in this revision:
- When adding an employee, enter their own unique 6-digit attendance code. The app validates the code and rejects duplicates. Editing an employee allows changing the code; the existing code is prefilled.
- Employees opened from the More section now have an X/return control. Existing return/close controls in other screens were kept unchanged.
- Settings can request persistent browser storage and display the actual storage usage/quota reported by the browser. Browsers do not allow a website to force-reserve 2 GB; the device/browser decides the quota.
- The service worker now caches Firebase JavaScript modules from gstatic after the app has loaded online once, so the already-installed app shell and cached Firebase modules can start offline.

Offline limitations:
- First installation and first successful load of Firebase modules require internet. After one successful online load, the app shell and Firebase modules can be served from cache.
- Local data remains available on the same browser/device. Cloud sync, sign-in requests that need the server, and updates require internet; pending cloud writes are managed by the app's existing sync queue when connectivity returns.
- Do not clear browser site data or Local Storage if you need to preserve local records.

Install/update:
1. Back up the current project folder and export an ACT data backup.
2. Replace the project files with these files in the same project folder.
3. Open once while online so the updated Service Worker and Firebase modules are cached.
4. After that, previously signed-in users can reopen the installed app offline for locally available data.
