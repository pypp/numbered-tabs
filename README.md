# Numbered tabs

A simple chrome extension that adds a number before the tab title.  
Helpful for those who use the keyboard shortcut `⌘/Ctrl + <num>` to switch between tabs.

![example-image](screenshot.png)


## Limitations

It doesn't work for any internal chrome pages (pages that start with `chrome://`). Google doesn't give developers permission to modify such pages.
Examples of internal chrome pages include the following:

- New tab page
- Extensions page
- Settings page

## Development 

To install dependencies run:

```sh
npm install
```

To build the extension run:

```sh
npm run build
```

To test the extension check [Manual Installation](#manual-installation).

## Manual Installation

### Chrome

1. Open Chrome and go to **chrome://extensions**

2. Toggle on **Developer mode** checkbox in the top right-hand corner.

3. Click the **Load unpacked extension** button and select the **dist** folder.

### Firefox

1. Open Firefox and go to **about:debugging#addons**

2. Click **Temporary Extensions**

3. Click the **Load Temporary Add-on…** and select the **manifest.json** file from the **dist** folder.


## Acknowledgements

This extension is a TypeScript rewrite of the [numbered-tabs extension](https://github.com/narinluangrath/numbered-tabs) and also supports [manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro)
