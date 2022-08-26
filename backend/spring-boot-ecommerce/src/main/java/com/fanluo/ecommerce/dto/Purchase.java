package com.fanluo.ecommerce.dto;

import com.fanluo.ecommerce.entity.Address;
import com.fanluo.ecommerce.entity.Customer;
import com.fanluo.ecommerce.entity.Order;
import com.fanluo.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
