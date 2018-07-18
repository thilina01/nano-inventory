package com.nanosl.inventory.service;

import com.nanosl.inventory.domain.Receive;
import com.nanosl.inventory.repository.ReceiveRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Receive.
 */
@Service
@Transactional
public class ReceiveService {

    private final Logger log = LoggerFactory.getLogger(ReceiveService.class);

    private final ReceiveRepository receiveRepository;

    public ReceiveService(ReceiveRepository receiveRepository) {
        this.receiveRepository = receiveRepository;
    }

    /**
     * Save a receive.
     *
     * @param receive the entity to save
     * @return the persisted entity
     */
    public Receive save(Receive receive) {
        log.debug("Request to save Receive : {}", receive);        return receiveRepository.save(receive);
    }

    /**
     * Get all the receives.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Receive> findAll(Pageable pageable) {
        log.debug("Request to get all Receives");
        return receiveRepository.findAll(pageable);
    }


    /**
     * Get one receive by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Receive> findOne(Long id) {
        log.debug("Request to get Receive : {}", id);
        return receiveRepository.findById(id);
    }

    /**
     * Delete the receive by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Receive : {}", id);
        receiveRepository.deleteById(id);
    }
}
