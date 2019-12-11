# Sweet Cherry 🍒
Chrome extension to quickly insert spreadsheet rows into web forms.

🗃 [Download from the Chrome Web Store](https://chrome.google.com/webstore/detail/sweet-cherry/ochjkgkkjgagilmbaloepnddijcbgeci)

## Stack
React | TypeScript | Node v10 | Chrome Extension API | Parcel.js

## Development
1. Install dependencies using:
    ```bash
    npm install
    ```
2. Run the following to generate the Chrome Extension in `/dist`:
    ```bash
    npm run build
    ```
3. Go to `chrome://extensions/` and ensure "Developer mode" is on.
4. Click on "Load unpacked" and select the `/dist` directory.
5. To make further changes, run `npm run build` again then click on "Update".

## Contribution
Feel free to open a Pull Request with any improvement to this project.
Here are some ideas to get you started:
- [ ] Support filling other field types such as:
    - [ ] checkbox
    - [ ] radio
    - [ ] select
- [ ] Allow emptying fields when cell value is empty
- [ ] Allow disabling filling specific columns
- [ ] Validate values (e.g. if input is of type email then disallow non-email values)

## Special Thanks
To my dear friend Cherry who inspired me to build this extension :)
