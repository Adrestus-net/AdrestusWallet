package io.Adrestus.Backend.Controller;

import io.Adrestus.Backend.payload.request.AuthenticationRequest;
import io.Adrestus.Backend.payload.request.BalanceRequest;
import io.Adrestus.TreeFactory;
import io.Adrestus.Trie.PatriciaTreeNode;
import io.vavr.control.Option;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Order(Ordered.HIGHEST_PRECEDENCE)
@CrossOrigin
@RestController
public class BalanceController {

    @RequestMapping(value = "api/v1/balance", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody BalanceRequest balanceRequest)
    {
        if(balanceRequest.getAddress().equals("")){
            return ResponseEntity.ok(0);
        }
        Option<PatriciaTreeNode> res=TreeFactory.getMemoryTree(balanceRequest.getZone()).getByaddress(balanceRequest.getAddress());
        if(res.isEmpty())
            return ResponseEntity.ok(0);

        return ResponseEntity.ok(res.get().getAmount());
    }
}
