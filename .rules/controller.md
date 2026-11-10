# Controller Rules

## 1. File Location & Naming

- Place controllers in `backend/src/controllers/<domain>/`.
- Controller methods must use camelCase and action-oriented naming (e.g., `createExpense`, `getExpenseById`, `updateExpense`, `deleteExpense`).

## 2. Thin Controller Principle

- Never execute direct database queries or call Sequelize models (`Model.create()`, `Model.findAll()`) inside controllers.
- Delegate all business logic, transactions, and data interactions to the service layer (`backend/src/services/<domain>/`).

## 3. Controller Responsibilities

Controllers must only handle three steps:

1. Extract and normalize validated input (`req.body`, `req.params`, `req.query`, `req.user`, `req.house`).
2. Invoke the corresponding service method.
3. Return the response using the standard response handler.

## 4. Response Standardization

- Do NOT use raw `res.status().json()`.
- Send successful responses via `backend/src/utilities/apiUtils/apiResponseHandler.js`.
- Use HTTP constants from `backend/src/constants/http.js` (e.g., `HTTP_STATUS.OK`, `HTTP_STATUS.CREATED`).

## 5. Error Delegation

- Wrap every controller function in a `try...catch` block.
- Forward caught errors directly to the global error middleware via `next(error)`. Do not send error responses directly from the controller.

## 6. Template

```javascript
const expenseService = require('../../services/expense');
const { sendApiSuccessResponse } = require('../../utilities/apiUtils/apiResponseHandler');
const { HTTP_STATUS } = require('../../constants/http');

/**
 * @desciption    Create a user
 * @route         POST /api/house/
 * @access        All
 */
const createExpense = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            house_id: req.house.id,
            created_by: req.user.id,
        };

        const result = await expenseService.createExpense(data);

        return sendApiSuccessResponse(
            res,
            HTTP_STATUS.CREATED,
            'Expense created successfully',
            result
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createExpense,
};
```

- Always send success response using the `sendApiSuccessResponse` method of `backend\src\utilities\apiUtils\apiResponseHandler.js` file.
- Use `sendApiErrorResponse` method of same file in case of error response.
