package io.Adrestus.Backend.Util;

import io.Adrestus.Backend.payload.request.RegularTransactionDao;
import io.Adrestus.Backend.model.TransactionDao;
import io.Adrestus.Backend.model.TransactionDaoType;
import io.Adrestus.core.RegularTransaction;
import io.Adrestus.core.StatusType;
import io.Adrestus.core.Transaction;
import io.Adrestus.core.TransactionType;
import io.Adrestus.crypto.elliptic.ECDSASignatureData;

import java.math.BigInteger;

public class HelperConvertDAO {


    public static Transaction convertDaoToTransaction(TransactionDao transactionDao) {
        switch (transactionDao.getTransactionDaoType()) {
            case REGULAR:
                return new RegularTransaction(transactionDao.getHash(), TransactionType.REGULAR, StatusType.PENDING, transactionDao.getZoneFrom(), transactionDao.getZoneTo(), transactionDao.getTimestamp(), 0, transactionDao.getFrom(), transactionDao.getTo(), transactionDao.getAmount(), transactionDao.getAmountWithTransactionFee(), transactionDao.getNonce(),new BigInteger(transactionDao.getXAxis()),new BigInteger(transactionDao.getYAxis()),new ECDSASignatureData((byte)transactionDao.getV(),new BigInteger(transactionDao.getR()).toByteArray(),new BigInteger(transactionDao.getS()).toByteArray(),new BigInteger(transactionDao.getPub()).toByteArray()));
            case REWARDS:
            case STAKING:
            case DELEGATING:
            default:
                return new RegularTransaction(transactionDao.getHash(), TransactionType.REGULAR, StatusType.PENDING, transactionDao.getZoneFrom(), transactionDao.getZoneTo(), transactionDao.getTimestamp(), 0, transactionDao.getFrom(), transactionDao.getTo(), transactionDao.getAmount(), transactionDao.getAmountWithTransactionFee(), transactionDao.getNonce(),new BigInteger(transactionDao.getXAxis()),new BigInteger(transactionDao.getYAxis()),new ECDSASignatureData((byte)transactionDao.getV(),new BigInteger(transactionDao.getR()).toByteArray(),new BigInteger(transactionDao.getS()).toByteArray(),new BigInteger(transactionDao.getPub()).toByteArray()));
        }
    }

    public static TransactionDao convertTransactionToDao(Transaction transaction){
        switch (transaction.getType()){
            case REGULAR:
              return new RegularTransactionDao(transaction.getHash(), TransactionDaoType.REGULAR,transaction.getZoneFrom(), transaction.getZoneTo(), transaction.getTimestamp(), transaction.getFrom(), transaction.getTo(), transaction.getAmount(), transaction.getAmountWithTransactionFee(), transaction.getNonce(), transaction.getXAxis().toString(),transaction.getYAxis().toString(),transaction.getSignature().getV(),new BigInteger(1,transaction.getSignature().getR()).toString(),new BigInteger(1,transaction.getSignature().getS()).toString(),new BigInteger(1,transaction.getSignature().getPub()).toString());
            default:
                return new RegularTransactionDao(transaction.getHash(), TransactionDaoType.REGULAR,transaction.getZoneFrom(), transaction.getZoneTo(), transaction.getTimestamp(), transaction.getFrom(), transaction.getTo(), transaction.getAmount(), transaction.getAmountWithTransactionFee(), transaction.getNonce(), transaction.getXAxis().toString(),transaction.getYAxis().toString(),transaction.getSignature().getV(),new BigInteger(1,transaction.getSignature().getR()).toString(),new BigInteger(1,transaction.getSignature().getS()).toString(),new BigInteger(1,transaction.getSignature().getPub()).toString());
        }
    }
}
