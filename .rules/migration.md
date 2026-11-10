# Database Migration & Seeder Rules

## 1. Migration File Conventions

- File naming: Timestamped format `YYYYMMDDHHMMSS-<action>-<table-name>.js` (e.g., `20261110180000-add-vendor-to-expenses.js`).
- Migrations reside strictly in `backend/database/migrations/`.
- Always provide fully reversible, atomic `down` methods.
- Create proper helper method if needed in `backend/database/migrations/helpers` directory.

## 2. Schema Standards

- **Primary Keys:** Standard auto-increment integer ID (match target model).
- **Timestamps:** Every table must have `created_at` and `updated_at`.
- **Soft Deletes:** Tables extending soft delete logic must define `is_deleted` with `{ type: Sequelize.BOOLEAN, allowNull: true }` and `deleted_at` with `{ type: Sequelize.DATE, allowNull: true }`.
- **Foreign Keys:**
    - `house_id` must reference the `Houses` table.
    - Set `onUpdate: 'CASCADE'` and `onDelete: 'RESTRICT'` (or `'CASCADE'` where explicitly required).
- **Reusable Helpers:** Check and reuse existing migration utilities from `backend/database/migrations/helpers/houseMigrationHelper.js`.

## 3. Seeders

- Essential baseline data belongs in `backend/database/seeders/seeds-essential/`.
- Mock or testing data belongs in `backend/database/seeders/seeds-demo/`.
- Utilize `backend/src/utilities/database/seederHelper.js` for seeding arrays.
