package com.project.todo_and_daily.todo;

import com.project.todo_and_daily.users.User;
import com.project.todo_and_daily.users.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TodoService {
    private TodoRepository todoRepository;
    private UserService userService;

    public List<Todo> findAllByUsername(String username){
        return todoRepository.findAllByUsername(username);
    }

    public Optional<Todo> findTodoById(Long id){
        return todoRepository.findById(id);
    }

    public boolean saveTodo(Todo todo){
        User userFound = userService.findByUsername(todo.getUsername());
        if(userFound == null){
            return false;
        }
        todoRepository.save(todo);
        return true;
    }

    public boolean sendTodo(String username){
        User foundUser = userService.findByUsername(username);
        if(foundUser == null) return false;
        List<Todo> userTodo = findAllByUsername(username);
        userTodo.forEach(todo -> {
            todo.setOutOfDate(todo.getTargetDate().isBefore(LocalDate.now()));
            todoRepository.save(todo);
        });
        return true;
    }

    public boolean updateTodoStatus(Long id, Boolean isDone){
        Optional<Todo> todoFound = todoRepository.findById(id);
        if(todoFound.isPresent()){
            todoFound.get().setIsDone(isDone);
            todoRepository.save(todoFound.get());
            return true;
        }
        return false;
    }

    public boolean deleteTodo(Long id){
        Optional<Todo> todoFound = todoRepository.findById(id);
        if(todoFound.isPresent()){
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
