package com.ohyes.soolsool.drink.dao;

import com.ohyes.soolsool.drink.domain.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrinkRepository extends JpaRepository<Drink, Integer> {

}
