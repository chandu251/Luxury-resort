# Serein Sands

A responsive, single-page website concept for Serein Sands, a fictional beachfront resort on Patnem Beach in South Goa. The visual direction pairs a full-bleed coastal video with an editorial layout, warm natural photography, and specific copy about slow mornings, Goan food, and the shoreline.

## Run the project

There is no build step and no package installation required. Keep this folder as the repository root: `index.html` sits at its top level, so a root URL serves the page directly. For GitHub Pages, publish from the repository root.

Open `index.html` directly, or start a local server from this folder if Python is installed:

~~~powershell
python -m http.server 8000
~~~

Then open http://localhost:8000 in your browser.

## Tech stack

- HTML5 for the semantic page structure and accessible form labels.
- CSS3 for the visual design, custom responsive layouts, motion, focus states, and reduced-motion support.
- Bootstrap 5.3 via CDN for the responsive grid, mobile navbar collapse, carousel, and modal lightbox. The custom CSS provides the page’s visual style.
- Vanilla JavaScript (ES6+) for navigation behavior, video fallbacks and controls, animated counters, experience tabs, gallery navigation, date handoff, form feedback, parallax, and the current year.
- Google Fonts: Cormorant Garamond for headings and Jost for body copy.
- SVG for the favicon and resort mark, plus inline social marks and interface icons.
- Local JPEG photography, a local MP4/WebM hero video, and a Google Maps iframe.

There are no JavaScript packages, frameworks, or build tools.

## What’s included

- Slim contact and offer bar, plus a sticky navigation that changes appearance when scrolling.
- Full-viewport hero with muted autoplay video with a poster fallback, calls to action, and a booking bar.
- Resort introduction with overlapping photography, a three-photo strip, and animated figures.
- Photo carousel with three local stills and touch, keyboard, dot, and arrow controls.
- Rooms and suites feature, tabbed stay/dining/wellness/adventure activities, dining feature, and arched spa image.
- Parallax call-to-action, category-filtered fourteen-image gallery, and a keyboard- and touch-operable lightbox.
- Guest review carousel, enquiry form with room quick-picks and completion progress, contact details and map, offer/newsletter strip, and footer.
- Floating WhatsApp contact link, back-to-top button, and an animated footer sign-off.
- Responsive rules for desktop, tablet, and mobile, with reduced-motion handling.

## Project structure

