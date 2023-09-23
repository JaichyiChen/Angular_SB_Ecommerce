package com.angular.springbootecommerce.config;

import com.angular.springbootecommerce.entity.Country;
import com.angular.springbootecommerce.entity.Product;
import com.angular.springbootecommerce.entity.ProductCategory;
import com.angular.springbootecommerce.entity.State;
import jakarta.persistence.EntityManager;

import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {


   private EntityManager entityManager;

   @Autowired
   public DataRestConfig(EntityManager entityManager){
       this.entityManager = entityManager;
   }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        //disable Http Methods for product PUT, POST, and Delete
        disableHttpMethods(config, unsupportedActions, Product.class);

        //disable Http Methods for product category PUT, POST, and Delete
        disableHttpMethods(config, unsupportedActions, ProductCategory.class);

        //disable HttpMethods for country PUT, POST, and Delete
        disableHttpMethods(config, unsupportedActions, Country.class);

        //disable HttpMethods for State PUT, POST, and Delete
        disableHttpMethods(config, unsupportedActions, State.class);

        //call an internal helper method to expose id
        exposeIds(config);
    }

    private static void disableHttpMethods(RepositoryRestConfiguration config, HttpMethod[] unsupportedActions, Class theClass) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
       //expose entity ids
       // - get a list of all entity classes from the entity manager
//        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
//        //- create an array of the entity types
//        List<Class> entityClasses = new ArrayList<>();
//
//        //-get the entity types for the entities
//        for(EntityType tempEntityTypes: entities){
//            entityClasses.add(tempEntityTypes.getJavaType());
//        }
//        //-expose the entity ids for the array of / entity/domain types
//        Class[] domainTypes = entityClasses.toArray(new Class[0]);
//
//        config.exposeIdsFor(domainTypes);
        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(e -> e.getJavaType()).collect(Collectors.toList()).toArray(new Class[0]));

    }
}
