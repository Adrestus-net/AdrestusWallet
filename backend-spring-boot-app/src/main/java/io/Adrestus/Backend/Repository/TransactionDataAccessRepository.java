package io.Adrestus.Backend.Repository;

import com.google.common.reflect.TypeToken;
import io.Adrestus.Backend.Util.HelperConvertDAO;
import io.Adrestus.Backend.model.ResponseDao;
import io.Adrestus.Backend.model.TransactionDao;
import io.Adrestus.core.Transaction;
import io.distributedLedger.DatabaseFactory;
import io.distributedLedger.DatabaseType;
import io.distributedLedger.IDatabase;
import io.distributedLedger.LevelDBTransactionWrapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Repository("transactionDao")
public class TransactionDataAccessRepository implements KVRepository {

    private static List<TransactionDao> memorydb = new ArrayList<>();
    private final IDatabase<String, LevelDBTransactionWrapper<Transaction>> database;

    public TransactionDataAccessRepository() {
        this.database = new DatabaseFactory(String.class, Transaction.class, new TypeToken<LevelDBTransactionWrapper<Transaction>>() {
        }.getType()).getDatabase(DatabaseType.LEVEL_DB);
    }

    @Override
    public int addTransaction(TransactionDao transaction) {
        Transaction toSave = HelperConvertDAO.convertDaoToTransaction(transaction);
        database.save(toSave.getFrom(), toSave);
        database.save(toSave.getTo(), toSave);
        return 1;
    }

    @Override
    public int updateTransactionByAddress(String from, TransactionDao transaction) {
        Transaction toSave = HelperConvertDAO.convertDaoToTransaction(transaction);
        database.save(toSave.getFrom(), toSave);
        database.save(toSave.getTo(), toSave);
        return 1;
    }

    @Override
    public ResponseDao getTransactionsByAddress(String address) {
        Optional<LevelDBTransactionWrapper<Transaction>> wrapper = database.findByKey(address);
        if (wrapper.isPresent()) {
            ArrayList<TransactionDao> from = new ArrayList<>();
            ArrayList<TransactionDao> to = new ArrayList<>();
            wrapper.get().getFrom().stream().forEach(val -> from.add(HelperConvertDAO.convertTransactionToDao(val)));
            wrapper.get().getTo().stream().forEach(val -> to.add(HelperConvertDAO.convertTransactionToDao(val)));
            return new ResponseDao(from, to);
        }
        return null;
    }
}
