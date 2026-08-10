## Project Description
This is a task Management with CRUD functionalities.But beyond that is the project where I used new tools like GraphQL,TanStack Query and context I tried to practice as many mutations as I can, and all the decisions I took are documented on Rationale. I am happy with how much I learned until this point. And of course there is always features I would like to implement if the time would be longer.

## Setup / Running Instructions

### Prerequisites
- Node.js 22.20.0
- An API access token 

### Installation
```bash
git clone https://github.com/CAMIANAIS/Task_Management_Code_Challenge
cd Task_Management_Code_Challenge
npm install

```
Create a `.env` file in the project root:
```
VITE_API_TOKEN=your_token_here
```
### Running
```bash 
npm run dev      
# starts the dev server
npm run build   
```
## How it looks
![Dashboard demo](/Screen Recording 2026-08-07 at 9.56.07 PM.mov)

## Rationale

### Tooling: Vite
 I chose Vite because this project only needs a frontend; the backend already exists as a separate GraphQL API, so I didn't need a framework like Next.js that bundles backend/routing concerns.

### Styling

I use tokens for readibility, reusability and if one day i decided to change something either theme dark or light I am sure every element already changed as well on styling.

I am choosing font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, since this is a well-known industry pattern called the "system font stack."

I did not use other libraries since I want to learn pure CSS, with the layout(grid and flexbox).

I had the oportunity of learning of to make it posible those effects of obackdrop div, onclick and the z-index in the modals , and make it able to listen if an user is making a click outside the modal , those behaviour were implicit when i use libraries but I actually know it could be resolved this way or using useRef but I chose the simple tecnique.

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
### Avatar Fallback
Initials or stock photo vs robohash or another resource , since in real projects it is common to see initials by default when user do not set a profile image.For me It looks more real in comparison of fake pictures.

I use TansStack for every network call , but a raw fetch+ useEffect to get the initials for default,no caching! it means there is a re-checks the same broken URL every time this component remounts A useQuery hook here would be more consistent with my existing patterns and caching for free.So this is a work in progress now.
### Stale Time Usage
I did stablish 5 minutes on stale Time for Profile and Users since this data rarely changes. It could change using setttings tab with the edit option which is not implemented yet, but a user hardly ever change information.

That is not the case of Tasks, this infomration is frequently mutated and it force to refetch using invalidateQueries anyway!

### Other rationale
- why useUpdateTask takes a Partial<Omit<Task,'id'>> instead of a fixed set of fields? the reasoning is those different features (estimate, tag, dueDate, status) each only touch one field, so requiring all of them would force callers to always resend the whole task.

- The function ModalEditTaskOptions is edit-only , the function ModalCreateTaskOptions for creating needs a different data flow (draft state + single submit).

- Filtering by status on Grid View would be a disabled option. Columns already show status, filtering by status does not have sense.
-Tests were not mentioned on this guidelines but of course I would dig a little bit on it but considering the timeline I prioritize complete functionality first.



## Technologies / Libraries Used
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript | Static typing |
| Vite | Build tool / dev server |
| TanStack Query | Server state (data fetching, caching) |
| React Router | Client-side routing |
| react-day-picker | Date picker UI (due date selection) |
| ESLint + typescript-eslint | Linting |

## Features Completed
### General Requirements
- [x] Public GitHub repository
- [x] Commit early and often with clear comments (51 commits, conventional-commit format)
- [x] Follow the Figma design system for components/spacing/colors
- [x] Organize code into a clear folder structure
### Phase 1 — Initial Setup
- [x] Folder structure
- [x] Routing (incl. NotFound)
- [x] Styles solution (CSS Modules + design tokens)
- [x] Linting (ESLint)
- [ ] Error boundary

### Phase 2 — Dashboard UI
- [x] Sidebar, header, main content, task card

### Phase 3 — Connect to API
- [x] Get tasks (loading/error/empty states)
- [x] Create task + mutation + error handling

### Phase 4 — Update/Delete
- [x] Update mutation + modal + notification
- [x] Delete mutation + confirm + notification

### Phase 5 — Search & Filter
- [x] Name
- [x] DueDate
- [ ] OwnerId
- [ ] Status *(deferred — see Rationale/Additional Information)*
- [ ] Tags
- [ ] EstimatedPoints

### Phase 6 — Settings/Profile page
- [x] Profile query + user info display

### Bonus
- [x] Task count per column
- [x] Overdue date coloring
- [ ] Drag and drop
- [ ] Functional list/grid distinction
- [ ] Add-task animations
## Additional Information
I did work on an util for overdue coloring part and also the counting tasks.Also
