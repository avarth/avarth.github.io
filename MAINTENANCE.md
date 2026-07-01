# Οδηγός συντήρησης

Πρακτικός οδηγός για ενημέρωση του ιστότοπου. (Δημόσιο repo, αλλά αυτό το αρχείο
είναι ο εσωτερικός οδηγός συντήρησης.)

## Βασική αρχή

> Όλο το περιεχόμενο ζει σε αρχεία **YAML / Markdown / TOML**, χωριστά από τα
> templates. Για να προσθέσεις paper, εργαλείο ή να αλλάξεις κείμενο,
> επεξεργάζεσαι **ένα** αρχείο περιεχομένου· δεν αγγίζεις HTML/CSS.
>
> Μπορείς να τα κάνεις όλα μέσα από το **GitHub web UI** (κουμπί ✏️ «Edit» στο
> αρχείο → «Commit changes»). Το GitHub Actions κάνει rebuild + deploy σε ~1–2′.

## Πού βρίσκεται τι

| Θέλω να αλλάξω… | Αρχείο |
|---|---|
| Δημοσιεύσεις (add/edit paper) | `data/publications.yaml` |
| Ερευνητικά ενδιαφέροντα | `data/threads.yaml` |
| Διδασκαλία | `data/teaching.yaml` |
| Ομιλίες & διαλέξεις | `data/talks.yaml` |
| Σπουδές | `data/education.yaml` |
| Εμπειρία / θέσεις | `data/experience.yaml` |
| Διακρίσεις | `data/awards.yaml` |
| Θεσμικό έργο / διοικητικοί ρόλοι | `data/service.yaml` |
| Επαγγελματικές ιδιότητες | `data/memberships.yaml` |
| Λογισμικό / έργα (+ εικόνες) | `data/tools.yaml` |
| Bio αρχικής + punchline (motto) | `content/_index.en.md` & `content/_index.el.md` |
| Φωτογραφία προφίλ | `static/img/portrait.jpg` (+ `portrait-720.jpg`) |
| Εικόνες έργων | `static/img/` + πεδίο `image:` στο `data/tools.yaml` |
| Λογότυπα φορέων | `static/img/uth-en.png`, `uth-el.png`, `dept.png` |
| Όνομα εμφάνισης, links, επικοινωνία, βιβλιομετρικά | `config/_default/params.toml` |
| Ετικέτες/κείμενα UI (κουμπιά, τίτλοι ενοτήτων) | `i18n/en.toml` & `i18n/el.toml` |
| Χρώματα / τυπογραφία / στυλ | `assets/css/main.css` |

**Single page.** Όλο το περιεχόμενο είναι σε ΜΙΑ σελίδα (δεν υπάρχουν
υποσελίδες). Η σειρά ενοτήτων ορίζεται στο `layouts/index.html` (αλλάζεις τη
σειρά των partials και το `idx`). Οι ενότητες τύπου CV (teaching / experience /
talks / education / awards / service / memberships) έχουν την ίδια δομή πεδίων: `when_en/when_el`,
`what_en/what_el`, `where_en/where_el`, `note_en/note_el` (τα δύο τελευταία
προαιρετικά).

**Βιογραφικό (CV).** Δεν υπάρχει ξεχωριστή σελίδα/αρχείο CV: η ίδια η σελίδα
είναι το πλήρες βιογραφικό. Το κουμπί «Print / save as PDF» τυπώνει ολόκληρη τη
σελίδα σε PDF (υπάρχει ειδικό print stylesheet). Ό,τι προσθέτεις στις ενότητες
μπαίνει αυτόματα και στο PDF.

## Πώς προσθέτω paper

Άνοιξε το `data/publications.yaml`, αντίγραψε ένα block και συμπλήρωσέ το:

```yaml
- key: J12                       # μοναδικό αναγνωριστικό (δικό σου)
  type: journal                  # journal | greek_journal | conference |
                                 # national | book | under_review | other
  year: 2026
  authors: "Vartholomaios, A. & Surname, B."   # το όνομά σου μπαίνει bold αυτόματα
  title: "Ο τίτλος του άρθρου"
  venue: "Journal name"
  details: "12(3), 45-60"        # τόμος/τεύχος/σελίδες (προαιρετικό)
  doi: "10.xxxx/xxxxx"           # σκέτο DOI, χωρίς https:// (προαιρετικό)
  impact: "IF 3.4"               # προαιρετικό
  cites: "12"                    # προαιρετικό (αριθμός αναφορών)
  status: published              # published | under_review | forthcoming
  featured: true                 # προαιρετικό: εμφάνιση στο "Selected work"
  rank: 7                        #   (όσο μικρότερο, τόσο πιο πάνω)
```

- **Status:** ποτέ μη βάζεις `published` σε εργασία υπό κρίση· βάλε
  `under_review` (εμφανίζεται με κόκκινη ετικέτα «Under review / Υπό κρίση»).
