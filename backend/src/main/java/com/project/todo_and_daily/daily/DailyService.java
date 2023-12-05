package com.project.todo_and_daily.daily;

import com.project.todo_and_daily.users.User;
import com.project.todo_and_daily.users.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DailyService {
    private DailyRepository dailyRepository;
    private UserService userService;

    public List<Daily> findAllByUsername(String username){
        return dailyRepository.findAllByUsername(username);
    }

    public void refreshDaily(String username){
        List<Daily> userDaily = findAllByUsername(username);
        userDaily.forEach(daily -> {
            if(!Objects.equals(daily.getDailyDate(), LocalDate.now())) {
                daily.setIsDone(Boolean.FALSE);
                daily.setDailyDate(LocalDate.now());
                dailyRepository.save(daily);
            }
        });
    }

    public boolean saveDaily(Daily daily){
        User userFound = userService.findByUsername(daily.getUsername());
        if(userFound == null){
            return false;
        }
        dailyRepository.save(daily);
        return true;
    }

    public boolean deleteDaily(Long id){
        Optional<Daily> dailyFound = dailyRepository.findById(id);
        if(dailyFound.isPresent()){
            dailyRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean updateDailyStatus(Long id, Boolean isDone){
        Optional<Daily> dailyFound = dailyRepository.findById(id);
        if(dailyFound.isPresent()){
            dailyFound.get().setIsDone(isDone);
            dailyRepository.save(dailyFound.get());
            return true;
        }
        return false;
    }

    public boolean sendDaily(String username){
        User userFound = userService.findByUsername(username);
        if(userFound == null){
            return false;
        }
        refreshDaily(username);
        return true;
    }
}
