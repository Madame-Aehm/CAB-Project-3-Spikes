# Spike 11 notes

## MPA, SPA & PWA

So far, both our projects have been **MPA** (**Multi-Page Applications**). This means our websites have been built with multiple `.html` files that link together. Each time you visit a new page, a request must be sent to the hosting server which will send back the corresponding document. Two other trends for browser websites are **SPA** (**Single-Page Applications**), and **PWA** (**Progressive Web Application**). 

A PWA mimics a native app on a smartphone, opening from the Home screen by tapping an icon, and can be downloaded from app stores. Except that a PWA runs in a browser, meaning there is no installation necessary to use it. 

An SPA is a single `.html` file that dynamically changes based on user interaction. Usually developed with JavaScript, once the `.html` and the JavaScript bundle have been downloaded, no other request to the server are necessary to navigate the app. The page content is re-rendered using DOM manipulation to look like a new page, but underneath is really still the same document. 