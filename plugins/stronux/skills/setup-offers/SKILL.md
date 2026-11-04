---
name: setup-offers
description: Use first whenever the person wants to set up, build or review offers in Stronux from a folder or files ("read this folder and tell me how it would look in Stronux", "lee la carpeta y dime cómo quedaría", "set up my academy", "sube mi contenido a Stronux"). Common rules, folder reading, plan and final summary for courses, guides, services, bundles and space links.
---

# Set up Stronux offers (common rules)

Reply in the language the person writes in. This skill is shared by `course`, `guide`, `service`, `bundle` and `space-link`: follow it first, then the skill for the offer. Stronux decides prices, limits and publishing rules; you only order the calls and ask what cannot be deduced.

## 1. Before anything

1. Call `whoami`. If `space` is null, say why (no academy, or several: the person picks one when connecting) and stop. Keep `connection.publish_enabled`.
2. If the Stronux tools are missing or ask for authentication, tell the person to open `/mcp` and authenticate `stronux`. Do not look for another way in.

## 2. Read the folder without creating anything

| In the folder | In Stronux |
|---|---|
| Folder with `curso.md`/`course.md` or lesson subfolders | A course |
| Numbered subfolder | A section, in number order |
| Numbered `.md`/`.txt` | A text lesson (convert to HTML for `body_html`) |
| `.mp4`, `.mov`, `.m4v` | A lesson with an uploaded video |
| `.url.txt`, or `.md` with only a YouTube link | A lesson with a video link (YouTube only) |
| `.pdf` inside a section | Material of the lesson with the same number, or the previous one; if unclear, ask |
| `.pdf` at the course root | Course material |
| Image named `portada`/`cover` | The cover; if there are several, ask which |
| `.md` with name, description, price | Offer texts and price |
| Folder with a `.pdf` and a guide `.md` | A guide |
| `.md` for a service (length, type) | A service |
| `.md` for a bundle naming courses | A bundle |
| `.md` with an external link | A space link if free; if it has a price, say Stronux has no such offer |

Then call `list_offers` to see what exists. Complete or edit an existing offer; never create a duplicate without asking. For an existing course also call `get_course_structure` and compare.

## 3. Propose the plan, then ask once

Show a short plan (offer, sections, lessons, what gets uploaded, price). Ask everything that cannot be deduced in a single round. Create nothing until the person says yes to the plan.

## 4. Rules (they repeat what the server enforces)

- Never delete, hide, take offline or remove anything. If asked, say Stronux does not let Claude delete and the person can do it in Stronux. Do not look for a workaround.
- Everything is created as a draft. Publish only after the person says yes **in this conversation** to that offer by name, and only if `publish_enabled` is true; send `person_confirmed: true` only then. Changing the price of a published offer counts as publishing. If Publish is off, say it is turned on in Settings → Claude or the offer is published from Stronux.
- Put a video only in lessons that have none; add a guide file only to a guide that has none. If the tool says it already has one, tell the person it is changed in Stronux.
- Upload files with `curl -X PUT` to the `upload_url` the tool returns, one at a time. Never paste file bytes or signed URLs in the chat.
- Never accept a paid plan limit or overage. Explain the error: it is accepted in Stronux.
- You do not generate images, covers, videos or lesson text with AI. If something is missing, ask for the file. You may make a simple image with code (for example a plain-colour cover with the title) only if the person asks for it.
- When a tool returns an error, tell the person its `message` in plain words. Do not try another way to do the same thing.
- Videos: YouTube links only. No calendars, no Stripe: those are connected in Stronux.

## 5. Images

Today covers go as `image_base64` (JPEG, PNG or WebP, up to 1.5 MB; resize first if larger) in `set_course_cover` and `set_offer_cover`. Stronux is moving image uploads to signed URLs (`prepare_image_upload`, then `curl -X PUT`, then pass the returned `upload_id`). If the tool list shows `prepare_image_upload`, use that flow for every image and never base64.

## 6. While working and at the end

Report progress ("uploading 3 videos, 1 ready"). At the end summarise what is in Stronux (offer, sections, lessons, files, price, draft state) and what could not be done and why. To publish, ask for the yes naming the offer.
