package io.Adrestus.Backend.Config;


import io.Adrestus.api.MessageListener;
import io.Adrestus.api.Strategy;
import io.Adrestus.api.TransactionStrategy;
import io.Adrestus.core.CommitteeBlock;
import io.Adrestus.core.RegularTransaction;
import io.Adrestus.core.Resourses.CachedEpochGeneration;
import io.Adrestus.core.Resourses.CachedLatestBlocks;
import io.Adrestus.core.Resourses.CachedLeaderIndex;
import io.Adrestus.core.Transaction;
import io.Adrestus.crypto.bls.model.BLSPrivateKey;
import io.Adrestus.crypto.bls.model.BLSPublicKey;
import io.distributedLedger.DatabaseFactory;
import io.distributedLedger.DatabaseInstance;
import io.distributedLedger.DatabaseType;
import io.distributedLedger.IDatabase;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ConsensusConfiguration implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {
    private static BLSPrivateKey sk1;
    private static BLSPublicKey vk1;
    public ConsensusConfiguration() {
        sk1 = new BLSPrivateKey(1);
        vk1 = new BLSPublicKey(sk1);
    }

    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
        IDatabase<String, CommitteeBlock> committeeBlockIDatabase = new DatabaseFactory(String.class, CommitteeBlock.class).getDatabase(DatabaseType.ROCKS_DB, DatabaseInstance.COMMITTEE_BLOCK);
        Optional<CommitteeBlock>val=committeeBlockIDatabase.seekLast();
        if(val.isPresent()){
            CachedLatestBlocks.getInstance().setCommitteeBlock(val.get());
        }
        else {
            CommitteeBlock committeeBlock = new CommitteeBlock();
            committeeBlock.setGeneration(1);
            committeeBlock.setViewID(1);
            // prevblock.setHeight(1);
            //prevblock.setHash("hash");
            //prevblock.getHeaderData().setTimestamp(GetTime.GetTimeStampInString());
            CachedLatestBlocks.getInstance().setCommitteeBlock(committeeBlock);

            CachedLatestBlocks.getInstance().getCommitteeBlock().getStructureMap().get(0).put(vk1, APIConfiguration.BOOTSTRAP_NODE_IP);
        }

        CachedEpochGeneration.getInstance().setEpoch_counter(0);
        CachedLeaderIndex.getInstance().setTransactionPositionLeader(0);

    }
}
