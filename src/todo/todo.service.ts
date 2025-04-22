import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.inputs';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      description: 'description 1',
      done: false,
      id: 1,
    },
    {
      description: 'description 2',
      done: false,
      id: 2,
    },
    {
      description: 'description 3',
      done: false,
      id: 3,
    },
    {
      description: 'description 4',
      done: true,
      id: 4,
    },
  ];

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;

    if (status !== undefined)
      return this.todos.filter((todos) => todos.done === status);

    return this.todos;
  }

  findOneTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id: ${id} not found`);
    return todo;
  }

  createTodo(createTodoInput: CreateTodoInput) {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.floor(Math.random() * 10);
    todo.done = false;
    this.todos.push(todo);
    return todo;
  }

  updateTodo(updateTodoInput: UpdateTodoInput) {
    const todo = this.todos.find((todo) => todo.id === updateTodoInput.id);

    if (!todo) {
      throw new NotFoundException('Todo Not Found');
    }

    todo.description =
      updateTodoInput.description === undefined
        ? todo.description
        : updateTodoInput.description;

    todo.done =
      updateTodoInput.done === undefined ? todo.done : updateTodoInput.done;

    return todo;
  }

  deleteTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException('Todo not found with id: ' + id);

    const indexToDelete = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(indexToDelete, 1);
    return todo;
  }

  //Aggregations
  totalTodos() {
    return this.todos.length;
  }

  completedTodos() {
    return this.todos.filter((todo) => todo.done === true).length;
  }

  pendingTodos() {
    return this.todos.filter((todo) => todo.done === false).length;
  }
}
