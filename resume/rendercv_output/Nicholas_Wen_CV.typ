// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Nicholas Wen",
  title: "Nicholas Wen - CV",
  footer: context { [#emph[Nicholas Wen -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in June 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "a4",
  page-top-margin: 0.25in,
  page-bottom-margin: 0.25in,
  page-left-margin: 0.25in,
  page-right-margin: 0.25in,
  page-show-footer: false,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 0, 0),
  colors-headline: rgb(0, 0, 0),
  colors-connections: rgb(0, 0, 0),
  colors-section-titles: rgb(0, 0, 0),
  colors-links: rgb(0, 0, 0),
  colors-footer: rgb(0, 0, 0),
  colors-top-note: rgb(0, 0, 0),
  typography-line-spacing: 0.35em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Arial",
  typography-font-family-name: "Arial",
  typography-font-family-headline: "Arial",
  typography-font-family-connections: "Arial",
  typography-font-family-section-titles: "Arial",
  typography-font-size-body: 9pt,
  typography-font-size-name: 1.25em,
  typography-font-size-headline: 9pt,
  typography-font-size-connections: 9pt,
  typography-font-size-section-titles: 0.95em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: true,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.4cm,
  section-titles-space-below: 0.1cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.3em,
  sections-space-between-regular-entries: 1.2em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: false,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0cm,
  entries-highlights-bullet:  "-" ,
  entries-highlights-nested-bullet:  "-" ,
  entries-highlights-space-left: 0.15cm,
  entries-highlights-space-above: 0cm,
  entries-highlights-space-between-items: 0cm,
  entries-highlights-space-between-bullet-and-text: 0.5em,
  date: datetime(
    year: 2026,
    month: 6,
    day: 2,
  ),
)


= Nicholas Wen

#connections(
  [#connection-with-icon("location-dot")[Singapore]],
  [#link("mailto:wg.nick.exe@gmail.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[wg.nick.exe\@gmail.com]]],
  [#link("https://bladeacer.gitlab.io/portfolio/", icon: false, if-underline: false, if-color: false)[#connection-with-icon("link")[bladeacer.gitlab.io\/portfolio]]],
  [#link("https://wa.me/+6585029888", icon: false, if-underline: false, if-color: false)[#connection-with-icon("whatsapp")[+6585029888]]],
  [#link("https://linkedin.com/in/nicholas-wen-a525832b2", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[nicholas-wen-a525832b2]]],
)


== Summary

I am an aspiring software developer, who is deeply interested in software and how it work under the hood.

My interests include web, mobile development, systems design, artificial intelligence as well as operating systems and compilers.

== Education

#education-entry(
  [
    #strong[Nanyang Polytechnic]

    #emph[Diploma] #emph[in] #emph[Information Technology]

  ],
  [
    #emph[Singapore]

    #emph[Apr 2023 – Apr 2026]

  ],
  main-column-second-row: [
  ],
)

#education-entry(
  [
    #strong[Holy Innocents' High School]

    #emph[in] #emph[GCE 'O' Levels]

  ],
  [
    #emph[Singapore]

    #emph[Jan 2018 – Dec 2022]

  ],
  main-column-second-row: [
  ],
)

== Skills

#strong[Languages:] Python, Go, Rust, C, Ada\/SPARK, C, Kotlin, C\#, JavaScript (TypeScript, Node, React)

#strong[Machine Learning:] PyTorch, TensorFlow, LangChain, HuggingFace, ONNX

#strong[Infrastructure:] Docker, Docker Compose, MySQL, MS SQL, SQLite, Redis, KeyDB

#strong[Others:] Git, Bash, PowerShell, HTML, CSS, SASS, Tailwind, Bootstrap

== Experience

#regular-entry(
  [
    #strong[EUC Systems Intern]

    #emph[Fujitsu]

  ],
  [
    #emph[Singapore]

    #emph[Mar 2025 – May 2025]

  ],
  main-column-second-row: [
    - Assisted end users with #emph[troubleshooting software issues], wrote Python scripts to #strong[automate email notifications].

    - Imaging, setting up and wiping data for #strong[80+ Windows 11 laptops]. Tagged and accounted for over #strong[120+ assets].

  ],
)

== Relevant Coursework

#regular-entry(
  [
    #strong[#link("https://github.com/bladeacer/automo-web-app")[Automo]]

    #summary[#strong[SARIMA time-series dashboard] with Docker Compose in #emph[decoupled services architecture].]

  ],
  [
    #emph[Nanyang Polytechnic]

    #emph[Jan 2026 – Feb 2026]

  ],
  main-column-second-row: [
    - KeyDB for #strong[in-memory caching], Goatcounter for #emph[observability] and Gemini #strong[generated Executive Summary].

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/chweekueh1/nyp-fyp-project")[NYP-FYP CNC Chatbot]]

    - Reduced startup time from 30 seconds to #strong[under 10 seconds.]

  ],
  [
    #emph[Nanyang Polytechnic]

    #emph[June 2025 – Aug 2025]

  ],
  main-column-second-row: [
    - Added #strong[quality of life features] such as search, rate limits, audio preprocessing, #strong[containerisation with Docker.]

  ],
)

