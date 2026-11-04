---
name: guide
description: Use when the person asks to create or edit a guide (a downloadable PDF offer) in Stronux ("make a guide with this PDF", "hazme una guía con este PDF", "sube mi ebook").
---

# Guide

Follow the `setup-offers` skill first (folder reading, plan, rules). Then:

1. `create_guide` with the name and description (the file and price come next). Edit texts later with `update_offer`.
2. `prepare_guide_upload` with filename, content_type (for example `application/pdf`) and byte_size (up to 50 MB), then `curl -X PUT -H "Content-Type: <content_type>" --upload-file "<file>" "<upload_url>"`. A guide that already has a file answers `guide_has_file`: never replace it, tell the person it is changed in Stronux. If the upload fails, do not retry: the guide already counts as having a file; tell the person to upload it from Stronux.
3. Cover with `set_offer_cover` (see images in `setup-offers`).
4. `set_price`.
5. Summary, in draft.

**Publish** only with the person's yes naming the guide and `publish_enabled` true: `publish_offer`. Never publish a guide whose upload failed or has no file.

Plan limit errors (`plan_limit_reached`, `overage_required`): explain; the extra is accepted in Stronux.
