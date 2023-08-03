type Tab = chrome.tabs.Tab;

const tabs = chrome.tabs;

/**
 * Add numeric prefix to tab title (i.e. '4. Facebook - Login')
 * according to tab's position relative to other tabs. If the
 * prefix already exists, update it to make sure it's accurate.
 * @param {Tab} tab - a [Chrome API Tab object](https://developer.chrome.com/extensions/tabs#type-Tab)
 * @param {Tab[]} allTabs - all the other tabs (including tabs in different windows)
 */

const updateTab = (tab: Tab, allTabs: Tab[]): void => {
  const { id, index, url, title, windowId } = tab;

  if (!title) return;

  if (
    url === "" || // new tab
    url?.startsWith("chrome://") || // chrome internal page
    url?.startsWith("https://chrome.google.com/webstore") // chrome marketplace
  ) {
    return;
  }

  // get the number of tabs in this tab's window
  const numTabs =
    Math.max(...allTabs.filter((t) => t.windowId === windowId).map((t) => t.index)) + 1;

  // logic for redoing title with numeric prefix
  const PREFIX_REGEX = /^[0-9-]+. /g;

  const num = index + 1;
  let newPrefix = num <= 8 ? `${num}. ` : num >= 9 && num === numTabs ? "9. " : "-. ";
  const hasPrefix = PREFIX_REGEX.exec(title);

  if (hasPrefix?.[0] && hasPrefix[0] === newPrefix) {
    return; // title is already correctly prefixed
  } else if (hasPrefix) {
    // title has incorrect prefix (tab moved)
    newPrefix += title.split(PREFIX_REGEX).pop();
  } else {
    // title has no prefix (new tab)
    newPrefix += title;
  }

  try {
    if (!id) return;

    chrome.scripting.executeScript({
      target: { tabId: id },
      func: (newTitle) => (document.title = newTitle),
      args: [newPrefix],
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Update all the tabs.
 */
const updateAllTabs = () => {
  const cb = (tabs: Tab[]) => tabs.forEach((tab) => updateTab(tab, tabs));
  chrome.tabs.query({}, cb);
};

/* Add listeners for tabs */
tabs.onCreated.addListener(updateAllTabs);
tabs.onUpdated.addListener(updateAllTabs);
tabs.onMoved.addListener(updateAllTabs);
tabs.onDetached.addListener(updateAllTabs);
tabs.onAttached.addListener(updateAllTabs);
tabs.onRemoved.addListener(updateAllTabs);

updateAllTabs(); // update all tabs on initialization.
