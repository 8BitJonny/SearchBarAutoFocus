const { enabledSites } = globalThis;

function getCurrentUrl() {
    return window.location.href
}

function getConfig(currentUrl) {
    const matchedUrl = Object.keys(enabledSites).find((siteUrlRegex) => {
        return RegExp(siteUrlRegex).test(currentUrl);
    });
    return matchedUrl
        ? enabledSites[matchedUrl]
        : null
}

function autoFocusSearchBar(cssSelectorCurrentUrl) {
    document.querySelector(cssSelectorCurrentUrl).focus()
}

(() => {
    const url = getCurrentUrl();
    const cssSelectorCurrentUrl = getConfig(url);

    // No Config found so no autofocus
    if (!cssSelectorCurrentUrl) return;

    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            autoFocusSearchBar(cssSelectorCurrentUrl)
        }
    };
})();
