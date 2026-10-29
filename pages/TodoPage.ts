import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoCount = page.getByTestId('todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');
  }

  async addMultipleTodos(todos: string[]) {
    for (const todo of todos) {
      await this.addTodo(todo);
    }
  }

  async toggleTodoComplete(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async editTodo(index: number, newText: string) {
    const item = this.todoItems.nth(index);
    await item.dblclick();
    const editInput = item.getByRole('textbox', { name: 'Edit' });
    await editInput.clear();
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  async deleteTodo(index: number) {
    const item = this.todoItems.nth(index);
    // Hover to reveal the delete 'X' button if hidden by default
    await item.hover();
    await item.getByRole('button', { name: 'Delete' }).click();
  }

  async filterActive() {
    await this.page.getByRole('link', { name: 'Active' }).click();
  }

  async filterCompleted() {
    await this.page.getByRole('link', { name: 'Completed' }).click();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }
}