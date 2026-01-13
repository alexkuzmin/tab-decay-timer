// Decay thresholds (in milliseconds)
const THRESHOLDS = {
  FRESH: 5 * 60 * 1000,      // 5 minutes - green
  WARM: 30 * 60 * 1000,      // 30 minutes - yellow
  STALE: 60 * 60 * 1000,     // 1 hour - orange
  DECAYED: 2 * 60 * 60 * 1000 // 2 hours - red
};

// Badge colors for each decay level
const COLORS = {
  FRESH: '#22c55e',    // green
  WARM: '#eab308',     // yellow
  STALE: '#f97316',    // orange
  DECAYED: '#ef4444'   // red
};

// Store when each tab became inactive
const inactiveSince = new Map();

function getDecayLevel(age) {
  if (age < THRESHOLDS.FRESH) return 'FRESH';
  if (age < THRESHOLDS.WARM) return 'WARM';
  if (age < THRESHOLDS.STALE) return 'STALE';
  return 'DECAYED';
}

function formatAge(age) {
  const seconds = Math.floor(age / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${seconds}s`;
}

// When user switches tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const activatedTabId = activeInfo.tabId;
  const now = Date.now();

  // If this tab was inactive, show badge with how long it was inactive
  if (inactiveSince.has(activatedTabId)) {
    const inactiveTime = inactiveSince.get(activatedTabId);
    const age = now - inactiveTime;

    const level = getDecayLevel(age);
    const color = COLORS[level];
    const text = formatAge(age);

    // Show badge
    await chrome.action.setBadgeBackgroundColor({ color, tabId: activatedTabId });
    await chrome.action.setBadgeText({ text, tabId: activatedTabId });

    // Hide badge after 10 seconds
    setTimeout(async () => {
      await chrome.action.setBadgeText({ text: '', tabId: activatedTabId });
    }, 10000);

    // Remove from inactive map since it's now active
    inactiveSince.delete(activatedTabId);
  }

  // Mark all OTHER tabs as inactive starting now
  const allTabs = await chrome.tabs.query({});
  for (const tab of allTabs) {
    if (tab.id !== activatedTabId && !inactiveSince.has(tab.id)) {
      inactiveSince.set(tab.id, now);
    }
  }
});

// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  inactiveSince.delete(tabId);
});
