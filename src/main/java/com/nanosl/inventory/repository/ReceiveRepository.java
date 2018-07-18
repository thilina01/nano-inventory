package com.nanosl.inventory.repository;

import com.nanosl.inventory.domain.Receive;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Receive entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiveRepository extends JpaRepository<Receive, Long> {

}
