# Frontend Layout, Navigation & Design System Rules

## 1. Core Theme & Visual Identity

- **Primary Brand Color:** `#158901` (Used for active states, primary buttons, table headers, borders, and brand logo).
- **Canvas Background:** `#F8F9FA` / light neutral gray background (`#FFFFFF` for elevated cards, papers, and table rows).
- **Typography & Borders:** Clean sans-serif typography with rounded containers (`border-radius: 12px` to `16px` for page headers and summary cards; `8px` for tables and buttons) and subtle box shadows.

## 2. Two-Tier Navigation Hierarchy (Parent -> Child)

The application uses a strict **Parent (Left Sidebar) -> Child (Top Horizontal Tabs)** layout architecture:

### A. Left Sidebar (Parent Navigation)

- **Top Brand Header:** Displays the green house icon + `HBE` brand mark.
- **Footer Badge:** Displays `"A SaaD's product"` inside a green-outlined pill badge at the bottom-left.
- **Active Sidebar Item:** Highlighted with `#158901` text and icon color, separated by subtle horizontal dividers.
- **Context-Aware Sidebar Menus:**
    1. **Global / Home Context (`/`, `/houses`, `/account`):**
        - `Home` (Parent for house list/creation views)
        - `Account` (Parent for user profile/account settings)
    2. **Specific House Context (`/houses/:houseId/...`):**
        - `House` (Returns to or displays specific house overview/details)
        - `Transaction` (Parent for expenses and financial records)
        - `DO` (Delivery Orders / Materials tracking)
        - `Albums` (Photo galleries / construction progress images)

### B. Top Header Bar (Child Navigation & Profile)

- **Child Tabs (Left/Center):** Horizontal uppercase tabs representing sub-views of the currently active Left Sidebar parent:
    - Under `Home`: `YOUR HOUSES` | `SHARED HOUSES` | `CREATE HOUSES`
    - Under `Transaction`: `SEE EXPENSES` | `CREATE EXPENSES`
    - _(Follow this exact uppercase tab pattern for any new sub-views under `House`, `DO`, `Albums`, or `Account`)._
- **Active Top Tab Style:** `#158901` text color with a solid `2px` bottom border in `#158901`. Inactive tabs use muted gray text (`#666666`).
- **User Profile Menu (Top-Right):** Circular green-outlined avatar displaying user initials (e.g., `SIJ`) with a small dropdown chevron badge.

## 3. Main Content Area Structure

Every page inside the main content canvas must follow this vertical flow:

1. **Page Header Banner (Card):**
    - Full-width white elevated `Paper`/`Box` (`border-radius: 12px`, subtle shadow) containing the page title on the left (e.g., `Your Houses`, `Expenses`) in bold dark text (`22px–24px`).
    - Optional right-aligned view switchers inside the banner (e.g., segmented pill toggle for `Table View` / `Card View` where active state is filled `#158901` with white text).

2. **Optional KPI / Summary Cards (Above Data Tables):**
    - White rounded cards (`border-radius: 12px`, subtle shadow) placed between the Page Header Banner and the data table (e.g., `Total Expense` with a thin green underline divider and large bold metric value like `330000 BDT`).

3. **Table Action Bar (Top-Right of Table):**
    - Right-aligned utility icons directly above the table (e.g., green refresh icon button `#158901`).

4. **Data Table Standard:**
    - **Container:** Rounded outer border (`1px solid #158901`, `border-radius: 8px`, overflow hidden).
    - **Header Row:** Solid `#158901` background with crisp white centered/aligned text and white sort arrows (`↑↓`) on sortable columns.
    - **Body Rows:** White background with horizontal dividers (`#E0E0E0` / light green tint), centered cell values, truncated long text (`...`), and `#158901` action icons (e.g., open external icon or three-dot vertical action menu `⋮`).
    - **Pagination (Below Table):** Centered controls with a green-outlined rows-per-page `Select` dropdown (`10`), previous/next square buttons, and active page box outlined in `#158901`.

## 4. Implementation Rules for Cline

- **Never duplicate navigation shells:** When building a new feature or sub-page, plug it into the existing Parent Sidebar + Child Top Tab layout rather than creating standalone headers or sidebars.
- **Keep forms aligned with the layout:** Creation/Edit forms (such as `CREATE HOUSES` or `CREATE EXPENSES`) should render inside the same Page Header Banner + clean white card container structure using the project's custom Formik components (`FormRichTextEditor`, etc.).
- **Maintain strict color consistency:** Always use `#158901` instead of MUI's default `#1976d2` blue for primary actions, active tabs, focus rings, and table headers.
