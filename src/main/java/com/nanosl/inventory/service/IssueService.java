package com.nanosl.inventory.service;

import java.util.Optional;

import com.nanosl.inventory.domain.Issue;
import com.nanosl.inventory.domain.Item;
import com.nanosl.inventory.repository.IssueRepository;
import com.nanosl.inventory.repository.ItemRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing Issue.
 */
@Service
@Transactional
public class IssueService {

    private final Logger log = LoggerFactory.getLogger(IssueService.class);

    private final IssueRepository issueRepository;
    private final ItemRepository itemRepository;

    public IssueService(IssueRepository issueRepository, ItemRepository itemRepository) {
        this.issueRepository = issueRepository;
        this.itemRepository = itemRepository;
    }

    /**
     * Save a issue.
     *
     * @param issue the entity to save
     * @return the persisted entity
     */
    public Issue save(Issue issue) {
        log.debug("Request to save Issue : {}", issue);

        Item item = issue.getItem();
        item = itemRepository.findById(item.getId()).get();
        item.setQuantity(item.getQuantity() - issue.getQuantity());
        itemRepository.save(item);

        return issueRepository.save(issue);
    }

    /**
     * Get all the issues.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Issue> findAll(Pageable pageable) {
        log.debug("Request to get all Issues");
        return issueRepository.findAll(pageable);
    }

    /**
     * Get one issue by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Issue> findOne(Long id) {
        log.debug("Request to get Issue : {}", id);
        return issueRepository.findById(id);
    }

    /**
     * Delete the issue by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Issue : {}", id);
        issueRepository.deleteById(id);
    }
}
