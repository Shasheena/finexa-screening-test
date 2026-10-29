import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('TodoMVC Demo App Tests', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('1. Add 3 todos and assert the list has 3 items (Bonus: Data-driven from array)', async ({ page }) => {
    const todosToAdd = ['Learn Playwright', 'Build Page Objects', 'Pass Interview'];

    // Data-driven approach using an array
    await todoPage.addMultipleTodos(todosToAdd);

    await expect(todoPage.todoItems).toHaveCount(3);
    await expect(todoPage.todoItems).toHaveText(todosToAdd);
  });

  test('2. Mark one as complete and assert the counter shows "2 items left"', async ({ page }) => {
    await todoPage.addMultipleTodos(['Task One', 'Task Two', 'Task Three']);

    await todoPage.toggleTodoComplete(0);

    await expect(todoPage.todoCount).toHaveText('2 items left');
  });

  test('3. Use Active and Completed filters and assert the correct items show', async ({ page }) => {
    await todoPage.addMultipleTodos(['Active Task', 'Completed Task']);
    await todoPage.toggleTodoComplete(1); // Mark second task completed

    // Check Active filter
    await todoPage.filterActive();
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toHaveText('Active Task');

    // Check Completed filter
    await todoPage.filterCompleted();
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toHaveText('Completed Task');
  });

  test('4. Edit a todo (double-click) and assert the new text', async ({ page }) => {
    await todoPage.addTodo('Original Todo');

    await todoPage.editTodo(0, 'Updated Todo Text');

    await expect(todoPage.todoItems.first()).toHaveText('Updated Todo Text');
  });

  test('5. Delete a todo and assert it is gone', async ({ page }) => {
    await todoPage.addMultipleTodos(['Task to Keep', 'Task to Delete']);

    await todoPage.deleteTodo(1);

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toHaveText('Task to Keep');
  });

  test('6. Use "Clear completed" and assert it removes only the completed items', async ({ page }) => {
    await todoPage.addMultipleTodos(['Task 1', 'Task 2']);
    await todoPage.toggleTodoComplete(0); // Complete Task 1

    await todoPage.clearCompleted();

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toHaveText('Task 2');
  });
});