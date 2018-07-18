package com.nanosl.inventory.service;

import java.util.Optional;

import com.nanosl.inventory.domain.Item;
import com.nanosl.inventory.domain.Receive;
import com.nanosl.inventory.repository.ItemRepository;
import com.nanosl.inventory.repository.ReceiveRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing Receive.
 */
@Service
@Transactional
public class ReceiveService {

    private final Logger log = LoggerFactory.getLogger(ReceiveService.class);

    private final ReceiveRepository receiveRepository;
    private final ItemRepository itemRepository;

    public ReceiveService(ReceiveRepository receiveRepository, ItemRepository itemRepository) {
        this.receiveRepository = receiveRepository;
        this.itemRepository = itemRepository;
    }

    /**
     * Save a receive.
     *
     * @param receive the entity to save
     * @return the persisted entity
     */
    public Receive save(Receive receive) {
        log.debug("Request to save Receive : {}", receive);

        Item item = receive.getItem();
        item = itemRepository.findById(item.getId()).get();
        item.setQuantity(item.getQuantity() + receive.getQuantity());
        itemRepository.save(item);

        return receiveRepository.save(receive);
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
