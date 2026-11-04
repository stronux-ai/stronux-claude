---
name: space-link
description: Use when the person wants a free offer that lives on another website to appear as a card on their Stronux academy page ("add this link to my academy", "agrega este link a mi espacio").
---

# Space link

Follow the `setup-offers` skill first (folder reading, plan, rules). Then:

- Only for a **free** offer on another website. An external link with a price does not exist in Stronux: say so and create nothing.
- A card has a title, an https URL and an optional image. It has no description or date: tell the person those do not fit.
- A link is visible the moment it is created (no draft). Show title, URL and image and ask for the yes first, then call `create_space_link` with `person_confirmed: true`. Image: see images in `setup-offers`.
- Claude only creates links. Editing or removing them (at most 24) is done in Stronux.
