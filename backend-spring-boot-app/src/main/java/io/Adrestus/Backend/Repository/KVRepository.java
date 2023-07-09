package io.Adrestus.Backend.Repository;

import io.Adrestus.Backend.payload.response.ResponseDao;
import io.Adrestus.Backend.model.TransactionDao;

public interface KVRepository {

    public int addTransaction(TransactionDao transaction);

    public int updateTransactionByAddress(String hash, TransactionDao transaction);

    public ResponseDao getTransactionsByAddress(String address);

    public int deleteALL();
}
