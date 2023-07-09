package io.Adrestus.Backend.Service;

import io.Adrestus.Backend.Repository.KVRepository;
import io.Adrestus.Backend.payload.response.ResponseDao;
import io.Adrestus.Backend.model.TransactionDao;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;


@Service
public class TransactionService {
    private final KVRepository KVRepository;

    public TransactionService(@Qualifier("transactionDao") KVRepository KVRepository) {
        this.KVRepository = KVRepository;
    }

    public int addTransaction(TransactionDao transaction){
        return this.KVRepository.addTransaction(transaction);
    }

    public int updateTransactionByAddress(String from,TransactionDao transaction){
        return this.KVRepository.updateTransactionByAddress(from,transaction);
    }

    public ResponseDao getTransactionsByAddress(String address) {
        return this.KVRepository.getTransactionsByAddress(address);
    }
    public int deleteALL() {
        return this.KVRepository.deleteALL();
    }
}
