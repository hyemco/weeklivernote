package com.ohyes.soolsool.drink.dao;

import com.ohyes.soolsool.drink.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Byte> {

    Category findByCategoryName(String categoryName);
}
