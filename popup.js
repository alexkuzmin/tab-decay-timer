// Load settings when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentUrl = new URL(tab.url).hostname;

  // Load saved settings
  const settings = await chrome.storage.local.get([
    'pageSettings',
    'globalAutoClose',
    'globalCloseTime',
    'showGreen',
    'showYellow',
    'showOrange',
    'showRed'
  ]);

  // Load page-specific settings
  const pageSettings = settings.pageSettings || {};
  const pageSetting = pageSettings[currentUrl] || {};

  document.getElementById('pageCloseTime').value = pageSetting.closeTime || 'default';

  // Load global settings
  document.getElementById('globalCloseTime').value = settings.globalCloseTime || 'never';

  // Load badge display settings
  document.getElementById('showGreen').checked = settings.showGreen !== false;
  document.getElementById('showYellow').checked = settings.showYellow !== false;
  document.getElementById('showOrange').checked = settings.showOrange !== false;
  document.getElementById('showRed').checked = settings.showRed !== false;

  // Save page settings on change
  document.getElementById('pageCloseTime').addEventListener('change', async (e) => {
    const pageSettings = (await chrome.storage.local.get('pageSettings')).pageSettings || {};
    if (!pageSettings[currentUrl]) pageSettings[currentUrl] = {};
    const value = e.target.value;
    pageSettings[currentUrl].closeTime = (value === 'never' || value === 'default') ? value : parseInt(value);
    await chrome.storage.local.set({ pageSettings });
  });

  // Save global settings on change
  document.getElementById('globalCloseTime').addEventListener('change', async (e) => {
    await chrome.storage.local.set({ globalCloseTime: e.target.value === 'never' ? 'never' : parseInt(e.target.value) });
  });

  // Save badge display settings on change
  for (const color of ['Green', 'Yellow', 'Orange', 'Red']) {
    document.getElementById(`show${color}`).addEventListener('change', async (e) => {
      await chrome.storage.local.set({ [`show${color}`]: e.target.checked });
    });
  }
});
