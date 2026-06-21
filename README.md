# Προσωπική ακαδημαϊκή ιστοσελίδα — Aristotelis Vartholomaios

Στατικός ιστότοπος (Hugo) για GitHub Pages. Δίγλωσσος (Αγγλικά στο `/`,
Ελληνικά στο `/el/`), custom theme, μηδέν trackers/cookies.

- **Stack:** Hugo (extended) **v0.163.3**, hand-built theme. Καθόλου εξωτερικό
  template, καθόλου JS framework.
- **Αισθητική:** Swiss / International Typographic Style — άσπρο/μαύρο με ένα
  κόκκινο accent (`#e0231c`), μία γραμματοσειρά **IBM Plex Sans** (self-hosted,
  Latin + Greek), δυνατή τυπογραφική ιεραρχία, πολύ λευκό.
- **Deploy:** GitHub Actions → GitHub Pages, αυτόματα σε κάθε push στο `main`.

---

## Βασική αρχή συντήρησης

> **Όλο το περιεχόμενο ζει σε αρχεία YAML / Markdown / TOML, χωριστά από τα
> templates.** Για να προσθέσεις paper, εργαλείο ή να αλλάξεις κείμενο,
> επεξεργάζεσαι **ένα** αρχείο περιεχομένου — **δεν αγγίζεις HTML/CSS.**
>
> Μπορείς να τα κάνεις όλα μέσα από το **GitHub web UI** (κουμπί ✏️ «Edit» στο
> αρχείο → «Commit changes»). Το Actions κάνει rebuild + deploy σε ~1–2 λεπτά.

---

## Πού βρίσκεται τι

| Θέλω να αλλάξω… | Αρχείο |
|---|---|
| Δημοσιεύσεις (add/edit paper) | `data/publications.yaml` |
| Ερευνητικά ενδιαφέροντα (4) | `data/threads.yaml` |
| Διδασκαλία | `data/teaching.yaml` |
| Σπουδές | `data/education.yaml` |
| Εμπειρία / θέσεις | `data/experience.yaml` |
| Διακρίσεις | `data/awards.yaml` |
| Λογισμικό / έργα (+ εικόνες) | `data/tools.yaml` |
| Bio αρχικής + punchline (motto) | `content/_index.en.md` & `content/_index.el.md` |
| Φωτογραφία προφίλ | `static/img/portrait.jpg` (+ `portrait-720.jpg`) |
| Εικόνες έργων | `static/img/` + πεδίο `image:` στο `data/tools.yaml` |
| Λογότυπα φορέων | `static/img/uth-en.png`, `uth-el.png`, `dept.png` |
| Όνομα εμφάνισης, links, επικοινωνία, βιβλιομετρικά | `config/_default/params.toml` |
| Ετικέτες/κείμενα UI (κουμπιά, τίτλοι ενοτήτων) | `i18n/en.toml` & `i18n/el.toml` |
| Χρώματα / τυπογραφία / στυλ | `assets/css/main.css` |

**Single page.** Όλο το περιεχόμενο είναι σε ΜΙΑ σελίδα (δεν υπάρχουν
υποσελίδες). Σειρά ενοτήτων: hero → 01 Έρευνα → 02 Δημοσιεύσεις (**πλήρης**
λίστα) → 03 Διδασκαλία → 04 Εμπειρία → 05 Σπουδές → 06 Διακρίσεις →
07 Λογισμικό. Η σειρά ορίζεται στο `layouts/index.html` (αλλάζεις τη σειρά των
partials και το `idx`). Οι ενότητες CV (teaching/experience/education/awards)
έχουν την ίδια δομή πεδίων: `when_en/when_el`, `what_en/what_el`,
`where_en/where_el`, `note_en/note_el` (τα δύο τελευταία προαιρετικά).

**Βιογραφικό (CV).** Δεν υπάρχει ξεχωριστή σελίδα/αρχείο CV: η ίδια η σελίδα
είναι το πλήρες βιογραφικό. Το κουμπί «Λήψη βιογραφικού» τυπώνει ολόκληρη τη
σελίδα σε PDF (υπάρχει ειδικό print stylesheet). Άρα ό,τι προσθέτεις στις
ενότητες/δεδομένα μπαίνει αυτόματα και στο PDF.

---

## Πώς προσθέτω paper

Άνοιξε το [`data/publications.yaml`](data/publications.yaml), αντίγραψε ένα
block και συμπλήρωσέ το:

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

- **Status:** ποτέ μη βάζεις `published` σε εργασία υπό κρίση — βάλε
  `under_review` (εμφανίζεται με κόκκινη ετικέτα «Under review / Υπό κρίση»).
- Αν δεν υπάρχει DOI, βάλε `url: "https://…"` αντί για `doi`.
- Η ομαδοποίηση γίνεται αυτόματα ανά `type`.
- **Ελληνόγλωσση δημοσίευση:** πρόσθεσε `lang: el` και τα πεδία `authors_el`,
  `title_el`, `venue_el` (ελληνικά). Τότε: στην **αγγλική** σελίδα εμφανίζεται η
  αγγλική μετάφραση + «(in Greek)»· στην **ελληνική** το πρωτότυπο. (Τα `title`,
  `authors`, `venue` κρατούν την αγγλική εκδοχή.)

## Πώς προσθέτω / αλλάζω εργαλείο

Στο [`data/tools.yaml`](data/tools.yaml). Κάθε link που αφήνεις κενό (`""`)
απλώς δεν εμφανίζεται:

