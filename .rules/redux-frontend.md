# Frontend & Redux Rules

## 1. State Management (Classic Redux)

- Keep action types in `frontend/src/Redux/types/<domain>.ts`.
- Action creators reside in `frontend/src/Redux/actions/<domain>Action.ts`.
- Pure reducers reside in `frontend/src/Redux/reducers/<domain>Reducer.ts`.
- Do not migrate or introduce Redux Toolkit (RTK) slices unless requested.

## 2. API Communication

- Define all API endpoint declarations in JSON config files inside `frontend/src/Redux/apiServices/APIs/<domain>APIs.json`.
- Execute network requests using the centralized `calAPPI.ts` and `buildURL.ts` utilities over Axios.

## 3. UI Components & Styling

- Reuse existing components from `frontend/src/Components/Custom/` (e.g., `CustomTable`, `CustomModal`, `CustomInput`, `LinearLoadingItem`, `ShimmerLoader`).
- Use Material UI (MUI) combined with CSS Modules (`styles.module.css`).

## 4. Forms & Validation

- Build forms with **Formik**.
- Schema validation must be strictly defined with **Yup**.
- Utilize inputs from `Components/Custom/Form/FormComponent/` (e.g., `FormTextInput`, `FormCurrencyInput`, `FormDateInput`, `FormSelectInput`).

## 5. TypeScript Strictness

- Define data structures in `frontend/src/Types/<domain>.ts` or local `interfaces.ts`.
- Do not create any types/interfaces in .tsx/constants/utils file.
- Avoid using `any`; explicitly type props, payloads, and API response structures.
