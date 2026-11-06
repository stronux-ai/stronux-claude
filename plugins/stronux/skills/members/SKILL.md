---
name: members
description: Use when the person asks to invite or enroll people in a course ("enroll these 3 people in Portrait", "invita a estas personas a mi curso", "dale acceso a ana@example.com", "add these members to Photography Basics").
---

# Invite members

This sends real emails and uses plan seats, so it only happens after the person says yes to the exact list. Answer in the language the person writes in.

## Tools

- `preview_member_invites`: shows what would happen for each person. Writes nothing and sends nothing.
- `invite_members`: invites the approved list. Needs Publish on in Settings, Claude (if the answer says Publish is turned off, tell the person to invite from Stronux, Members, or to turn Publish on; do not try again).

## The flow, always in this order

1. **Get the list.** Emails (and names if they have them) and the courses. Take the course ids from `list_offers`; if a course name is ambiguous, ask which one. Never guess an email or a course.
2. **Preview first.** Call `preview_member_invites` with the people and `course_ids`. Never call `invite_members` without a preview of that same list.
3. **Show the whole table**, one row per person: email, course, what happens and which email they get.
   - `will_get_access` + "set_password": new person, gets an email to create their password.
   - `will_get_access` + `access_added`: already has an account, gets an email saying they have access to a new course.
   - `will_get_access` + `unknown`: Stronux could not tell which email; they can still be invited.
   - `already_has_access`: they already have it. Nothing happens and they get no email.
   - `cannot_invite` with a `reason`: `invalid_email` (ask for the right one), `staff_user` (they work in this academy: invite staff from Stronux), `duplicate` (the same email twice).
   - `missing_course_ids`: they have some of the courses; only the missing ones are added.
   - `plan`: if there is a limit, say it ("500 seats, 132 used, 134 after this").
4. **Ask for the yes** to that list. Only after they say yes to it, call `invite_members` with the same people and courses and `person_confirmed: true`. If the list changes in any way, preview again and ask again.
5. **Report what happened**, from the answer and not from the preview: `invited`, `already_has_access`, `failed` (with `error`) and `not_attempted`.

## Rules

- **20 people at a time.** For more, preview, confirm and invite 20 at a time, and say so ("I will do it in 2 rounds of 20").
- **Someone who already has access gets nothing.** Say it in the table; never invite them again to "resend".
- **One person failing does not stop the list.** Report each failure in its own words: `staff_user`, `email_linked_to_other_account`, `invalid_email`, `invite_failed`.
- **A full plan** (`plan_limit_reached`, with `limit` and `upgrade_url`) stops the list there. The next people come back as `not_attempted`: say who was not invited and that the plan needs an upgrade in Stronux.
- **Never remove access, set an end date, import a file or resend an invitation.** Those are done in Stronux, Members. If the person asks, say so.
- **Only emails the person gave you.** Never add a name, an id or anything else about a person that you were not given.
