package com.zosh.service;

import com.zosh.model.PlanType;
import com.zosh.model.Subscription;
import com.zosh.model.User;

public interface SubscriptionService {
    Subscription createSubscription(User user);
    Subscription getUsersSubscription(Long userId) throws Exception;
    Subscription upgradeSubscription(Long userId, PlanType planType);
    boolean isValid(Subscription subscription);
}
