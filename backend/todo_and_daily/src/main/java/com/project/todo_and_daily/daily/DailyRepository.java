package com.project.todo_and_daily.daily;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyRepository extends JpaRepository<Daily, Long> {
    List<Daily> findAllByUsername(String username);
}
