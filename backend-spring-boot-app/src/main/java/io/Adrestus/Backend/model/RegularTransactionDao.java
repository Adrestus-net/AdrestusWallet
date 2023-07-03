package io.Adrestus.Backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RegularTransactionDao extends TransactionDao {

    @JsonCreator
    public RegularTransactionDao(
            @JsonProperty("hash") String hash,
            @JsonProperty("transactionDaoType") TransactionDaoType transactionDaoType,
            @JsonProperty("zoneFrom") int zoneFrom,
            @JsonProperty("zoneTo") int zoneTo,
            @JsonProperty("timestamp") String timestamp,
            @JsonProperty("blockNumber") int blockNumber,
            @JsonProperty("from") String from,
            @JsonProperty("to") String to,
            @JsonProperty("amount") double amount,
            @JsonProperty("amountWithTransactionFee") double amountWithTransactionFee,
            @JsonProperty("nonce") int nonce,
            @JsonProperty("XAxis") String XAxis,
            @JsonProperty("YAxis") String YAxis,
            @JsonProperty("v") byte v,
            @JsonProperty("r") String r,
            @JsonProperty("s") String s,
            @JsonProperty("pub") String pub) {
        super(hash, transactionDaoType, zoneFrom, zoneTo, timestamp, blockNumber, from, to, amount, amountWithTransactionFee, nonce, XAxis, YAxis, v, r, s, pub);
    }


    @Override
    public String toString() {
        return super.toString() + "RegularTransactionDao{}";
    }
}
