---
name: course
description: Use when the person asks to set up, build or edit a course in Stronux from a folder or files ("set up a course with this folder", "arma un curso con esta carpeta", "add a lesson to my course", "sube los videos del curso").
---

# Course

Follow the `setup-offers` skill first (folder reading, plan, rules). Then:

1. `create_course` with the name and description, or `update_course` if `list_offers` shows it exists. If the name is taken (`slug_taken`) ask for another.
2. `add_section` for each subfolder, in order (`reorder_sections` with every section id if the order is wrong).
3. `add_lesson` for each file, in order: `body_html` for text, `youtube_url` for a YouTube link, `after_lesson_id` to insert in the middle. Lessons are born hidden. Fix text with `update_lesson_text`; order with `reorder_lessons`.
4. For each video file: `create_lesson_video_upload`, then `curl -X PUT --upload-file "<file>" "<upload_url>"`, then `get_lesson_video_status` until `ready` or `errored`. One at a time. Never replace a video (`lesson_has_video`). `set_lesson_video_link` puts a YouTube link only on a lesson that has no video.
5. For each PDF: `prepare_material_upload` (title, filename, content_type, byte_size), `curl -X PUT -H "Content-Type: <content_type>" --upload-file "<file>" "<upload_url>"`, then `attach_material` with the `resource_id` (with `lesson_id` for a lesson, without for the course; PDF only for lessons).
6. Cover: `set_course_cover` (see images in `setup-offers`). A section cover, if the person gives one, uses `set_section_cover` with the `section_id` from `get_course_structure`.
7. `set_price` (`one_time` in cents, so USD 49 is 4900, or `free`). Selling needs a plan that includes it (`plan_feature_locked`: explain it).
8. Summary, in draft.

**Publish** only with the person's yes naming the course and `publish_enabled` true: `show_lessons` with the lessons you built (unless they choose others), then `publish_offer`. One yes covers both. Lessons reported as demoted have no text or ready video: tell the person.

Plan limit errors (`plan_limit_reached`, `EXTRA_COURSE_REQUIRED`): explain; the person accepts extras in Stronux.