== Projects

#regular-entry(
  [
    #strong[#link("https://codeberg.org/bladeacer/yams")[yams]]

  ],
  [
    #emph[Apr 2026 – Present]

  ],
  main-column-second-row: [
    #summary[Media Screensaver Terminal User Interface (TUI) written with C and ncurses.]

    - Event-driven architecture via #strong[D-Bus\/MPRIS] with FFmpeg\/Chafa API handling and a #strong[200ms debounce] for snappy user experience.

    - Engineered resilient asset pipeline with #strong[local image caching] and exponential backoff retry for robust remote asset handling.

    - Statically-linked #strong[\~1.5 MB binary] with #strong[zero-leak memory profile] (Valgrind-verified) and negligible idle CPU overhead (#strong[\<2\%]).

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/bladeacer/pdf-fmt")[pdf-fmt]]

  ],
  [
    #emph[Oct 2025 – Present]

  ],
  main-column-second-row: [
    #summary[Lightweight, self-contained utility that extracts #strong[images, structured Markdown tables and text] from PDF documents.]

    - Comprehensive configuration suite with #strong[regex exclusions, output formatting and image deduplication].

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/bladeacer/flexcyon")[flexcyon]]

  ],
  [
    #emph[Sept 2024 – Present]

  ],
  main-column-second-row: [
    #summary[Obsidian.md theme with terminal inspired aesthetics, over #strong[3000 downloads] and #strong[300+ customisation options.]]

    - Use of #emph[SCSS for codebase modularity], with SemVer and linting. #link("https://flexcyon.github.io/docs-en/")[#strong[Documentation]] in both #emph[English and Chinese.]

  ],
)

== Co-corriculars

#regular-entry(
  [
    #strong[NDP 2024 Motivators]

  ],
  [
    #emph[May 2024 – Aug 2024]

  ],
  main-column-second-row: [
    #summary[Participated in Singapore's National Day Parade.]

  ],
)

#regular-entry(
  [
    #strong[Hwa Chong Mindsports Championships]

  ],
  [
    #emph[Apr 2024]

  ],
  main-column-second-row: [
    #summary[Participated in the international chess competition representing my Polytechnic.]

  ],
)

#regular-entry(
  [
    #strong[Project Mid-Autumn Festival]

  ],
  [
    #emph[July 2023 – Sept 2023]

  ],
  main-column-second-row: [
    #summary[Involved as #strong[Student Organiser], planning logistics and activities during the event at the elderly home.]

  ],
)

#regular-entry(
  [
    #strong[HIHS Chinese Weiqi Club]

  ],
  [
    #emph[Feb 2021 – Feb 2022]

  ],
  main-column-second-row: [
    #summary[Involved as #strong[Executive Committee] Member, with roles in Publicity, Mentorship and organising the inaugural Weiqi Immersion Fortnight.]

  ],
)

== Awards and Honors

#regular-entry(
  [
    #strong[#link("https://www.moe.gov.sg/financial-matters/awards-scholarships/edusave-awards")[#strong[MOE Edusave Award for Achievement, Good Leadership and Service (EAGLES)]]]

  ],
  [
    #emph[2021]

  ],
  main-column-second-row: [
    #summary[Ministry of Education (MOE)]

  ],
)

== Certifications

#regular-entry(
  [
    #strong[#link("https://www.linkedin.com/in/nicholas-wen-a525832b2/details/certifications/")[#strong[Certificate of Participation for Beyond Borders with DDAS | Hong Kong Edition]]]

  ],
  [
    #emph[2025]

  ],
  main-column-second-row: [
    #summary[Digital Defence Alliance Singapore (DDAS)]

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.coursera.org/account/accomplishments/specialization/P4LZ66LC9V51")[#strong[Google Data Analytics]]]

  ],
  [
    #emph[2025]

  ],
  main-column-second-row: [
    #summary[Coursera]

  ],
)

#regular-entry(
  [
    #strong[#link("https://www.coursera.org/account/accomplishments/professional-cert/M6JUHS3803KJ")[#strong[Google IT Automation with Python]]]

  ],
  [
    #emph[2024]

  ],
  main-column-second-row: [
    #summary[Coursera]

  ],
)
