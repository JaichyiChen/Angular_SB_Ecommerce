package com.angular.springbootecommerce.service;

import com.angular.springbootecommerce.dto.Purchase;
import com.angular.springbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
