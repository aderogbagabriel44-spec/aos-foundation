AOS FOUNDATION — GITHUB PAGES WEBSITE
=========================================

This is a complete, self-contained static website for Ayotunde Olabode Serah Foundation (AOS Foundation).

TECHNOLOGY
- Plain HTML
- CSS
- JavaScript
- No Node.js
- No npm
- No build process
- No backend required at this stage

IMPORTANT BEFORE PUBLIC LAUNCH
This package deliberately uses placeholders where official AOS Foundation information has not been supplied. Replace those placeholders with verified information before publishing. Do not present placeholder figures, stories, contact details, partner information or images as real.

QUICK GITHUB PAGES DEPLOYMENT
1. Extract this ZIP.
2. Create one GitHub repository, for example: AOS-Foundation.
3. Upload the COMPLETE contents of this folder into the repository's main branch.
   IMPORTANT: upload index.html, about.html, css/, js/, images/, etc. directly into the repository root.
4. On GitHub, open the repository.
5. Go to Settings -> Pages.
6. Under Build and deployment, choose "Deploy from a branch".
7. Select the main branch and the root (/) folder.
8. Save.
9. Wait for GitHub Pages to publish the site.
10. Open the Pages URL shown by GitHub.

EDITING THE WEBSITE
Most editable information is in:
js/content.js

1. CHANGE TEXT
Open js/content.js and edit the relevant text inside window.AOS_CONTENT.
Examples:
- site
- home
- about
- programs
- impact
- team
- gallery
- stories
- involvement
- contact
- partners

2. CHANGE THE LOGO
Current placeholder:
images/logo/aos-foundation-logo.svg

Replace that file with the real official logo while keeping the same filename and SVG format, OR change site.logo in js/content.js to the path of the new logo.

3. CHANGE THE HERO IMAGE
Edit:
site.heroImage

Example:
heroImage: "images/hero/hero-1.jpg"

Put the image in images/hero/.

4. ADD A TEAM MEMBER
Open js/content.js.
Find:
team: [
  { ... }
]

Copy an existing object, add a comma, and edit:
- name
- role
- bio
- image

Example:
{
  name: "Full Name",
  role: "Role",
  bio: "Short approved biography.",
  image: "images/team/member-2.jpg"
}

Then place the photo in images/team/.
The Team page automatically renders additional team members.

5. ADD A GALLERY IMAGE
Open js/content.js.
Find:
gallery: [
  { ... }
]

Copy an existing gallery object and edit:
- image
- title
- category
- description

Place the image in images/gallery/.
The gallery automatically supports additional items, filters and lightbox viewing.

6. ADD A PROGRAMME
Open js/content.js.
Find:
programs: [
  { ... }
]

Copy an existing programme object and edit:
- title
- description
- image
- status

Place the programme image in images/programs/.

7. UPDATE CONTACT DETAILS
Open js/content.js and edit:
contact:
- location
- email
- phone
- whatsapp
- facebook
- instagram
- linkedin
- address

Do not publish placeholders as live contact information.

8. UPDATE IMPACT FIGURES
Open:
impact.metrics

Only add verified AOS Foundation figures. Do not use estimates or invented numbers.

9. ADD STORIES
Open:
stories

Only publish accurate, approved stories and obtain appropriate consent for personal/identifying information.

10. PARTNERS
Only add confirmed partners. Do not add a logo or organisation name unless the relationship has been officially confirmed.

IMAGE GUIDELINES
- Use authentic AOS Foundation photographs for programme documentation whenever available.
- Do not present random stock or AI-generated images as real beneficiaries or real programme activities.
- Keep filenames simple.
- Recommended folders:
  images/logo/
  images/hero/
  images/programs/
  images/team/
  images/gallery/
  images/partners/

CONTACT FORM
The contact form is intentionally frontend-only. It does NOT send emails yet.
Before launch, connect it to a service such as Formspree, Netlify Forms, Google Forms or a custom backend, and update the form implementation accordingly.

LOGO NOTE
The current logo file is a temporary placeholder based on the supplied description. It is not intended to replace the official logo. Replace it with the official AOS Foundation logo when available.

CUSTOM DOMAIN
After GitHub Pages is working, a custom domain can be connected through GitHub Pages settings. Add DNS records at the domain provider as instructed by GitHub.

MAINTENANCE
The website is intentionally simple: edit content.js and replace images in the images folders. Do not delete required HTML, CSS or JS files unless you understand the references.

QUALITY / SAFETY
No achievements, beneficiaries, statistics, partners, donations, contact numbers, testimonials or programme outcomes have been fabricated in this package.
