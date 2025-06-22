package com.restfulwebservices.todoEntity;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restfulwebservices.user.User;
import com.restfulwebservices.user.UserRepository;

@RestController
@RequestMapping("/api/users")
public class TodoController {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoController(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{username}/todos")
    public List<Todo> getTodosForUser(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                      .orElseThrow(() -> new RuntimeException("User not found"));
        return todoRepository.findByUser(user);
    }

    @PostMapping("/{username}/todos")
    public Todo createTodo(@PathVariable String username, @RequestBody Todo todo) {
        User user = userRepository.findByUsername(username)
                      .orElseThrow(() -> new RuntimeException("User not found"));
        todo.setUser(user);
        return todoRepository.save(todo);
    }

 // ✅ Update existing todo
    @PutMapping("/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable String username,
            @PathVariable Long id,
            @RequestBody Todo updatedTodo) {

        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setDescription(updatedTodo.getDescription());
                    todo.setTargetDate(updatedTodo.getTargetDate());
                    todo.setDone(updatedTodo.isDone());
                    return ResponseEntity.ok(todoRepository.save(todo));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete todo
    @DeleteMapping("/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(
            @PathVariable String username,
            @PathVariable Long id) {

        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

