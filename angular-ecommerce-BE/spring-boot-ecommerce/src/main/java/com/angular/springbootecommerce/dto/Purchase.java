package com.angular.springbootecommerce.dto;

import com.angular.springbootecommerce.entity.Address;
import com.angular.springbootecommerce.entity.Customer;
import com.angular.springbootecommerce.entity.Order;
import com.angular.springbootecommerce.entity.OrderItem;
import lombok.Data;
import java.util.*;

@Data
public class Purchase {


    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;


}
