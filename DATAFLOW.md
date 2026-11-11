# Serein Sands data flow

This diagram shows how the static page, local assets, browser events, and page interactions fit together. The site has no application server or database; booking and newsletter forms provide client-side feedback only.

```mermaid
flowchart LR
    visitor[Visitor]

    subgraph project[Project files]
        html["index.html<br/>Page structure and content"]
        css["css/style.css<br/>Layout and responsive styles"]
        js["js/script.js<br/>Interaction handlers"]
        images["assets/images/<br/>Local photography"]
        videos["assets/videos/<br/>MP4, WebM, poster"]
        favicon["assets/favicon/<br/>SVG favicon"]
    end

    subgraph browser[Browser]
        page[Rendered resort page]
        events[Clicks, input, scroll, pointer]
        view[Updated page state]
    end

    subgraph services[External resources and destinations]
        cdn[Bootstrap CDN]
        fonts[Google Fonts]
        map[Google Maps embed]
        contact[Phone, email, WhatsApp apps]
    end

    html -->|markup| page
    css -->|styles| page
    js -->|initializes on DOM ready| page
    images -->|image sources| page
    videos -->|hero video and poster| page
    favicon -->|browser tab icon| page
    cdn -->|grid, nav, carousel, modal| page
    fonts -->|Cormorant Garamond and Jost| page
    map -->|map iframe| page

    visitor -->|browse and interact| events
    page --> events
    events --> js
    js -->|menu, tabs, carousel, gallery, lightbox| view
    js -->|reveal, counters, scroll effects| view
    js -->|desktop orbit cursor| view
    js -->|play muted video or reveal poster fallback| view
    view --> page

    events -->|check-in, check-out, guest count| booking[Booking bar]
    booking -->|validate, copy dates and guests, scroll to form| enquiry[Enquiry form]
    enquiry -->|validate and show simulated status| view
    events -->|email address| newsletter[Newsletter form]
    newsletter -->|validate and show simulated status| view
    enquiry -. no network submission .-> localOnly[No backend or data storage]
    newsletter -. no network submission .-> localOnly

    events -->|tap contact link| contact
```
