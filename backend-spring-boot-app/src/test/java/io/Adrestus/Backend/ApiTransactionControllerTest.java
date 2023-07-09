package io.Adrestus.Backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.Adrestus.Backend.Controller.AuthenticationController;
import io.Adrestus.Backend.Controller.TransactionController;
import io.Adrestus.Backend.Service.CustomUserDetailsService;
import io.Adrestus.Backend.Service.JwtUserDetailsService;
import io.Adrestus.Backend.Service.TransactionService;
import io.Adrestus.Backend.Util.JwtUtil;
import io.Adrestus.Backend.model.DAOUser;
import io.Adrestus.Backend.model.TransactionDao;
import io.Adrestus.Backend.model.TransactionDaoType;
import io.Adrestus.Backend.model.UserDTO;
import io.Adrestus.Backend.payload.request.AuthenticationRequest;
import io.Adrestus.Backend.payload.request.RegularTransactionDao;
import io.Adrestus.Backend.payload.response.AuthenticationResponse;
import io.Adrestus.Backend.payload.response.ResponseDao;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@WithMockUser
@ExtendWith(SpringExtension.class)
@WebMvcTest({TransactionController.class, AuthenticationController.class})
@ComponentScan("io.Adrestus.Backend")
public class ApiTransactionControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TransactionService transactionService;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    @Lazy
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private JwtUtil jwtTokenUtil;

    private String jwtToken;
    @Test
    @Order(1)
    public void testRegister() throws Exception {
        AuthenticationRequest authenticationRequest=new AuthenticationRequest("user","password");

        String requestBody = objectMapper.writeValueAsString(authenticationRequest);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/register")
                .contentType("application/json")
                .content(requestBody)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    @Order(2)
    public void authenticate() throws Exception {
        AuthenticationRequest authenticationRequest=new AuthenticationRequest("user","password");
        UserDTO userDTO=new UserDTO("user","password");
        DAOUser daoUser=new DAOUser("user",bcryptEncoder.encode("password"));
        UserDetails userDetails=new User(userDTO.getUsername(), bcryptEncoder.encode(userDTO.getPassword()), Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
        String requestBody = objectMapper.writeValueAsString(authenticationRequest);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/register")
                .contentType("application/json")
                .content(requestBody)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        assertEquals(200, result.getResponse().getStatus());


        Mockito.when(customUserDetailsService.save(userDTO)).thenReturn(daoUser);
        Mockito.when(customUserDetailsService.loadUserByUsername(userDTO.getUsername())).thenReturn(userDetails);

        RequestBuilder requestBuilder2 = MockMvcRequestBuilders
                .post("/authenticate")
                .contentType("application/json")
                .content(requestBody)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result2 = mockMvc.perform(requestBuilder2).andReturn();
        jwtToken=objectMapper.readValue(result2.getResponse().getContentAsString(), AuthenticationResponse.class).getToken();
        assertEquals(200, result2.getResponse().getStatus());
    }

    @Test
    @Order(3)
    public void testAddTransaction() throws Exception {
        TransactionDao transactionDao = new RegularTransactionDao("hash1", TransactionDaoType.REGULAR, 0, 0, "", 0, "1", "2", 1.0, 2.0, 0, "73885651435926854515264701221164520142160681037984229233067136520784684869519", "26683047389995651185679566240952828910936171073908714048119596426948530852435", (byte) 0, "30179190089666276834887403079562508974417649980904472865724382004973443579854", "14029798542497621816798343676332730497595770105064178818079147459382128035034", "73885651435926854515264701221164520142160681037984229233067136520784684869519");
        //Mockito.when(transactionService.addTransaction(transactionDao)).thenReturn(1);

        String requestBody = objectMapper.writeValueAsString(transactionDao);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/v1/transaction")
                .contentType("application/json")
                .header("Authorization", "Bearer " + jwtToken)
                .content(requestBody)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    @Order(4)
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
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/transaction/" + transactionDao.getFrom()).header("Authorization", "Bearer " + jwtToken).accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        assertEquals(responseBody, result.getResponse().getContentAsString());
    }

    @Test
    @Order(5)
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
                .header("Authorization", "Bearer " + jwtToken)
                .content(requestBody)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        assertEquals(200, result.getResponse().getStatus());


        Mockito.when(transactionService.getTransactionsByAddress(transactionDao.getFrom())).thenReturn(responseDao);
        RequestBuilder requestBuilder2 = MockMvcRequestBuilders.get("/api/v1/transaction/1").header("Authorization", "Bearer " + jwtToken).accept(MediaType.APPLICATION_JSON);

        MvcResult result2 = mockMvc.perform(requestBuilder2).andReturn();
        assertEquals(responseBody, result2.getResponse().getContentAsString());
    }



    //DO NOT FORGET HEADER IS REFRESHTOKEN=TRUE
    @Test
    @Order(6)
    public void refreshtoken() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/refreshtoken")
                .header("Authorization", "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXJraW5pYXJpcyIsImlzVXNlciI6dHJ1ZSwiZXhwIjoxNjg4ODM5NzA5LCJpYXQiOjE2ODg4Mzk2OTR9.pe_eF9OKriC-5rqO7CtwSooSzxCpp38xLQ4BjxDsP9PRLVBzdhsTl_KZ3kXnpostapsc2C0O7aMIh0Fqund3jQ")
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        jwtToken=objectMapper.readValue(result.getResponse().getContentAsString(), AuthenticationResponse.class).getToken();
        assertEquals(200, result.getResponse().getStatus());


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

        UserDTO userDTO=new UserDTO("user","password");
        DAOUser daoUser=new DAOUser("user",bcryptEncoder.encode("password"));
        UserDetails userDetails=new User("user", bcryptEncoder.encode("password"), Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));

        Mockito.when(customUserDetailsService.save(userDTO)).thenReturn(daoUser);
        Mockito.when(jwtUserDetailsService.loadUserDetails(jwtTokenUtil.getUsernameFromToken(jwtToken))).thenReturn(userDetails);
        Mockito.when(transactionService.getTransactionsByAddress(transactionDao.getFrom())).thenReturn(responseDao);
        RequestBuilder requestBuilder2 = MockMvcRequestBuilders.get("/api/v1/transaction/" + transactionDao.getFrom()).header("Authorization", "Bearer " + jwtToken).accept(MediaType.APPLICATION_JSON);

        MvcResult result2 = mockMvc.perform(requestBuilder2).andReturn();
        assertEquals(responseBody, result2.getResponse().getContentAsString());
    }
}
