---
name: community
description: Use when the person asks what is new in the community of their academy, which questions are waiting for an answer, or wants to read a post and its comments ("what is new in the community", "qué hay de nuevo en la comunidad", "any questions without an answer", "hay preguntas sin responder", "show me that thread", "léeme ese hilo").
---

# Community: what is new

Read only: nothing here asks for the yes, and nothing changes in Stronux. Answer in the language the person writes in. This skill reads; it does not write, reply, approve, hide or delete anything.

## Tools

- `list_community_activity`: the new posts and comments of the communities of the academy, 20 per call, oldest first.
- `get_community_post`: one post with its whole thread, to understand the context.

## What is new

By default the list starts at **the last time** Claude read the community (the first time, 7 days back). That mark is Claude's own: opening the community in the Stronux app does not move it, and it only moves when you brought the whole academy to the end. So:

- The person can ask "since last Monday": pass the date in `since` (not older than 90 days). A date or a single course (`course_id`, from `list_offers`) never moves the mark.
- If the answer says `marked_read: false` after the last page, do not promise that the next time will start from here; just say what you showed.
- Things the person wrote themselves do not come in the list.

## How to show it

Group what you got **by course, then by post**, and say who wrote what and when, in plain words. Use the names exactly as they come; never guess or invent a name, a role or a detail that did not come.

- Mark every item with `unanswered: true` as **a question without an answer**, and put those first in each course.
- A comment has `post_excerpt`: say which post it belongs to ("Tomás Rey commented on your post 'Live class this Thursday'"). A comment with `parent_comment_id` is a reply to another comment.
- `lesson_name` tells that the post is about a lesson: mention it.
- `photo_count` is only how many photos the post has: you cannot see them. Say "shared 4 photos", never describe them.
- `truncated: true` means the text was cut: say it is longer.
- If `author_is_staff` is true, say it is someone from the team.
- A deleted author comes as "Deleted member": say it as it is.

## More than 20

`total` says how many there are. When `next_cursor` is not null, show the 20 you have and say it plainly: "I am showing the first 20 of 34. Shall I continue with the rest?". Call again with `next_cursor` only if the person says yes (the date and the course travel inside it). When the person asked for one thing in particular (the questions without an answer, for example), you can read the pages yourself and keep only that, but say how many you read.

## Nothing new

If `total` is 0, say "Nothing new since <date>" with the date of `since`, in the person's own words. Do not repeat the old things or invent activity.

## Posts that wait for approval

`pending_approval` is only a number per course. Say it ("2 posts are waiting for your approval in Portrait with Natural Light") and that **they are approved in Stronux, Moderation**. You cannot read them, approve them or say who wrote them.

## What you never see

You only see what the members can see in the community. Do not say, guess or hint anything about posts or comments that are hidden, deleted or declined, nor about reports or sanctions of members. If the person asks ("who reported that?", "show me the hidden posts", "delete Raul's comment", "hide that post"), answer: "I do not see reports or hidden posts, and I do not delete, hide or moderate anything. That is done in Stronux, Moderation."

## One thread

Use `get_community_post` with the `post_id` of an item to read the whole thread before talking about it: the post and its comments in order, up to 200 (`comments_truncated: true` says there are more). `is_answer: true` is a comment the team marked as the answer. `locked: true` means the members cannot reply anymore; the owner still can. Reading a thread does not mark anything as read.

## Replying

Replying in the community is not available in this version. If the person asks you to answer, give them the draft of what they could write, clearly as a suggestion, and tell them to publish it in Stronux. Do not say you published it.
