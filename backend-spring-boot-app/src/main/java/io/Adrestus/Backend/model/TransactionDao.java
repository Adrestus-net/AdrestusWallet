package io.Adrestus.Backend.model;

import com.fasterxml.jackson.annotation.*;
import io.Adrestus.Backend.payload.request.RegularTransactionDao;

import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({@JsonSubTypes.Type(value = RegularTransactionDao.class, name = "RegularTransactionDao")})
public abstract class TransactionDao {

    private String hash;
    private TransactionDaoType transactionDaoType;
    private int zoneFrom;
    private int zoneTo;
    private String timestamp;
    private String from;
    private String to;
    private double amount;
    private double amountWithTransactionFee;
    private int nonce;

    private String XAxis;
    private String YAxis;
    private byte v;
    private String r;
    private String s;
    private String pub;

    @JsonCreator
    public TransactionDao(@JsonProperty("hash") String hash,
                          @JsonProperty("transactionDaoType") TransactionDaoType transactionDaoType,
                          @JsonProperty("zoneFrom") int zoneFrom,
                          @JsonProperty("zoneTo") int zoneTo,
                          @JsonProperty("timestamp") String timestamp,
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
        this.hash = hash;
        this.transactionDaoType = transactionDaoType;
        this.zoneFrom = zoneFrom;
        this.zoneTo = zoneTo;
        this.timestamp = timestamp;
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.amountWithTransactionFee = amountWithTransactionFee;
        this.nonce = nonce;
        this.XAxis = XAxis;
        this.YAxis = YAxis;
        this.v = v;
        this.r = r;
        this.s = s;
        this.pub = pub;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public TransactionDaoType getTransactionDaoType() {
        return transactionDaoType;
    }

    public void setTransactionDaoType(TransactionDaoType transactionDaoType) {
        this.transactionDaoType = transactionDaoType;
    }

    public int getZoneFrom() {
        return zoneFrom;
    }

    public void setZoneFrom(int zoneFrom) {
        this.zoneFrom = zoneFrom;
    }

    public int getZoneTo() {
        return zoneTo;
    }

    public void setZoneTo(int zoneTo) {
        this.zoneTo = zoneTo;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getAmountWithTransactionFee() {
        return amountWithTransactionFee;
    }

    public void setAmountWithTransactionFee(double amountWithTransactionFee) {
        this.amountWithTransactionFee = amountWithTransactionFee;
    }

    public int getNonce() {
        return nonce;
    }

    public void setNonce(int nonce) {
        this.nonce = nonce;
    }

    public String getXAxis() {
        return XAxis;
    }

    public void setXAxis(String XAxis) {
        this.XAxis = XAxis;
    }

    public String getYAxis() {
        return YAxis;
    }

    public void setYAxis(String YAxis) {
        this.YAxis = YAxis;
    }

    public byte getV() {
        return v;
    }

    public void setV(byte v) {
        this.v = v;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }

    public String getS() {
        return s;
    }

    public void setS(String s) {
        this.s = s;
    }

    public String getPub() {
        return pub;
    }

    public void setPub(String pub) {
        this.pub = pub;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TransactionDao that = (TransactionDao) o;
        return zoneFrom == that.zoneFrom && zoneTo == that.zoneTo && Double.compare(that.amount, amount) == 0 && Double.compare(that.amountWithTransactionFee, amountWithTransactionFee) == 0 && nonce == that.nonce && v == that.v && Objects.equals(hash, that.hash) && transactionDaoType == that.transactionDaoType && Objects.equals(timestamp, that.timestamp) && Objects.equals(from, that.from) && Objects.equals(to, that.to) && Objects.equals(XAxis, that.XAxis) && Objects.equals(YAxis, that.YAxis) && Objects.equals(r, that.r) && Objects.equals(s, that.s) && Objects.equals(pub, that.pub);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hash, transactionDaoType, zoneFrom, zoneTo, timestamp, from, to, amount, amountWithTransactionFee, nonce, XAxis, YAxis, v, r, s, pub);
    }

    @Override
    public String toString() {
        return "TransactionDao{" +
                "hash='" + hash + '\'' +
                ", transactionDaoType=" + transactionDaoType +
                ", zoneFrom=" + zoneFrom +
                ", zoneTo=" + zoneTo +
                ", timestamp='" + timestamp + '\'' +
                ", from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", amount=" + amount +
                ", amountWithTransactionFee=" + amountWithTransactionFee +
                ", nonce=" + nonce +
                ", XAxis='" + XAxis + '\'' +
                ", YAxis='" + YAxis + '\'' +
                ", v=" + v +
                ", r='" + r + '\'' +
                ", s='" + s + '\'' +
                ", pub='" + pub + '\'' +
                '}';
    }
}
