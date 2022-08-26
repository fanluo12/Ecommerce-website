package com.fanluo.ecommerce.service;

import com.fanluo.ecommerce.dto.Purchase;
import com.fanluo.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
