package com.nanosl.inventory.web.rest;

import com.nanosl.inventory.NanoInventoryApp;

import com.nanosl.inventory.domain.Receive;
import com.nanosl.inventory.repository.ReceiveRepository;
import com.nanosl.inventory.service.ReceiveService;
import com.nanosl.inventory.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.nanosl.inventory.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReceiveResource REST controller.
 *
 * @see ReceiveResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NanoInventoryApp.class)
public class ReceiveResourceIntTest {

    private static final Instant DEFAULT_RECEIVE_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RECEIVE_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private ReceiveRepository receiveRepository;

    

    @Autowired
    private ReceiveService receiveService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReceiveMockMvc;

    private Receive receive;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReceiveResource receiveResource = new ReceiveResource(receiveService);
        this.restReceiveMockMvc = MockMvcBuilders.standaloneSetup(receiveResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Receive createEntity(EntityManager em) {
        Receive receive = new Receive()
            .receiveTime(DEFAULT_RECEIVE_TIME)
            .quantity(DEFAULT_QUANTITY);
        return receive;
    }

    @Before
    public void initTest() {
        receive = createEntity(em);
    }

    @Test
    @Transactional
    public void createReceive() throws Exception {
        int databaseSizeBeforeCreate = receiveRepository.findAll().size();

        // Create the Receive
        restReceiveMockMvc.perform(post("/api/receives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receive)))
            .andExpect(status().isCreated());

        // Validate the Receive in the database
        List<Receive> receiveList = receiveRepository.findAll();
        assertThat(receiveList).hasSize(databaseSizeBeforeCreate + 1);
        Receive testReceive = receiveList.get(receiveList.size() - 1);
        assertThat(testReceive.getReceiveTime()).isEqualTo(DEFAULT_RECEIVE_TIME);
        assertThat(testReceive.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createReceiveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receiveRepository.findAll().size();

        // Create the Receive with an existing ID
        receive.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiveMockMvc.perform(post("/api/receives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receive)))
            .andExpect(status().isBadRequest());

        // Validate the Receive in the database
        List<Receive> receiveList = receiveRepository.findAll();
        assertThat(receiveList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkReceiveTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiveRepository.findAll().size();
        // set the field null
        receive.setReceiveTime(null);

        // Create the Receive, which fails.

        restReceiveMockMvc.perform(post("/api/receives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receive)))
            .andExpect(status().isBadRequest());

        List<Receive> receiveList = receiveRepository.findAll();
        assertThat(receiveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiveRepository.findAll().size();
        // set the field null
        receive.setQuantity(null);

        // Create the Receive, which fails.

        restReceiveMockMvc.perform(post("/api/receives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receive)))
            .andExpect(status().isBadRequest());

        List<Receive> receiveList = receiveRepository.findAll();
        assertThat(receiveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReceives() throws Exception {
        // Initialize the database
        receiveRepository.saveAndFlush(receive);

        // Get all the receiveList
        restReceiveMockMvc.perform(get("/api/receives?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receive.getId().intValue())))
            .andExpect(jsonPath("$.[*].receiveTime").value(hasItem(DEFAULT_RECEIVE_TIME.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }
    

    @Test
    @Transactional
    public void getReceive() throws Exception {
        // Initialize the database
        receiveRepository.saveAndFlush(receive);

        // Get the receive
        restReceiveMockMvc.perform(get("/api/receives/{id}", receive.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(receive.getId().intValue()))
            .andExpect(jsonPath("$.receiveTime").value(DEFAULT_RECEIVE_TIME.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }
    @Test
    @Transactional
    public void getNonExistingReceive() throws Exception {
        // Get the receive
        restReceiveMockMvc.perform(get("/api/receives/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReceive() throws Exception {
        // Initialize the database
        receiveService.save(receive);

        int databaseSizeBeforeUpdate = receiveRepository.findAll().size();

        // Update the receive
        Receive updatedReceive = receiveRepository.findById(receive.getId()).get();
        // Disconnect from session so that the updates on updatedReceive are not directly saved in db
        em.detach(updatedReceive);
        updatedReceive
            .receiveTime(UPDATED_RECEIVE_TIME)
            .quantity(UPDATED_QUANTITY);

        restReceiveMockMvc.perform(put("/api/receives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReceive)))
            .andExpect(status().isOk());

        // Validate the Receive in the database
        List<Receive> receiveList = receiveRepository.findAll();
        assertThat(receiveList).hasSize(databaseSizeBeforeUpdate);
        Receive testReceive = receiveList.get(receiveList.size() - 1);
        assertThat(testReceive.getReceiveTime()).isEqualTo(UPDATED_RECEIVE_TIME);
        assertThat(testReceive.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingReceive() throws Exception {
        int databaseSizeBeforeUpdate = receiveRepository.findAll().size();

        // Create the Receive

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReceiveMockMvc.perform(put("/api/receives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receive)))
            .andExpect(status().isBadRequest());

        // Validate the Receive in the database
        List<Receive> receiveList = receiveRepository.findAll();
        assertThat(receiveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReceive() throws Exception {
        // Initialize the database
        receiveService.save(receive);

        int databaseSizeBeforeDelete = receiveRepository.findAll().size();

        // Get the receive
        restReceiveMockMvc.perform(delete("/api/receives/{id}", receive.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Receive> receiveList = receiveRepository.findAll();
        assertThat(receiveList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Receive.class);
        Receive receive1 = new Receive();
        receive1.setId(1L);
        Receive receive2 = new Receive();
        receive2.setId(receive1.getId());
        assertThat(receive1).isEqualTo(receive2);
        receive2.setId(2L);
        assertThat(receive1).isNotEqualTo(receive2);
        receive1.setId(null);
        assertThat(receive1).isNotEqualTo(receive2);
    }
}
