package com.project.todo_and_daily.daily;

import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DailyController {
    private DailyService dailyService;

    @GetMapping("/{username}/daily")
    public ResponseEntity<List<Daily>> findAllDaily(@PathVariable String username){
        boolean sendDaily = dailyService.sendDaily(username);
        if(sendDaily) return ResponseEntity.ok(dailyService.findAllByUsername(username));
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/daily")
    public ResponseEntity<Null> addDaily(@RequestBody Daily daily){
        boolean isAdded = dailyService.saveDaily(daily);
        if(isAdded) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/daily/{id}")
    public ResponseEntity<Null> deleteDaily(@PathVariable Long id){
        boolean isDeleted = dailyService.deleteDaily(id);
        if(isDeleted) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/daily/{id}")
    public ResponseEntity<Null> updateDailyStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> requestBody){
        boolean isDone = requestBody.get("isDone");
        boolean isFinished = dailyService.updateDailyStatus(id, isDone);
        if(isFinished) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }
}
