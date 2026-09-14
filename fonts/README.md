# Fonts

Self-hosted so the site carries no third-party font dependency. Latin subset
only, taken from the Google Fonts CDN.

| File | Family | Weights | Licence |
| --- | --- | --- | --- |
| `instrument-serif.woff2` | Instrument Serif | 400 | [OFL 1.1](OFL-Instrument-Serif.txt) |
| `instrument-serif-italic.woff2` | Instrument Serif *italic* | 400 | [OFL 1.1](OFL-Instrument-Serif.txt) |
| `ibm-plex-sans-var.woff2` | IBM Plex Sans (variable) | 400–500 | [OFL 1.1](OFL-IBM-Plex.txt) |
| `ibm-plex-mono-400.woff2` | IBM Plex Mono | 400 | [OFL 1.1](OFL-IBM-Plex.txt) |
| `ibm-plex-mono-500.woff2` | IBM Plex Mono | 500 | [OFL 1.1](OFL-IBM-Plex.txt) |

Both families are licensed under the SIL Open Font License 1.1, which permits
redistribution; the licence texts sit beside the files as required.

The `@font-face` rules are at the top of `style.css`. The `unicode-range` on
each is Google's `latin` subset, which covers the Latin-1 block, the general
punctuation range, and the currency and arrow characters the site uses.
