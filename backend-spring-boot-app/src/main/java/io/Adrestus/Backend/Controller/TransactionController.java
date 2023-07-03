package io.Adrestus.Backend.Controller;

import io.Adrestus.Backend.Service.TransactionService;
import io.Adrestus.Backend.model.ResponseDao;
import io.Adrestus.Backend.model.TransactionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RequestMapping("api/v1/transaction")
@RestController
public class TransactionController {
    @Autowired
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public @ResponseBody int addTransaction(@RequestBody TransactionDao transactionDao) {
        this.transactionService.addTransaction(transactionDao);
        return 1;
    }

    @GetMapping(path = {"{from}"})
    public @ResponseBody ResponseDao getTransactionsByAddress(@RequestBody @PathVariable("from") String address) {
        return this.transactionService.getTransactionsByAddress(address);
    }

    @PutMapping(path = {"{from}"})
    public @ResponseBody int updateTransactionByAddress(@RequestBody @PathVariable("from") String hash, @RequestBody TransactionDao transaction) {
        return this.transactionService.updateTransactionByAddress(hash, transaction);
    }


}
