const enabledSites = {
    'https?://(www.)?youtube.com/(.*)?': 'input#search'
};

function getCurrentUrl() {
    return window.location.href
}

function getConfig(currentUrl) {
    const matchedUrl = Object.keys(enabledSites).find((siteUrlRegex) => {
        console.log(siteUrlRegex, currentUrl);
        return RegExp(siteUrlRegex).test(currentUrl);
    });
    console.log(matchedUrl);
    return matchedUrl
        ? enabledSites[matchedUrl]
        : null
}

function autoFocusSearchBar(cssSelectorCurrentUrl) {
    console.log(cssSelectorCurrentUrl);
    console.log(document.querySelector(cssSelectorCurrentUrl));
    document.querySelector(cssSelectorCurrentUrl).focus()
}

(() => {
    const url = getCurrentUrl();
    const cssSelectorCurrentUrl = getConfig(url);

    if (!cssSelectorCurrentUrl) {
        // No Config found so no autofocus
        return
    }

    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            autoFocusSearchBar(cssSelectorCurrentUrl)
        }
    };
})();
