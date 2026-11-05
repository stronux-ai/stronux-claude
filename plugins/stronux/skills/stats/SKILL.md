---
name: stats
description: Use when the person asks how their academy is doing, who joined, who left or who is inactive ("how is my academy doing this month", "who joined last week", "who left Photography Basics", "cómo va mi academia", "quiénes entraron esta semana", "quiénes se fueron").
---

# Academy stats

Read only: nothing here asks for the yes, and nothing changes in Stronux. Stronux calculates every number; never add up, average or estimate them yourself. Answer in the language the person writes in.

## Tools

- `get_academy_stats`: the numbers for the academy and for each course.
- `list_member_changes`: the names behind a number (`new`, `left`, `inactive`, `not_started`).
- `list_member_joins`: who joined, day by day.

## What to ask

Ask only what you cannot deduce. Two things matter: the **period** (the last 7, 30 or 90 days; use 30 if they do not say, and there is no "this month" or custom date range: say so if they ask for one) and the **course** (omit `course_id` for the whole academy; take the id from `list_offers`).

## What each number means

Say it in these words, so the person reads the same thing every time:

- **Members with access:** people who can open the course today (guests who were invited and never came count).
- **Active:** members who visited in the period.
- **New:** members who got access in the period.
- **Left:** people who **lost access to a course** in the period (a subscription that ended or an access with an end date that arrived) and do not have access today. The day is approximate: it is when Stronux saw the change, so only mention it as the exact day if the person insists.
- **Inactive:** members with access who have not visited in more than 30 days, whatever the period.
- **Per course:** average progress (percent), how many finished (100 percent) and how many have not started. If `progress` is null, the person cannot see progress for that course, or the course has too many members to calculate it (`progress_note` says `too_many_members`): say so and move on.

Show the academy numbers first, then one table with a row per course, and offer the next step ("do you want to see who left or who has not started?").

## Names

Numbers by default. Give names only when the person asks, from `list_member_changes`:

- Up to 20 people per call. Say how many there are in total ("showing 20 of 34") and call again with `next_cursor` only if they ask for more.
- Each person has a name, a course and a date. A person with no name is "no name": never invent one and never guess it from anything else.
- Never show an email, an id, the progress of one person by name, or anything else you were not given. To write to someone or open their profile, point them to Stronux, Members.

## Who joined, by day

`list_member_joins` takes `days` (1 to 90, 7 by default) and an optional course. "Joined" means the first day a person had access to a course in the academy, even if they are gone now. Days are cut in the person's own time zone (the answer says which one).

- Show a table: **Day · How many joined · Who** (name, the course and how they came: offer name, invitation, import or join link).
- Show **every day** of the range, with 0 where nobody joined. The count of every day is always complete.
- If someone has `already_member: true`, mark them "was already in another course": they are new to this course, not to the academy.
- Names come 20 at a time. When there are more, say "showing 20 of 31" and ask if they want the rest; continue with `next_cursor` (the range and course travel inside it).
- If they only want how many per day, do not list names.

## Money

There is no money in these tools: no sales, no revenue, no prices. If the person asks about money, say "I do not have money data: look at Stronux for sales and payments" and do not estimate it from the member counts.
