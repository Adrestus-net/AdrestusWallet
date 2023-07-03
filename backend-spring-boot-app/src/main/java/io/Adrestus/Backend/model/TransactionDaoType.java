package io.Adrestus.Backend.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TransactionDaoType {
    REGULAR("REGULAR"),
    STAKING("STAKING"),
    DELEGATING("DELEGATING"),
    REWARDS("REWARDS");
    private final String title;

    TransactionDaoType(String title) {
        this.title = title;
    }


    @JsonValue
    public String getTitle() {
        return title;
    }
}