```yaml
- id: neo-tool
  num: "03"
  title: "Όνομα εργαλείου"        # αγγλικός/ουδέτερος τίτλος
  title_el: ""                    # προαιρετικός ελληνικός τίτλος (αλλιώς πέφτει στο title)
  acronym: ""                     # προαιρετικό short code
  tagline_en: "…"
  tagline_el: "…"
  body_en: "…"
  body_el: "…"
  stats_en: "…"                   # προαιρετική γραμμή αριθμών
  stats_el: "…"
  released: "2026"
  stack: ["Python", "GIS"]
  paper_en: ""                    # προαιρετικό: σχετικό άρθρο (κείμενο)
  paper_el: ""
  license_en: ""
  license_el: ""
  links:                          # κενό "" = δεν εμφανίζεται το link
    repository: "https://github.com/…"
    doi: "https://doi.org/…"
    live: "https://…"
```

## Πώς αλλάζω το bio / τα κείμενα

- Αρχική (bio του hero): το **σώμα κειμένου** στα `content/_index.en.md` και
  `content/_index.el.md`. Το `punch:` στο front matter είναι η σύντομη φράση
  (motto) κάτω από τον τίτλο. Η φωτογραφία είναι το `static/img/portrait.jpg`.
- Δεν υπάρχει χωριστό CV markdown: το βιογραφικό προκύπτει από τις ενότητες/
  δεδομένα της σελίδας (publications, education, experience, teaching, awards)
  και βγαίνει σε PDF με το κουμπί «Λήψη βιογραφικού».

## Πώς προσθέτω εικόνα σε έργο

Ανέβασε την εικόνα στο `static/img/` (π.χ. `usc.jpg`) και βάλε τη διαδρομή στο
πεδίο `image:` του αντίστοιχου έργου στο `data/tools.yaml`, π.χ.
`image: "img/usc.jpg"`. Όσο το πεδίο είναι κενό, εμφανίζεται ένα ουδέτερο
placeholder στη θέση της εικόνας.

## Links, στοιχεία επικοινωνίας, βιβλιομετρικά

Όλα στο [`config/_default/params.toml`](config/_default/params.toml): email,
ORCID, Scholar, GitHub, LinkedIn, ResearchGate, συντεταγμένες, και ο πίνακας
`[bibliometrics]` (citations / h-index — **ανανέωσέ τα πριν από milestones**).
Όταν βγει η επίσημη σελίδα ΠΘ, βάλ' την στο `uthStaffUrl` για να εμφανιστεί.

---

## Τοπική προεπισκόπηση

Χρειάζεται [Hugo **extended** v0.163.3](https://gohugo.io/installation/).

```bash
hugo server            # http://localhost:1313  (live reload)
hugo --gc --minify     # παραγωγή στο ./public
```

Δομή:

```
config/_default/   ρυθμίσεις (hugo, languages, params)
content/           κείμενα (Markdown, _index.en.md / _index.el.md)
data/              δομημένο περιεχόμενο (publications, threads, teaching,
                   education, experience, awards, tools)
i18n/              ετικέτες UI (en, el)
layouts/           templates (theme) — δεν χρειάζεται να τα αγγίξεις
assets/            CSS & JS (γίνονται minify+fingerprint στο build)
static/            fonts, favicon, og.png, img
.github/workflows/ αυτόματο deploy
```

---

## Deploy

Push στο `main` → το GitHub Actions χτίζει και κάνει deploy αυτόματα.

**Πρώτη φορά (one-time):** στο repo → **Settings → Pages → Build and
deployment → Source: GitHub Actions**. Το όνομα του repo πρέπει να είναι
`avarth.github.io` (user site).

Το `baseURL` ακολουθεί αυτόματα τις ρυθμίσεις Pages (μέσω
`steps.pages.outputs.base_url`), άρα το live URL είναι πάντα σωστό.

---

## Σύνδεση δικού domain (αργότερα)

Όταν αποκτηθεί domain (π.χ. `vartholomaios.gr`), η αλλαγή είναι τριών βημάτων:

1. **CNAME:** δημιούργησε αρχείο `static/CNAME` με μοναδικό περιεχόμενο το
   domain, π.χ.:
   ```
   vartholomaios.gr
   ```
2. **baseURL (για τοπικά builds):** στο `config/_default/hugo.toml` άλλαξε τη
   μία γραμμή `baseURL = "https://vartholomaios.gr/"`. (Στο deploy το base_url
   το ρυθμίζει ήδη το Pages από το CNAME — δεν χρειάζεται άλλη αλλαγή.)
3. **DNS:** στον πάροχο του domain πρόσθεσε εγγραφές που δείχνουν στο GitHub
   Pages (apex `A` records στις IP του GitHub + `www` `CNAME` →
   `avarth.github.io`), και στο **Settings → Pages → Custom domain** βάλε το
   domain και ενεργοποίησε **Enforce HTTPS**.

---

## Σημειώσεις

- **Γραμματοσειρές:** IBM Plex Sans (variable, self-hosted woff2 στο
  `static/fonts/`, GDPR-clean — χωρίς Google Fonts CDN). Καλύπτει Latin + Greek
  στην ίδια οικογένεια· τα subsets φορτώνονται με `unicode-range`.
- **OG image / εικονίδια:** `static/img/og.png`, `static/img/apple-touch-icon.png`,
  `static/favicon.svg`, `static/favicon.ico`. Είναι έτοιμα assets· αν θες να τα
  ξαναφτιάξεις, υπάρχει η αισθητική στο `assets/css/main.css` ως αναφορά.
- **SEO:** ανά σελίδα title/description, Open Graph + Twitter cards, JSON-LD
  (Person + ScholarlyArticle), `sitemap.xml`, `robots.txt`, canonical & hreflang.
- **Προσβασιμότητα:** semantic HTML, skip-link, keyboard nav, AA contrast σε
  light & dark, `prefers-reduced-motion`, print stylesheet για το CV.
```