- Αν δεν υπάρχει DOI, βάλε `url: "https://…"` αντί για `doi`.
- Η ομαδοποίηση γίνεται αυτόματα ανά `type`.
- **Ελληνόγλωσση δημοσίευση:** πρόσθεσε `lang: el` και τα πεδία `authors_el`,
  `title_el`, `venue_el` (ελληνικά). Τότε στην **αγγλική** σελίδα εμφανίζεται η
  αγγλική μετάφραση + «(in Greek)»· στην **ελληνική** το πρωτότυπο. (Τα `title`,
  `authors`, `venue` κρατούν την αγγλική εκδοχή.)

## Πώς προσθέτω / αλλάζω εργαλείο

Στο `data/tools.yaml`. Κάθε link που αφήνεις κενό (`""`) δεν εμφανίζεται:

```yaml
- id: neo-tool
  num: "07"
  image: "img/neo.jpg"            # κενό = ουδέτερο placeholder
  title: "Όνομα εργαλείου"        # αγγλικός/ουδέτερος τίτλος
  title_el: ""                    # προαιρετικός ελληνικός τίτλος
  acronym: ""
  tagline_en: "…"
  tagline_el: "…"
  body_en: "…"
  body_el: "…"
  stats_en: "…"                   # προαιρετική γραμμή αριθμών
  stats_el: "…"
  released: "2026"
  stack: ["Python", "GIS"]
  paper_en: ""
  paper_el: ""
  license_en: ""
  license_el: ""
  links:
    repository: "https://github.com/…"
    doi: "https://doi.org/…"
    live: "https://…"
```

## Πώς αλλάζω το bio / τα κείμενα

- Αρχική (bio του hero): το **σώμα κειμένου** στα `content/_index.en.md` και
  `content/_index.el.md`. Το `punch:` στο front matter είναι η σύντομη φράση
  (motto) κάτω από τη φωτογραφία.
- Φωτογραφία: `static/img/portrait.jpg`.

## Πώς προσθέτω εικόνα σε έργο

Ανέβασε την εικόνα στο `static/img/` (π.χ. `usc.jpg`) και βάλε τη διαδρομή στο
πεδίο `image:` του αντίστοιχου έργου στο `data/tools.yaml`
(`image: "img/usc.jpg"`). Όσο το πεδίο είναι κενό, εμφανίζεται placeholder.

## Links / επικοινωνία / βιβλιομετρικά

Όλα στο `config/_default/params.toml`: email, ORCID, Scholar, GitHub, LinkedIn,
ResearchGate, συντεταγμένες, και ο πίνακας `[bibliometrics]`
(citations / h-index): ανανέωσέ τα πριν από milestones. Όταν βγει η επίσημη
σελίδα ΠΘ, βάλ' την στο `uthStaffUrl` για να εμφανιστεί στο footer.

## Deploy

Push στο `main` → το GitHub Actions χτίζει και κάνει deploy αυτόματα.

**Ρύθμιση μία φορά:** repo → **Settings → Pages → Build and deployment → Source:
GitHub Actions**. Το repo πρέπει να λέγεται `avarth.github.io` (user site). Το
`baseURL` ακολουθεί αυτόματα τις ρυθμίσεις Pages, άρα το live URL είναι πάντα
σωστό.

## Σύνδεση δικού domain (αργότερα)

Όταν αποκτηθεί domain (π.χ. `vartholomaios.gr`):

1. **CNAME:** δημιούργησε αρχείο `static/CNAME` με μοναδικό περιεχόμενο το domain
   (`vartholomaios.gr`).
2. **baseURL (για τοπικά builds):** στο `config/_default/hugo.toml` άλλαξε τη μία
   γραμμή `baseURL = "https://vartholomaios.gr/"`. (Στο deploy το base_url το
   ρυθμίζει ήδη το Pages από το CNAME.)
3. **DNS:** apex `A` records στις IP του GitHub Pages + `www` `CNAME` →
   `avarth.github.io`, και στο **Settings → Pages → Custom domain** βάλε το
   domain και ενεργοποίησε **Enforce HTTPS**.

## Σημειώσεις

- **Γραμματοσειρές:** IBM Plex Sans (variable woff2 στο `static/fonts/`,
  GDPR-clean, χωρίς Google Fonts CDN). Καλύπτει Latin + Greek στην ίδια
  οικογένεια· τα subsets φορτώνονται με `unicode-range`.
- **Assets:** `static/img/og.png` (κάρτα κοινοποίησης), `apple-touch-icon.png`,
  `static/favicon.svg`, `static/favicon.ico`.
- **SEO:** ανά σελίδα title/description, Open Graph + Twitter cards, JSON-LD
  (Person + WebSite + ScholarlyArticle), `sitemap.xml` με hreflang, `robots.txt`,
  canonical.
- **Προσβασιμότητα:** semantic HTML, skip-link, keyboard nav, AA contrast σε
  light & dark, `prefers-reduced-motion`, print stylesheet.
