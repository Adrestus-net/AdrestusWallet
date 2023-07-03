package io.Adrestus.Backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Objects;

public class ResponseDao {
    @JsonProperty(value = "from")
    private List<TransactionDao> from;
    @JsonProperty(value = "to")
    private List<TransactionDao> to;

    @JsonCreator
    public ResponseDao(List<TransactionDao> from, List<TransactionDao> to) {
        this.from = from;
        this.to = to;
    }


    public List<TransactionDao> getFrom() {
        return from;
    }

    public void setFrom(List<TransactionDao> from) {
        this.from = from;
    }

    public List<TransactionDao> getTo() {
        return to;
    }

    public void setTo(List<TransactionDao> to) {
        this.to = to;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ResponseDao that = (ResponseDao) o;
        return Objects.equals(from, that.from) && Objects.equals(to, that.to);
    }

    @Override
    public int hashCode() {
        return Objects.hash(from, to);
    }

    @Override
    public String toString() {
        return "ResponseDao{" +
                "from=" + from +
                ", to=" + to +
                '}';
    }
}
