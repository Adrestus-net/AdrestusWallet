package io.Adrestus.Backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.Adrestus.Backend.Controller.TransactionController;
import io.Adrestus.Backend.Service.TransactionService;
import io.Adrestus.Backend.model.RegularTransactionDao;
import io.Adrestus.Backend.model.ResponseDao;
import io.Adrestus.Backend.model.TransactionDao;
import io.Adrestus.Backend.model.TransactionDaoType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

@WithMockUser
@ExtendWith(SpringExtension.class)
@WebMvcTest(value = TransactionController.class)
public class TransactionControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private TransactionService transactionService;


    @Test
    public void testAddTransaction() throws Exception {
        TransactionDao transactionDao = new RegularTransactionDao("hash1", TransactionDaoType.REGULAR, 0, 0, "", 0, "1", "2", 1.0, 2.0, 0, "73885651435926854515264701221164520142160681037984229233067136520784684869519", "26683047389995651185679566240952828910936171073908714048119596426948530852435", (byte) 0, "30179190089666276834887403079562508974417649980904472865724382004973443579854", "14029798542497621816798343676332730497595770105064178818079147459382128035034", "73885651435926854515264701221164520142160681037984229233067136520784684869519");
        //Mockito.when(transactionService.addTransaction(transactionDao)).thenReturn(1);

        String requestBody = objectMapper.writeValueAsString(transactionDao);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/v1/transaction")
                .contentType("application/json")
                .content(requestBody)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    public void retrieveDetailsForTransaction() throws Exception {
        TransactionDao transactionDao = new RegularTransactionDao("hash1", TransactionDaoType.REGULAR, 0, 0, "", 0, "1", "2", 1.0, 2.0, 0, "73885651435926854515264701221164520142160681037984229233067136520784684869519", "26683047389995651185679566240952828910936171073908714048119596426948530852435", (byte) 0, "30179190089666276834887403079562508974417649980904472865724382004973443579854", "14029798542497621816798343676332730497595770105064178818079147459382128035034", "73885651435926854515264701221164520142160681037984229233067136520784684869519");

        Mockito.when(transactionService.addTransaction(transactionDao)).thenReturn(1);

        ArrayList<TransactionDao> from = new ArrayList<>();
        ArrayList<TransactionDao> to = new ArrayList<>();
        from.add(transactionDao);
        ResponseDao responseDao = new ResponseDao(from, to);
        //String requestBody = objectMapper.writerFor(new TypeReference<List<TransactionDao>>() {
        //}).writeValueAsString(responseDao);
        String responseBody = objectMapper.writeValueAsString(responseDao);
        // Mockito.when(transactionService.getAll()).thenReturn(list);

        Mockito.when(transactionService.getTransactionsByAddress(transactionDao.getFrom())).thenReturn(responseDao);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/transaction/" + transactionDao.getFrom()).accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        assertEquals(responseBody, result.getResponse().getContentAsString());
    }

    @Test
    public void updateTransaction() throws Exception {
        TransactionDao transactionDao = new RegularTransactionDao("hash1", TransactionDaoType.REGULAR, 0, 0, "", 0, "1", "2", 1.0, 2.0, 0, "73885651435926854515264701221164520142160681037984229233067136520784684869519", "26683047389995651185679566240952828910936171073908714048119596426948530852435", (byte) 0, "30179190089666276834887403079562508974417649980904472865724382004973443579854", "14029798542497621816798343676332730497595770105064178818079147459382128035034", "73885651435926854515264701221164520142160681037984229233067136520784684869519");
        TransactionDao transactionDao2 = new RegularTransactionDao("hash2", TransactionDaoType.REGULAR, 0, 0, "", 0, "3", "1", 1.0, 2.0, 0, "73885651435926854515264701221164520142160681037984229233067136520784684869519", "26683047389995651185679566240952828910936171073908714048119596426948530852435", (byte) 0, "30179190089666276834887403079562508974417649980904472865724382004973443579854", "14029798542497621816798343676332730497595770105064178818079147459382128035034", "73885651435926854515264701221164520142160681037984229233067136520784684869519");

        Mockito.when(transactionService.addTransaction(transactionDao)).thenReturn(1);

        ArrayList<TransactionDao> from = new ArrayList<>();
        ArrayList<TransactionDao> to = new ArrayList<>();
        from.add(transactionDao);
        to.add(transactionDao2);
        ResponseDao responseDao = new ResponseDao(from, to);

        String requestBody = objectMapper.writeValueAsString(transactionDao2);
        String responseBody = objectMapper.writeValueAsString(responseDao);

        Mockito.when(transactionService.updateTransactionByAddress("1", transactionDao2)).thenReturn(1);
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/api/v1/transaction/1")
                .contentType("application/json")
                .content(requestBody)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        assertEquals(200, result.getResponse().getStatus());


        Mockito.when(transactionService.getTransactionsByAddress(transactionDao.getFrom())).thenReturn(responseDao);
        RequestBuilder requestBuilder2 = MockMvcRequestBuilders.get("/api/v1/transaction/1").accept(MediaType.APPLICATION_JSON);

        MvcResult result2 = mockMvc.perform(requestBuilder2).andReturn();
        assertEquals(responseBody, result2.getResponse().getContentAsString());
    }
}
