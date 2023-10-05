package io.Adrestus.Backend.Repository;

import io.Adrestus.Backend.payload.response.ResponseDao;
import io.Adrestus.core.Transaction;

public interface KVRepository {

    public String addTransaction(Transaction transaction);

    public int updateTransactionByAddress(String hash, Transaction transaction);

    public ResponseDao getTransactionsByAddress(String address);

    public int deleteALL();
}
