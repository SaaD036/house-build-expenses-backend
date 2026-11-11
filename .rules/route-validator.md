## 1. File Location & Naming

- Place validator chains in `backend/src/routes/<domain>/<domain>Validators/`.
- Name files based on domain actions (e.g., `createExpenseValidator.js`, `updateExpenseValidator.js`).

## 2. Route Pipeline Integration

- Place the `validatorHandler.js` at the end of validator chain.
- If validation fails, `backend/src/routes/validatorHandler.js` intercepts execution and returns a structured `400 Bad Request` response.

## 3. Source Specification & Sanitization

- Explicitly declare the input source: `body()`, `param()`, or `query()`.
- Always sanitize string fields with `.trim()`.
- Enforce type checking and sanitization for numbers: `.isInt().toInt()`, `.isFloat().toFloat()`.
- Validate date fields with `.isISO8601().toDate()`.
- Mark optional fields with `.optional({ nullable: true })`.

## 4. Error Messages

- Every validation rule must provide a clear, descriptive `.withMessage()`.

## 5. Template

```javascript
const { check } = require('express-validator');
const validtorHandler = require('{.....}/validatorHandler.js');

const createExpenseValidator = [
    check('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 255 })
        .withMessage('Title cannot exceed 255 characters'),

    check('amount')
        .notEmpty()
        .withMessage('Amount is required')
        .isFloat({ gt: 0 })
        .withMessage('Amount must be a positive number')
        .toFloat(),

    check('expense_date')
        .notEmpty()
        .withMessage('Expense date is required')
        .isISO8601()
        .withMessage('Valid date format (YYYY-MM-DD) is required')
        .toDate(),

    check('do_id')
        .optional({ nullable: true })
        .isInt({ gt: 0 })
        .withMessage('DO ID must be a positive integer')
        .toInt(),

    validtorHandler,
];

const getExpenseByIdValidator = [
    param('id').isInt({ gt: 0 }).withMessage('Expense ID must be a positive integer').toInt(),
];

module.exports = {
    createExpenseValidator,
    getExpenseByIdValidator,
};
```
