package com.project.todo_and_daily.todo;

import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
    private TodoService todoService;

    @GetMapping("/{username}/todo")
    public ResponseEntity<List<Todo>> findAllTodos(@PathVariable String username){
        if(todoService.sendTodo(username)) {
            return ResponseEntity.ok(todoService.findAllByUsername(username));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/todo")
    public ResponseEntity<Null> addTodo(@RequestBody Todo todo){
        if(todoService.saveTodo(todo)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/todo/{id}")
    public ResponseEntity<Null> deleteTodo(@PathVariable Long id){
        boolean isDeleted = todoService.deleteTodo(id);
        if(isDeleted) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/todo/{id}")
    public ResponseEntity<Null> updateTodoStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> requestBody){
        boolean isDone = requestBody.get("isDone");
        boolean isUpdated = todoService.updateTodoStatus(id, isDone);
        if(isUpdated) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/todo/{id}")
    public ResponseEntity<Todo> findTodo(@PathVariable Long id){
        Optional<Todo> todo = todoService.findTodoById(id);
        if(todo.isPresent()) return ResponseEntity.ok(todo.get());
        return ResponseEntity.notFound().build();
    }
}
