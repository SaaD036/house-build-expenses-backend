# Service Layer & Business Logic Rules

## 1. Architectural Separation

- Controllers must remain thin. Heavy querying, validation calculation, data transformations, and workflows belong in `backend/src/services/`.
- Reusable or complex Sequelize filter clauses belong in `backend/src/queryHelper/`.

## 2. Transactions

- Wrap operations that touch multiple tables or models (e.g., updating an `House` and writing an entry to `HouseEditHistory`) in a managed Sequelize transaction:
    ```javascript
    await sequelize.transaction(async (t) => { ... });
    ```
