package com.nanosl.inventory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.nanosl.inventory.domain.Receive;
import com.nanosl.inventory.service.ReceiveService;
import com.nanosl.inventory.web.rest.errors.BadRequestAlertException;
import com.nanosl.inventory.web.rest.util.HeaderUtil;
import com.nanosl.inventory.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Receive.
 */
@RestController
@RequestMapping("/api")
public class ReceiveResource {

    private final Logger log = LoggerFactory.getLogger(ReceiveResource.class);

    private static final String ENTITY_NAME = "receive";

    private final ReceiveService receiveService;

    public ReceiveResource(ReceiveService receiveService) {
        this.receiveService = receiveService;
    }

    /**
     * POST  /receives : Create a new receive.
     *
     * @param receive the receive to create
     * @return the ResponseEntity with status 201 (Created) and with body the new receive, or with status 400 (Bad Request) if the receive has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/receives")
    @Timed
    public ResponseEntity<Receive> createReceive(@Valid @RequestBody Receive receive) throws URISyntaxException {
        log.debug("REST request to save Receive : {}", receive);
        if (receive.getId() != null) {
            throw new BadRequestAlertException("A new receive cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Receive result = receiveService.save(receive);
        return ResponseEntity.created(new URI("/api/receives/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /receives : Updates an existing receive.
     *
     * @param receive the receive to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated receive,
     * or with status 400 (Bad Request) if the receive is not valid,
     * or with status 500 (Internal Server Error) if the receive couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/receives")
    @Timed
    public ResponseEntity<Receive> updateReceive(@Valid @RequestBody Receive receive) throws URISyntaxException {
        log.debug("REST request to update Receive : {}", receive);
        if (receive.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Receive result = receiveService.save(receive);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, receive.getId().toString()))
            .body(result);
    }

    /**
     * GET  /receives : get all the receives.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of receives in body
     */
    @GetMapping("/receives")
    @Timed
    public ResponseEntity<List<Receive>> getAllReceives(Pageable pageable) {
        log.debug("REST request to get a page of Receives");
        Page<Receive> page = receiveService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/receives");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /receives/:id : get the "id" receive.
     *
     * @param id the id of the receive to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the receive, or with status 404 (Not Found)
     */
    @GetMapping("/receives/{id}")
    @Timed
    public ResponseEntity<Receive> getReceive(@PathVariable Long id) {
        log.debug("REST request to get Receive : {}", id);
        Optional<Receive> receive = receiveService.findOne(id);
        return ResponseUtil.wrapOrNotFound(receive);
    }

    /**
     * DELETE  /receives/:id : delete the "id" receive.
     *
     * @param id the id of the receive to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/receives/{id}")
    @Timed
    public ResponseEntity<Void> deleteReceive(@PathVariable Long id) {
        log.debug("REST request to delete Receive : {}", id);
        receiveService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
