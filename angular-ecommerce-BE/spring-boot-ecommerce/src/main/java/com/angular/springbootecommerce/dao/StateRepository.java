package com.angular.springbootecommerce.dao;

import com.angular.springbootecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {
    //SELECT * FROM state WHERE country_id IN (SELECT id FROM country WHERE code = :code)
    List<State> findByCountryCode(@Param("code") String code);

}
