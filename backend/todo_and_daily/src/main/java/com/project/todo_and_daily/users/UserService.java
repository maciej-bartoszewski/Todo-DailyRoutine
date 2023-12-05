package com.project.todo_and_daily.users;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public void save(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public boolean login(User user){
        User userLog = findByUsername(user.getUsername());
        if(userLog != null){
            return passwordEncoder.matches(user.getPassword(), userLog.getPassword());
        }
        return false;
    }

    public boolean register(User user){
        User userFound = findByUsername(user.getUsername());
        if(userFound == null){
            save(user);
            return true;
        }
        return false;
    }
}