~~~text
resort-landing/
|-- index.html
|-- css/style.css
|-- js/script.js
|-- README.md
|-- CHANGELOG.md
|-- DATAFLOW.md
`-- assets/
    |-- favicon/favicon.svg
    |-- images/ (local resort photography and photo credits)
    `-- videos/
        |-- hero.mp4
        |-- hero.webm
        `-- hero-poster.jpg
~~~

See [DATAFLOW.md](DATAFLOW.md) for the page's asset, interaction, and form flow.

## Forms and sample content

The enquiry form validates fields, shows inline errors, displays a loading state, and then shows a simulated success message. The newsletter form also provides a simulated response. Neither form sends or stores data; connect them to a reservation system and mailing service before collecting enquiries.

Serein Sands, its contact details, address, room descriptions, offers, guest comments, ratings, and resort statistics are fictional sample content. The map is centered on Patnem Beach, not a verified property address. Replace these details before using the concept publicly. Update the WhatsApp number and the .example email address before launch.

## Customization

- Brand colors are defined as CSS custom properties near the top of css/style.css: --ink, --sea, --sand, --paper, and --gold.
- Update the resort name, location, copy, contact details, offers, and form room options in index.html.
- Edit responsive layouts, typography, controls, and animation in css/style.css.
- Edit the page interactions and simulated form responses in js/script.js.
- Replace photos in assets/images/ and keep their alt text, width, and height attributes accurate.
- Replace assets/videos/hero-poster.jpg with a still image that matches the video crop.
- Replace assets/videos/hero.mp4 and assets/videos/hero.webm with matching short loops. The supplied local encodes are about 11 seconds long; keeping replacement files under 8 MB each helps the hero load quickly. The WebM source is offered first and MP4 is the fallback.

## Photo and video credits

The local photographs are from Unsplash and Pexels. Photographer names and source links are included where available; for Unsplash CDN downloads without photographer metadata, the original image IDs and source URLs are listed.

| Local file(s) | Credit and source |
| --- | --- |
| assets/images/south-goa-beach.jpg, assets/videos/hero-poster.jpg | Arun Prakash, [Unsplash photo](https://unsplash.com/pt-br/fotografias/uma-pessoa-sentada-em-uma-cadeira-sob-um-guarda-sol-weeJiR-xXC0) |
| assets/images/kayak-on-coast.jpg | Boris Misevic, [Unsplash photo](https://unsplash.com/photos/person-kayaking-on-a-vast-blue-ocean-pcZNKcqUB7I) |
| assets/images/coastal-cooking.jpg | Keerthika Moorthy, [Pexels photo: “Close up of Food in Bowls”](https://www.pexels.com/photo/close-up-of-food-in-bowls-12081454/) |
| assets/images/shoreline-dawn.jpg | Unsplash contributor; [source image](https://images.unsplash.com/photo-1500375592092-40eb2168fd21) |
| assets/images/garden-pool.jpg | Unsplash contributor; [source image](https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7) |
| assets/images/coastal-suite.jpg | Unsplash contributor; [source image](https://images.unsplash.com/photo-1611892440504-42a792e24d32) |
| assets/images/resort-villa.jpg | Unsplash contributor; [source image](https://images.unsplash.com/photo-1571896349842-33c89424de2d) |
| assets/images/terrace-dinner.jpg | Unsplash contributor; [source image](https://images.unsplash.com/photo-1414235077428-338989a2e8c0) |
| assets/images/spa-treatment-room.jpg | Unsplash contributor; [source image](https://images.unsplash.com/photo-1540555700478-4be289fbecef) |
| assets/images/yoga-at-sunrise.jpg | Unsplash contributor; [source image](https://images.unsplash.com/photo-1506126613408-eca07ce68773) |
| assets/images/palms-after-rain.jpg | Unsplash contributor; [source image](https://images.unsplash.com/photo-1448375240586-882707db888b) |
| assets/images/sunset-on-sand.jpg | Unsplash contributor; [source image](https://images.unsplash.com/photo-1519046904884-53103b34b206) |
| assets/videos/hero.mp4, assets/videos/hero.webm | Mikhail Nilov, [Pexels video: “Drone Footage of Beach Waves”](https://www.pexels.com/video/drone-footage-of-beach-waves-8303087/) |

## Before launch

Replace the fictional property details, confirm media credits and permissions for the intended use, use a verified address and map location, and connect both forms to real services.

## Added local photographs

Twelve additional Pexels photographs are included locally. The image credit ledger in `assets/images/README.md` also lists their filenames and source links.

| File | Photographer and source |
| --- | --- |
| goa-palm-cove.jpg | Alexey Turenkov, [Pexels photo 14581330](https://www.pexels.com/photo/palm-trees-at-the-beach-14581330/) |
| goa-patnem-sunset.jpg | Anushri Sharma, [Pexels photo 34326146](https://www.pexels.com/photo/scenic-coastal-view-with-palm-trees-in-goa-34326146/) |
| tropical-shoreline-morning.jpg | Priscila Almeida, [Pexels photo 31377612](https://www.pexels.com/photo/tropical-beach-with-coconut-palms-and-ocean-waves-31377612/) |
| resort-bedroom-palm-view.jpg | Luis Zambrano, [Pexels photo 16436912](https://www.pexels.com/photo/neatly-made-bed-and-a-hanging-lamp-in-a-hotel-room-16436912/) |
| resort-suite-veranda.jpg | Luis Zambrano, [Pexels photo 16436925](https://www.pexels.com/photo/neatly-made-bed-and-a-hanging-lamp-in-a-hotel-room-with-the-view-of-tropical-vegetation-out-the-window-16436925/) |
| goan-fish-curry.jpg | Anya Dunes, [Pexels photo 36477073](https://www.pexels.com/photo/delicious-traditional-fish-curry-with-rice-36477073/) |
| fish-curry-rice.jpg | Saveurs Secretes, [Pexels photo 10050659](https://www.pexels.com/photo/fish-with-rice-10050659/) |
| spa-hot-stone-ritual.jpg | Ekaterina Mitkina, [Pexels photo 10976271](https://www.pexels.com/photo/woman-lying-on-a-massage-table-10976271/) |
| tropical-resort-aerial.jpg | Mikhail Nilov, [Pexels photo 8356092](https://www.pexels.com/photo/a-beautiful-resort-near-the-beach-8356092/) |
| poolside-palms.jpg | Esmirna, [Pexels photo 38893070](https://www.pexels.com/photo/tropical-resort-poolside-relaxation-38893070/) |
| goa-palms-sunset.jpg | Jorryn Morais, [Pexels photo 9292983](https://www.pexels.com/photo/palm-trees-under-a-sunset-sky-9292983/) |
| turquoise-wave-shore.jpg | Jonathan Borba, [Pexels photo 5833661](https://www.pexels.com/photo/tropical-sea-with-sandy-shore-in-sunlight-5833661/) |

## Resort moments carousel

The resort moments carousel contains three local photo slides. It starts with a coastal resort aerial, followed by a pool scene and a Goa sunset. The hero video remains in the hero section only. The photo carousel supports keyboard, touch, dots, and arrow buttons.
