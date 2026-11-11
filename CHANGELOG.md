# Change log

This update builds on the existing single-page Serein Sands site.

- `index.html:54` adds an About link that scrolls to the resort story at `index.html:110`; the story copy describes the palms, sea breeze, and morning catch.
- `index.html:55` links to the Amenities section at `index.html:219`, which presents the existing Stay, Dine, Wellness, and Adventure tabs under a clearer amenities heading.
- `index.html:395` adds six gallery filters; all fourteen gallery photographs have category data. `js/script.js:151` filters the masonry and updates its live count; `js/script.js:179` keeps lightbox navigation within the visible collection.
- `index.html:539` adds an enquiry completion bar and quick room choices. `js/script.js:280` updates progress, choice states, validation, and the simulated submit flow.
- `index.html:660` adds a closing footer message and booking link; the footer quick links also include About and Amenities.
- `css/style.css:114` adds the About story treatment; `css/style.css:219`, `css/style.css:284`, and `css/style.css:349` style the gallery filters, enquiry progress, and footer sign-off with responsive and reduced-motion behavior.

## Checks

- `node --check js/script.js` passes.
- All internal anchor targets resolve; no duplicate IDs or missing local assets were found.
- The gallery has fourteen categorized images and six filters.