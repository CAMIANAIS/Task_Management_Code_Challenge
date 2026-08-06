## Project Description
(what is this app, who's it for, what does it do — 2-4 sentences)

## Setup / Running Instructions
(clone, install, env vars needed, dev server command, build command)

## Screenshots / GIFs
(placeholder for now — fill in once the dashboard actually renders)

## Rationale

### Tooling: Vite
 I chose Vite because this project only needs a frontend; the backend already exists as a separate GraphQL API, so I didn't need a framework like Next.js that bundles backend/routing concerns.

### Styling

I use tokens for readibility, reusability and if one day i decided to change something either theme dark or light I am sure every element already changed as well on styling.

I am choosing font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, since this is a well-known industry pattern called the "system font stack."

### State management: TanStack Query + Context

In and example Server state and client state could be when I am using the bank's app and I do a consume on a drive thru so as my app was already open what I am looking at is the server state which by the way is stale.

In thid app when the modal is open I am using is modalopen to control what the client is seeing when i select for example estimated.


Tanstack is build for the bank side , server-state cache.
Context is for UI what I am looking in the app, it shares state avoiding prop drilling


### Language: TypeScript

Every component needs to have a type so I a ensured all of data goes accordingly.For example what it happened in const poinEstimate vs  type PointEstimate what happened is can use both in the same project and I call type to ensure its the way I am expected with all those parameters and I use const when I want to change the way the data is coming from backend verifying it comes in the way I expect and making keys for every union.

### Component architecture

For example on component ModalEditDelete owns the click, delegates the actual behavior up via onEdit/onDelete/onClose props, no state . This is a real rule I can reuse: this owns the interaction, not the effect of the interaction.I extracted this component since after I built it inside another component it showed me it could be reusable on its own.

### Routing

App.tsx maps a URL path to the page every component mounts, distinct job from Layout which is making the app responsive to different devices , and Dashboard (content) "which columns show" decision lives here.

### React-day-picker
Building a fully custom calendar grid by hand correct day-of-week math, month lengths, leap years, keyboard nav, a11y is valid work and that's mostly about calendar arithmetic, not about the React/GraphQL fundamentals, which I think this challenge is actually testing on.
### Other rationale
- why useUpdateTask takes a Partial<Omit<Task,'id'>> instead of a fixed set of fields? the reasoning is those different features (estimate, tag, dueDate, status) each only touch one field, so requiring all of them would force callers to always resend the whole task.

- function ModalInfoOptions is edit-only , for creating it needs a different data flow (draft state + single submit).

## Technologies / Libraries Used
(the actual list, once dependencies are finalized)

## Additional Information
(anything else worth mentioning — assumptions you made on ambiguous brief items,
 known gaps, bonus features attempted, etc.)
