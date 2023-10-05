package io.Adrestus.Backend.Controller;

import io.Adrestus.Backend.Service.TransactionService;
import io.Adrestus.Backend.payload.response.ResponseDao;
import io.Adrestus.core.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
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
    public @ResponseBody String addTransaction(@RequestBody Transaction transaction) {
        return this.transactionService.addTransaction(transaction);
    }

    @GetMapping(path = {"{from}"})
    public @ResponseBody ResponseDao getTransactionsByAddress(@RequestBody @PathVariable("from") String address) {
        return this.transactionService.getTransactionsByAddress(address);
    }


    @PutMapping(path = {"{from}"})
    public @ResponseBody int updateTransactionByAddress(@RequestBody @PathVariable("from") String hash, @RequestBody Transaction transaction) {
        return this.transactionService.updateTransactionByAddress(hash, transaction);
    }

    @GetMapping(path = {"/delete"})
    public @ResponseBody int deleteALL() {
        return this.transactionService.deleteALL();
    }

}
