package com.project.todo_and_daily.users;

import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private UserService userService;

    @GetMapping("/user/{username}")
    public ResponseEntity<Null> isUsernameFree(@PathVariable String username){
        User userFound = userService.findByUsername(username);
        if(userFound == null) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Null> login(@RequestBody User user){
        boolean login = userService.login(user);
        if(login) return ResponseEntity.ok().build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/register")
    public ResponseEntity<Null> register(@RequestBody User user){
        boolean registrationSuccess = userService.register(user);
        if(registrationSuccess) return ResponseEntity.ok().build();
        return ResponseEntity.unprocessableEntity().build();
    }
}
